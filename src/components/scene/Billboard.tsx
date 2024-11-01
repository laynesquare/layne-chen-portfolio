import { useEffect, useMemo, useRef } from 'react';

// three
import { useFBO } from '@react-three/drei';
import { createPortal, useFrame, useThree, useLoader } from '@react-three/fiber';
import { lerp } from 'three/src/math/MathUtils.js';
import {
	GLSL3,
	Scene,
	ShaderMaterial,
	LinearFilter,
	RGBAFormat,
	NearestFilter,
	UnsignedByteType,
	PlaneGeometry,
	FrontSide,
	NoBlending,
	Color,
} from 'three';

// shader
import vertexShader from '@/shaders/animated-scroll-warp/vertex';
import fragmentShader from '@/shaders/animated-scroll-warp/fragment';

// lenis
import { useLenis } from '@studio-freight/react-lenis';

// store
import { useNavStore, usePlatformStore, useWebGlStore, useCursorStore } from '@/store';

// constant
import { MESH_NAME, FBO_CONFIG } from '@/config/constants';

// gsap
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function Billboard({ children }) {
	const getThree = useThree(state => state.get);
	const velocityRef = useRef(0);
	const pingPongMutationRef = useRef(0);
	const pingPongTranslucentRef = useRef(0);
	const billboardScene = useMemo(() => new Scene(), []);
	const billboardGeo = useMemo(() => new PlaneGeometry(1, 1, 64, 64), []);

	const billboardBuffer = useFBO(1024, 1024, {
		samples: 0,
		minFilter: LinearFilter,
		magFilter: LinearFilter,
		format: RGBAFormat,
		type: UnsignedByteType,
		stencilBuffer: false,
		anisotropy: 0,
		colorSpace: '',
		generateMipmaps: false,
	});

	const billboardMaterial = useMemo(
		() =>
			new ShaderMaterial({
				uniforms: {
					uTime: { value: 0 },
					uScrollVelocity: { value: 0 },
					uTexture: { value: billboardBuffer.texture },
					uDisplacement: { value: null },
				},
				vertexShader,
				fragmentShader,
				glslVersion: GLSL3,
				depthTest: false,
				depthWrite: false,
				side: FrontSide,
				blending: NoBlending,
			}),
		[],
	);

	const mutatedMeshes = useRef({
		containerGroup: null,
		textGroup: null,
		torso: null,
		ball: null,
		clonedBall: null,
	});

	const translucentBuffer = useFBO(1024, 1024, {
		...FBO_CONFIG,
		depthBuffer: false,
		depth: false,
	});

	const maskBufferMap = {
		ABOUT: {
			buffer: useFBO(1024, 1024, FBO_CONFIG),
			mutateScene: (ball, torso) => {
				ball.material.uniforms.uIsNormalColor.value = 1;
				torso.material.uniforms.uBrightColor.value.set('#7B60FB');
				torso.material.uniforms.uDarkColor.value.set('#FF00C7');
				ball.material.wireframe = true;
				ball.material.roughness = 0.5;
				ball.material.displacementScale = 1;
			},
		},
		SKILL: {
			buffer: useFBO(128, 128, FBO_CONFIG),
			mutateScene: (ball, torso) => {
				torso.material.uniforms.uBrightColor.value.set('#FF0000');
				torso.material.uniforms.uDarkColor.value.set('#0500FF');
				ball.material.uniforms.uColor.value.set('#FF0000');
				ball.material.uniforms.uIsNormalColor.value = 0;
				ball.material.wireframe = false;
				ball.material.roughness = 0.5;
				ball.material.metalness = 0.3;
				ball.material.iridescence = 0.5;
				ball.material.displacementScale = 0;
				ball.material.sheen = 1.0;
				ball.material.clearcoat = 0.0;
				ball.material.ior = 0.0;
				ball.material.sheenColor.set('#ff69b4');
			},
		},
		EXPERIENCE: {
			buffer: useFBO(1024, 1024, FBO_CONFIG),
			mutateScene: (ball, torso, clonedBall) => {
				torso.material.uniforms.uBrightColor.value.set('#FF0000');
				torso.material.uniforms.uDarkColor.value.set('#0500FF');
				ball.material.uniforms.uIsNormalColor.value = 1;
				ball.material.wireframe = true;
				ball.material.roughness = 0.1;
				ball.material.metalness = 1;
				clonedBall.material.wireframe = true;
				ball.material.uniforms.uFractAmount.value = 0.1;
				ball.scale.set(0.5, 0.5, 0.5);
				clonedBall.scale.copy(ball.scale);
			},
		},
	};

	useLenis(event => (velocityRef.current = event.velocity));

	useEffect(() => {
		billboardMaterial.uniforms.uDisplacement.value = useWebGlStore.getState().rippleBuffer.texture;
	}, []);

	useEffect(() => {
		useWebGlStore.setState({
			shareTranslucentBuffer: translucentBuffer,
			maskBufferMap: maskBufferMap,
		});
	}, []);

	useFrame(({ gl, camera, size }, delta) => {
		if (!useWebGlStore.getState().isEntryAnimationDone) return;

		const isNavOpen = useNavStore.getState().isOpen;
		const isMobile = usePlatformStore.getState().isMobile;

		const dynamicDpr = isMobile
			? Math.max(Math.min(window.devicePixelRatio, 2.5), 2)
			: window.devicePixelRatio > 1
			? 1
			: 1.2;

		const baseResW = size.width * dynamicDpr;
		const baseResH = size.height * dynamicDpr;
		billboardBuffer.setSize(baseResW, baseResH);
		translucentBuffer.setSize(baseResW, baseResH);
		maskBufferMap['ABOUT'].buffer.setSize(baseResW, baseResH);

		if (billboardMaterial) {
			billboardMaterial.uniforms.uTime.value += delta;
			const currentVelocity = billboardMaterial.uniforms.uScrollVelocity.value;
			const targetVelocity = velocityRef.current;
			const smoothingFactor = 0.025;
			const smoothedVelocity = lerp(currentVelocity, targetVelocity, smoothingFactor);
			billboardMaterial.uniforms.uScrollVelocity.value = smoothedVelocity;
		}

		if (!Object.values(mutatedMeshes.current).every(Boolean)) {
			mutatedMeshes.current = {
				containerGroup: billboardScene.getObjectByName(MESH_NAME.CONTAINER_GROUP),
				textGroup: billboardScene.getObjectByName(MESH_NAME.TEXT_GROUP),
				torso: billboardScene.getObjectByName(MESH_NAME.TORSO),
				ball: billboardScene.getObjectByName(MESH_NAME.BALL),
				clonedBall: billboardScene.getObjectByName(MESH_NAME.CLONED_BALL),
			};
		} else {
			const containerMaskedMeshes = useWebGlStore.getState().containerMaskedMeshes;
			if (containerMaskedMeshes?.size) {
				const {
					//
					containerGroup,
					textGroup,
					torso,
					ball,
					clonedBall,
				} = mutatedMeshes.current;

				const ogRoughness = ball.material.roughness;
				const ogMetalness = ball.material.metalness;
				const ogIridescence = ball.material.iridescence;
				const ogClearcoat = ball.material.clearcoat;

				containerGroup.visible = false;
				textGroup.visible = false;

				if (!isNavOpen) {
					const detectInViewMeshes = [...containerMaskedMeshes].filter(mesh =>
						ScrollTrigger.isInViewport(mesh.userData.el),
					);

					if (detectInViewMeshes.length) {
						let registration = {};
						const meshesToMutate = detectInViewMeshes.filter(mesh => {
							const { anchor } = mesh.userData.dataset;
							if (registration[anchor]) return false;
							return (registration[anchor] = 1);
						});

						const renderIdx = pingPongMutationRef.current++ % meshesToMutate.length;
						let mesh = meshesToMutate[renderIdx];

						if (mesh) {
							const { anchor } = mesh.userData.dataset;
							maskBufferMap[anchor].mutateScene(ball, torso, clonedBall);

							gl.setRenderTarget(maskBufferMap[anchor].buffer);
							gl.render(billboardScene, camera);
						}
					}
				}

				billboardScene.environmentIntensity = 0.05;
				torso.material.uniforms.uBrightColor.value.set('#69D2B7');
				torso.material.uniforms.uDarkColor.value.set('#868686');
				ball.material.wireframe = true;
				clonedBall.material.wireframe = true;
				ball.material.uniforms.uFractAmount.value = 0.8;
				ball.material.uniforms.uIsNormalColor.value = 0;
				ball.material.uniforms.uColor.value.set('#002BF9');
				ball.material.sheenColor.set('#fd267a');
				ball.material.displacementScale = 0.3;
				ball.material.sheen = 1;
				ball.material.iridescence = 1;
				ball.material.roughness = ogRoughness;
				ball.material.metalness = ogMetalness;
				ball.material.clearcoat = ogClearcoat;
				ball.material.emissive.set('#FFC58D');
				ball.material.emissiveIntensity = 0.3;
				ball.scale.set(...(isMobile ? [0.6, 0.6, 0.6] : [1, 1, 1]));
				clonedBall.scale.copy(ball.scale);

				const shouldRender = pingPongTranslucentRef.current++ % 5;
				if (!isNavOpen && shouldRender) {
					gl.setRenderTarget(translucentBuffer);
					gl.render(billboardScene, camera);
				}

				containerGroup.visible = true;
				textGroup.visible = true;
				billboardScene.environmentIntensity = 1.25;
				ball.material.emissiveIn;
				ball.material.wireframe = false;
				ball.material.wireframe = false;
				clonedBall.material.wireframe = false;
				ball.material.emissiveIntensity = 0;
				ball.material.sheen = 0;
				ball.material.displacementScale = 0;
				ball.material.iridescence = ogIridescence;
				ball.material.uniforms.uColor.value.set('#e6ff00');
			}
		}
	});

	useFrame(({ gl, camera }) => {
		gl.setRenderTarget(billboardBuffer);
		gl.render(billboardScene, camera);
		gl.setRenderTarget(null);
	});

	console.log('billboard rerenders');

	return (
		<>
			{createPortal(children, billboardScene)}
			<mesh
				castShadow={false}
				receiveShadow={false}
				scale={[getThree().viewport.width * 1.005, getThree().viewport.height * 1.0055, 1]}
				material={billboardMaterial}
				position={[0, 0, 0]}
				geometry={billboardGeo}></mesh>
		</>
	);
}

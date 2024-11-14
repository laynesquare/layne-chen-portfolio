import { useEffect, useMemo, useRef } from 'react';

// three
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import { useFBO } from '@react-three/drei';
import { createPortal, useFrame, useThree } from '@react-three/fiber';
import { lerp } from 'three/src/math/MathUtils.js';
import {
	GLSL3,
	Scene,
	ShaderMaterial,
	LinearFilter,
	RGBAFormat,
	UnsignedByteType,
	PlaneGeometry,
	FrontSide,
	NoBlending,
} from 'three';

// shader
import vertexShader from '@/shaders/animated-scroll-warp/vertex';
import fragmentShader from '@/shaders/animated-scroll-warp/fragment';

// lenis
import { useLenis } from '@studio-freight/react-lenis';
import type Lenis from '@studio-freight/lenis';

// store
import { useNavStore, usePlatformStore, useWebGlStore } from '@/store';

// config
import {
	MESH_NAME,
	FBO_CONFIG,
	CHAP,
	TRANSLUCENT,
	BALL_INIT_UNIFORMS,
	BALL_INIT_MATERIAL,
	ORIGINAL,
} from '@/config/constants';

// util
// import { getIsInViewport } from '@/utils';

// type
import type { Group, Mesh, Object3D, BufferGeometry, MeshPhysicalMaterial } from 'three';

// gsap
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface BillboardProps {
	children: React.ReactNode;
}

type BallMesh = Mesh<BufferGeometry, CustomShaderMaterial & MeshPhysicalMaterial>;
type TorsoMesh = Mesh<BufferGeometry, ShaderMaterial>;

interface MutatedMeshesType {
	containerGroup: Group;
	textGroup: Group;
	torso: TorsoMesh;
	ball: BallMesh;
	clonedBall: BallMesh;
}

interface MutatedObject3DMeshes {
	containerGroup: Object3D | null | undefined;
	textGroup: Object3D | null | undefined;
	torso: Object3D | null | undefined;
	ball: Object3D | null | undefined;
	clonedBall: Object3D | null | undefined;
}

type CurrGsapMorph = Record<string, number>;

export default function Billboard({ children }: BillboardProps) {
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
		[billboardBuffer.texture],
	);

	const mutatedMeshes = useRef<MutatedObject3DMeshes>({
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

	const aboutBuffer = useFBO(1024, 1024, FBO_CONFIG);
	const skillBuffer = useFBO(128, 128, FBO_CONFIG);
	const experienceBuffer = useFBO(1024, 1024, FBO_CONFIG);

	const chapBufferMap = {
		[CHAP.ABOUT]: aboutBuffer,
		[CHAP.SKILL]: skillBuffer,
		[CHAP.EXPERIENCE]: experienceBuffer,
	};

	useLenis((event: Lenis) => (velocityRef.current = (event as Lenis & { velocity: number }).velocity));

	useEffect(() => {
		billboardMaterial.uniforms.uDisplacement.value = useWebGlStore.getState().rippleBuffer?.texture;
	}, [billboardMaterial.uniforms.uDisplacement]);

	useEffect(() => {
		useWebGlStore.setState({
			translucentBuffer,
			aboutBuffer,
			skillBuffer,
			experienceBuffer,
		});
	}, [translucentBuffer, aboutBuffer, skillBuffer, experienceBuffer]);

	useFrame(({ gl, camera, size, viewport }, delta) => {
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
		chapBufferMap[CHAP.ABOUT].setSize(baseResW, baseResH);

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
				} = mutatedMeshes.current as MutatedMeshesType;

				const {
					//
					roughness,
					metalness,
					iridescence,
					clearcoat,
				} = ball.material;
				const currGsapMorph: CurrGsapMorph = {
					//
					roughness,
					metalness,
					iridescence,
					clearcoat,
				};

				textGroup.visible = false;
				containerGroup.visible = false;

				if (!isNavOpen) {
					// @ts-ignore
					const detectInViewMeshes = [...containerMaskedMeshes].filter(mesh =>
						ScrollTrigger.isInViewport(mesh.userData.el),
					);

					if (detectInViewMeshes.length) {
						let checkAnchorExist: Record<string, number> = {};
						const meshesToMutate = detectInViewMeshes.filter(mesh => {
							const { anchor } = mesh.userData.dataset;
							return checkAnchorExist[anchor] ? false : (checkAnchorExist[anchor] = 1);
						});

						const renderIdx = pingPongMutationRef.current++ % meshesToMutate.length;
						let mesh = meshesToMutate[renderIdx];

						if (mesh) {
							const { anchor } = mesh.userData.dataset;
							offscreenMutate(anchor, ball, torso, clonedBall, billboardScene, isMobile, currGsapMorph);
							gl.setRenderTarget(chapBufferMap[anchor]);
							gl.render(billboardScene, camera);
						}
					}
				}

				offscreenMutate(TRANSLUCENT, ball, torso, clonedBall, billboardScene, isMobile, currGsapMorph);

				if (!isNavOpen && pingPongTranslucentRef.current++ % 5) {
					gl.setRenderTarget(translucentBuffer);
					gl.render(billboardScene, camera);
				}

				textGroup.visible = true;
				containerGroup.visible = true;

				offscreenMutate(ORIGINAL, ball, torso, clonedBall, billboardScene, isMobile, currGsapMorph);
			}
		}
	});

	useFrame(({ gl, camera }) => {
		gl.setRenderTarget(billboardBuffer);
		gl.render(billboardScene, camera);
		gl.setRenderTarget(null);
	});

	// console.log('billboard rerenders');

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

function offscreenMutate(
	type: string,
	ball: BallMesh,
	torso: TorsoMesh,
	clonedBall: BallMesh,
	scene: Scene,
	isMobile: boolean,
	currGsapMorph: CurrGsapMorph,
) {
	if (type === CHAP.ABOUT) {
		torso.material.uniforms.uBrightColor.value.set('#7B60FB');
		torso.material.uniforms.uDarkColor.value.set('#FF00C7');
		ball.material.uniforms.uIsNormalColor.value = 1;
		ball.material.wireframe = true;
		ball.material.roughness = 0.5;
		ball.material.displacementScale = 1;
	}

	if (type === CHAP.SKILL) {
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
	}

	if (type === CHAP.EXPERIENCE) {
		torso.material.uniforms.uBrightColor.value.set('#FF0000');
		torso.material.uniforms.uDarkColor.value.set('#0500FF');
		ball.material.uniforms.uIsNormalColor.value = 1;
		ball.material.wireframe = true;
		ball.material.roughness = 0.1;
		ball.material.metalness = 1;
		ball.material.uniforms.uFractAmount.value = 0.1;
		ball.scale.set(0.5, 0.5, 0.5);
		clonedBall.material.wireframe = true;
		clonedBall.scale.copy(ball.scale);
	}

	if (type === TRANSLUCENT) {
		const scale: [number, number, number] = isMobile ? [0.6, 0.6, 0.6] : [1.1, 1.1, 1.1];
		scene.environmentIntensity = 0.05;
		torso.material.uniforms.uBrightColor.value.set('#69D2B7');
		torso.material.uniforms.uDarkColor.value.set('#868686');
		ball.material.uniforms.uFractAmount.value = BALL_INIT_UNIFORMS.uFractAmount.value;
		ball.material.uniforms.uIsNormalColor.value = BALL_INIT_UNIFORMS.uIsNormalColor.value;
		ball.material.uniforms.uColor.value.set('#002BF9');
		ball.material.sheenColor.set('#fd267a');
		ball.material.wireframe = true;
		ball.material.displacementScale = 0.3;
		ball.material.sheen = 1;
		ball.material.iridescence = 1;
		ball.material.roughness = currGsapMorph.roughness;
		ball.material.metalness = currGsapMorph.metalness;
		ball.material.clearcoat = currGsapMorph.clearcoat;
		ball.material.emissive.set('#FFC58D');
		ball.material.emissiveIntensity = 0.3;
		ball.scale.set(...scale);
		clonedBall.scale.copy(ball.scale);
		clonedBall.material.wireframe = true;
	}

	if (type === ORIGINAL && currGsapMorph) {
		scene.environmentIntensity = 1.25;
		ball.material.wireframe = false;
		ball.material.emissiveIntensity = BALL_INIT_MATERIAL.emissiveIntensity;
		ball.material.sheen = BALL_INIT_MATERIAL.sheen;
		ball.material.displacementScale = BALL_INIT_MATERIAL.displacementScale;
		ball.material.iridescence = currGsapMorph.iridescence;
		ball.material.uniforms.uColor.value.set('#e6ff00');
		clonedBall.material.wireframe = false;
	}
}

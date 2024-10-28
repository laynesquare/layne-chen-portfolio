import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFBO } from '@react-three/drei';
import { createPortal, useFrame, useThree, useLoader } from '@react-three/fiber';
import {
	GLSL3,
	Scene,
	ShaderMaterial,
	TextureLoader,
	Vector2,
	MeshBasicMaterial,
	Vector3,
	LinearFilter,
	RGBAFormat,
	NearestFilter,
	UnsignedByteType,
	PlaneGeometry,
	FrontSide,
	Plane,
	NoBlending,
} from 'three';

import vertexShader from '@/shaders/animated-scroll-warp/vertex';
import fragmentShader from '@/shaders/animated-scroll-warp/fragment';

import { useLenis } from '@studio-freight/react-lenis';

import { lerp } from 'three/src/math/MathUtils.js';

import { useDomStore, useNavStore, usePlatformStore, useWebGlStore, useCursorStore } from '@/store';

// gsap
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const MOBILE_SCALE = [0.6, 0.6, 0.6];
const DESKTOP_SCALE = [1, 1, 1];
const SMOOTHING_FACTOR = 0.025;
const BASE_ENVIRONMENT_INTENSITY = 0.125;
const ENHANCED_ENVIRONMENT_INTENSITY = 1.5;

export default memo(function Ripple({ children }) {
	const getThree = useThree(state => state.get);

	const portBuffer = useRef(
		useFBO(0, 0, {
			samples: 0,
			minFilter: LinearFilter,
			magFilter: LinearFilter,
			format: RGBAFormat,
			type: UnsignedByteType,
			stencilBuffer: false,
			anisotropy: 0,
			colorSpace: '',
			generateMipmaps: false,
		}),
	);

	const rippleBuffer = useRef(
		useFBO(32, 32, {
			samples: 0,
			minFilter: NearestFilter,
			magFilter: LinearFilter,
			format: RGBAFormat,
			type: UnsignedByteType,
			stencilBuffer: false,
			depthBuffer: false,
			depth: false,
			anisotropy: 0,
			colorSpace: '',
			generateMipmaps: false,
		}),
	);

	const portScene = useRef(new Scene());
	const rippleScene = useRef(new Scene());

	const velocityRef = useRef(0);
	const preMousePos = useRef({ x: 0, y: 0 });
	const rippleVec3 = useRef(new Vector3());
	const rippleTexture = useLoader(TextureLoader, '/scenery/textures/ripple.png');
	const rippleRefs = useRef([]);
	const rippleCurrIdx = useRef(-1);
	const rippleGeoRef = useRef(new PlaneGeometry(0.5, 0.5, 1, 1));
	const rippleMaterialRef = useRef(
		new MeshBasicMaterial({
			map: rippleTexture,
			transparent: true,
			visible: false,
			depthTest: false,
			depthWrite: false,
			stencilWrite: false,
			side: FrontSide,
			// blending: NoBlending,
		}),
	);

	const portGeoRef = useRef(new PlaneGeometry(1, 1, 64, 64));
	const portMaterialRef = useRef(
		new ShaderMaterial({
			uniforms: {
				uTime: { value: 0 },
				uScrollVelocity: { value: 0 },
				uTexture: { value: portBuffer.current.texture },
				uDisplacement: { value: rippleBuffer.current.texture },
			},
			vertexShader,
			fragmentShader,
			glslVersion: GLSL3,
			depthTest: false,
			depthWrite: false,
			side: FrontSide,
			blending: NoBlending,
		}),
	);

	const mutatedMeshes = useRef({
		containerMeshGroup: null,
		textMeshGroup: null,
		torsoMesh: null,
		psychedelicBallMesh: null,
		psychedelicBallClonedMesh: null,
	});

	useLenis(event => {
		velocityRef.current = event.velocity;
	});

	const ripples = useRef(
		(() => {
			const max = 25;
			const meshes = [];

			for (let i = 0; i < max; i++) {
				meshes.push(
					<mesh
						key={i}
						ref={el => (rippleRefs.current[i] = el)}
						material={rippleMaterialRef.current.clone()}
						position={[0, 0, 3]}
						rotation={[0, 0, 2 * Math.PI * Math.random()]}
						geometry={rippleGeoRef.current}></mesh>,
				);
			}

			return meshes;
		})(),
	);

	const handleMouseMove = useCallback(
		(event: MouseEvent) => {
			const { size, camera } = getThree();
			const ndcX = (event.clientX / size.width) * 2 - 1;
			const ndcY = -((event.clientY / size.height) * 2 - 1);

			const vector = rippleVec3.current;
			vector.set(ndcX, ndcY, 0.5);
			vector.unproject(camera);
			vector.sub(camera.position).normalize();
			const distance = (3 - camera.position.z) / vector.z;

			const offsetX = Math.abs(preMousePos.current.x - event.clientX);
			const offsetY = Math.abs(preMousePos.current.y - event.clientY);

			const isRippleZone = useCursorStore.getState().isRippleZone;

			if ((offsetX >= 0.5 || offsetY >= 0.5) && isRippleZone) {
				rippleCurrIdx.current = (rippleCurrIdx.current + 1) % 25;
				rippleRefs.current[rippleCurrIdx.current].material.visible = true;
				rippleRefs.current[rippleCurrIdx.current].material.opacity = 1;
				rippleRefs.current[rippleCurrIdx.current].scale.x = rippleRefs.current[
					rippleCurrIdx.current
				].scale.y = 1;
				rippleRefs.current[rippleCurrIdx.current].position
					.copy(camera.position)
					.add(vector.multiplyScalar(distance));
			}

			preMousePos.current = { x: event.clientX, y: event.clientY };
		},
		[getThree],
	);

	const maskBufferType = ['ABOUT', 'SKILL', 'EXPERIENCE'];

	useFrame(({ clock, gl, camera, scene, size, viewport, performance, setFrameloop, invalidate }, delta) => {
		const isNavOpen = useNavStore.getState().isOpen;
		const isMobile = usePlatformStore.getState().isMobile;
		const regression = isNavOpen ? 1 : 1;
		const dynamicDpr = isMobile
			? Math.max(Math.min(window.devicePixelRatio, 2.5), 2)
			: window.devicePixelRatio > 1
			? 1
			: 1.2;

		const baseResW = size.width * dynamicDpr * regression;
		const baseResH = size.height * dynamicDpr * regression;
		portBuffer.current.setSize(baseResW, baseResH);
		translucentBuffer.current.setSize(baseResW / 2, baseResH / 2);
		maskBufferMap.current['ABOUT'].buffer.setSize(baseResW / 2, baseResH / 2);

		if (portMaterialRef.current) {
			portMaterialRef.current.uniforms.uTime.value += delta;
			const currentVelocity = portMaterialRef.current.uniforms.uScrollVelocity.value;
			const targetVelocity = velocityRef.current;
			const smoothingFactor = 0.025;
			const smoothedVelocity = lerp(currentVelocity, targetVelocity, smoothingFactor);
			portMaterialRef.current.uniforms.uScrollVelocity.value = smoothedVelocity;
		}

		if (!Object.values(mutatedMeshes.current).every(Boolean)) {
			mutatedMeshes.current = {
				containerMeshGroup: portScene.current.getObjectByName('container-mesh-group'),
				textMeshGroup: portScene.current.getObjectByName('text-mesh-group'),
				torsoMesh: portScene.current.getObjectByName('torso-mesh'),
				psychedelicBallMesh: portScene.current.getObjectByName('psychedelic-ball-mesh'),
				psychedelicBallClonedMesh: portScene.current.getObjectByName('psychedelic-ball-cloned-mesh'),
			};
		} else {
			const containerMaskedMeshes = useWebGlStore.getState().containerMaskedMeshes;
			if (containerMaskedMeshes?.size) {
				const {
					//
					containerMeshGroup,
					textMeshGroup,
					torsoMesh,
					psychedelicBallMesh,
					psychedelicBallClonedMesh,
				} = mutatedMeshes.current;

				containerMeshGroup.visible = false;
				textMeshGroup.visible = false;

				const ogRoughness = psychedelicBallMesh.material.roughness;
				const ogMetalness = psychedelicBallMesh.material.metalness;
				const ogIridescence = psychedelicBallMesh.material.iridescence;
				const ogClearcoat = psychedelicBallMesh.material.clearcoat;

				if (!isNavOpen) {
					containerMaskedMeshes.forEach(mesh => {
						const inView = ScrollTrigger.isInViewport(mesh.userData.el);
						if (inView && maskBufferType.includes(mesh.name)) {
							maskBufferMap.current[mesh.name].mutateScene(
								psychedelicBallMesh,
								mesh,
								torsoMesh,
								psychedelicBallClonedMesh,
							);
							gl.setRenderTarget(maskBufferMap.current[mesh.name].buffer);
							gl.render(portScene.current, camera);
						}
					});
				}

				portScene.current.environmentIntensity = 0.125;
				torsoMesh.material.uniforms.uBrightColor.value.set('#69D2B7');
				torsoMesh.material.uniforms.uDarkColor.value.set('#868686');
				psychedelicBallMesh.material.wireframe = true;
				psychedelicBallClonedMesh.material.wireframe = true;
				psychedelicBallMesh.material.uniforms.uFractAmount.value = 0.8;
				psychedelicBallMesh.material.uniforms.uIsNormalColor.value = 0;
				psychedelicBallMesh.material.uniforms.uColor.value.set('#002BF9');
				psychedelicBallMesh.material.sheenColor.set('#fd267a');
				psychedelicBallMesh.material.displacementScale = 0.3;
				psychedelicBallMesh.material.sheen = 1;
				psychedelicBallMesh.material.iridescence = 1;
				psychedelicBallMesh.material.roughness = ogRoughness;
				psychedelicBallMesh.material.metalness = ogMetalness;
				psychedelicBallMesh.material.clearcoat = ogClearcoat;
				psychedelicBallMesh.scale.set(...(isMobile ? [0.6, 0.6, 0.6] : [1, 1, 1]));
				psychedelicBallClonedMesh.scale.copy(psychedelicBallMesh.scale);

				if (!isNavOpen) {
					gl.setRenderTarget(translucentBuffer.current);
					gl.render(portScene.current, camera);
				}

				containerMeshGroup.visible = true;
				textMeshGroup.visible = true;
				portScene.current.environmentIntensity = 1.4;
				psychedelicBallMesh.material.wireframe = false;
				psychedelicBallClonedMesh.material.wireframe = false;
				psychedelicBallMesh.material.wireframe = false;
				psychedelicBallMesh.material.sheen = 0;
				psychedelicBallMesh.material.displacementScale = 0;
				psychedelicBallMesh.material.iridescence = ogIridescence;
				psychedelicBallMesh.material.uniforms.uColor.value.set('#e6ff00');
			}
		}

		updateRipples(rippleRefs);

		gl.setRenderTarget(rippleBuffer.current);
		gl.render(rippleScene.current, camera);

		gl.setRenderTarget(portBuffer.current);
		gl.render(portScene.current, camera);

		gl.setRenderTarget(null);
	});

	function updateRipples(rippleRefs) {
		rippleRefs.current.forEach(mesh => {
			mesh.rotation.z += 0.025;
			mesh.material.opacity *= 0.95;
			mesh.scale.x = 0.98 * mesh.scale.x + 0.155;
			mesh.scale.y = mesh.scale.x;
		});
	}

	console.log('ripple re rerenders');

	const maskBufferConfig = {
		samples: 0,
		minFilter: NearestFilter,
		magFilter: NearestFilter,
		format: RGBAFormat,
		type: UnsignedByteType,
		anisotropy: 0,
		colorSpace: '',
		generateMipmaps: false,
		stencilBuffer: false,
	};

	const translucentBuffer = useRef(
		useFBO(0, 0, {
			samples: 0,
			minFilter: NearestFilter,
			magFilter: NearestFilter,
			format: RGBAFormat,
			type: UnsignedByteType,
			anisotropy: 0,
			colorSpace: '',
			generateMipmaps: false,
			stencilBuffer: false,
			depthBuffer: false,
			depth: false,
		}),
	);

	const maskBufferMap = useRef({
		ABOUT: {
			buffer: useFBO(0, 0, maskBufferConfig),
			mutateScene: (ballMesh, containerMesh, torsoMesh) => {
				ballMesh.material.uniforms.uIsNormalColor.value = 1;
				torsoMesh.material.uniforms.uBrightColor.value.set('#7B60FB');
				torsoMesh.material.uniforms.uDarkColor.value.set('#FF00C7');
				ballMesh.material.wireframe = true;
				ballMesh.material.roughness = 0.5;
				ballMesh.material.displacementScale = 1;
			},
		},
		SKILL: {
			buffer: useFBO(64, 64, maskBufferConfig),
			mutateScene: (ballMesh, containerMesh, torsoMesh, psychedelicBallClonedMesh) => {
				torsoMesh.material.uniforms.uBrightColor.value.set('#FF0000');
				torsoMesh.material.uniforms.uDarkColor.value.set('#0500FF');
				ballMesh.material.uniforms.uColor.value.set('#FF0000');
				ballMesh.material.uniforms.uIsNormalColor.value = 0;
				ballMesh.material.wireframe = false;
				ballMesh.material.roughness = 0.3;
				ballMesh.material.metalness = 0.3;
				ballMesh.material.iridescence = 0.5;
				ballMesh.material.displacementScale = 0;
				ballMesh.material.sheen = 1.0;
				ballMesh.material.clearcoat = 0.0;
				ballMesh.material.ior = 0.0;
				ballMesh.material.sheenColor.set('#fd267a');
			},
		},
		EXPERIENCE: {
			buffer: useFBO(512, 512, maskBufferConfig),
			mutateScene: (ballMesh, containerMesh, torsoMesh, psychedelicBallClonedMesh) => {
				torsoMesh.material.uniforms.uBrightColor.value.set('#FF0000');
				torsoMesh.material.uniforms.uDarkColor.value.set('#0500FF');
				containerMesh.material.uniforms.uHeatMap.value = 1;
				ballMesh.material.uniforms.uIsNormalColor.value = 1;
				ballMesh.material.wireframe = true;
				psychedelicBallClonedMesh.material.wireframe = true;
				ballMesh.material.uniforms.uFractAmount.value = 0.1;
				ballMesh.scale.set(0.5, 0.5, 0.5);
				psychedelicBallClonedMesh.scale.copy(ballMesh.scale);
			},
		},
	});

	useEffect(() => {
		useWebGlStore.setState({
			shareTranslucentBuffer: translucentBuffer.current,
			maskBufferMap: maskBufferMap.current,
		});
	}, []);

	useEffect(() => {
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, [handleMouseMove]);

	return (
		<>
			{createPortal(children, portScene.current)}
			{createPortal(ripples.current, rippleScene.current)}
			<mesh
				castShadow={false}
				receiveShadow={false}
				scale={[getThree().viewport.width * 1.005, getThree().viewport.height * 1.0055, 1]}
				material={portMaterialRef.current}
				position={[0, 0, 0]}
				geometry={portGeoRef.current}></mesh>
		</>
	);
});

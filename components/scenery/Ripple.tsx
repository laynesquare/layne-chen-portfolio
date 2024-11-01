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
	Color,
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
		ballMesh: null,
		clonedBallMesh: null,
	});

	const pingPongMutationRef = useRef(0);
	const pingPongTranslucentRef = useRef(0);

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
			if (!useWebGlStore.getState().isEntryAnimationDone) return;
			const { size, camera } = getThree();
			const ndcX = (event.clientX / size.width) * 2 - 1;
			const ndcY = -((event.clientY / size.height) * 2 - 1);

			useCursorStore.setState({
				curr: { x: event.clientX, y: event.clientY, cursor: window.getComputedStyle(event.target).cursor },
				ndcPosition: useCursorStore.getState().ndcPosition.set(ndcX, ndcY),
			});

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
		portBuffer.current.setSize(baseResW, baseResH);
		translucentBuffer.current.setSize(baseResW, baseResH);
		maskBufferMap.current['ABOUT'].buffer.setSize(baseResW, baseResH);

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
				ballMesh: portScene.current.getObjectByName('ball-mesh'),
				clonedBallMesh: portScene.current.getObjectByName('cloned-ball-mesh'),
			};
		} else {
			const containerMaskedMeshes = useWebGlStore.getState().containerMaskedMeshes;
			if (containerMaskedMeshes?.size) {
				const {
					//
					containerMeshGroup,
					textMeshGroup,
					torsoMesh,
					ballMesh,
					clonedBallMesh,
				} = mutatedMeshes.current;

				const ogRoughness = ballMesh.material.roughness;
				const ogMetalness = ballMesh.material.metalness;
				const ogIridescence = ballMesh.material.iridescence;
				const ogClearcoat = ballMesh.material.clearcoat;

				containerMeshGroup.visible = false;
				textMeshGroup.visible = false;

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
							maskBufferMap.current[anchor].mutateScene(ballMesh, torsoMesh, clonedBallMesh);

							gl.setRenderTarget(maskBufferMap.current[anchor].buffer);
							gl.render(portScene.current, camera);
						}
					}
				}

				portScene.current.environmentIntensity = 0.05;
				torsoMesh.material.uniforms.uBrightColor.value.set('#69D2B7');
				torsoMesh.material.uniforms.uDarkColor.value.set('#868686');
				ballMesh.material.wireframe = true;
				clonedBallMesh.material.wireframe = true;
				ballMesh.material.uniforms.uFractAmount.value = 0.8;
				ballMesh.material.uniforms.uIsNormalColor.value = 0;
				ballMesh.material.uniforms.uColor.value.set('#002BF9');
				ballMesh.material.sheenColor.set('#fd267a');
				ballMesh.material.displacementScale = 0.3;
				ballMesh.material.sheen = 1;
				ballMesh.material.iridescence = 1;
				ballMesh.material.roughness = ogRoughness;
				ballMesh.material.metalness = ogMetalness;
				ballMesh.material.clearcoat = ogClearcoat;
				ballMesh.material.emissive.set('#FFC58D');
				ballMesh.material.emissiveIntensity = 0.3;
				ballMesh.scale.set(...(isMobile ? [0.6, 0.6, 0.6] : [1, 1, 1]));
				clonedBallMesh.scale.copy(ballMesh.scale);

				const shouldRender = pingPongTranslucentRef.current++ % 5;
				if (!isNavOpen && shouldRender) {
					gl.setRenderTarget(translucentBuffer.current);
					gl.render(portScene.current, camera);
				}

				containerMeshGroup.visible = true;
				textMeshGroup.visible = true;
				portScene.current.environmentIntensity = 1.25;
				ballMesh.material.emissiveIn;
				ballMesh.material.wireframe = false;
				ballMesh.material.wireframe = false;
				clonedBallMesh.material.wireframe = false;
				ballMesh.material.emissiveIntensity = 0;
				ballMesh.material.sheen = 0;
				ballMesh.material.displacementScale = 0;
				ballMesh.material.iridescence = ogIridescence;
				ballMesh.material.uniforms.uColor.value.set('#e6ff00');
			}
		}
	});

	useFrame(({ gl, camera }) => {
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
		useFBO(1024, 1024, {
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
			buffer: useFBO(1024, 1024, maskBufferConfig),
			mutateScene: (ballMesh, torsoMesh) => {
				ballMesh.material.uniforms.uIsNormalColor.value = 1;
				torsoMesh.material.uniforms.uBrightColor.value.set('#7B60FB');
				torsoMesh.material.uniforms.uDarkColor.value.set('#FF00C7');
				ballMesh.material.wireframe = true;
				ballMesh.material.roughness = 0.5;
				ballMesh.material.displacementScale = 1;
			},
		},
		SKILL: {
			buffer: useFBO(128, 128, maskBufferConfig),
			mutateScene: (ballMesh, torsoMesh, clonedBallMesh) => {
				torsoMesh.material.uniforms.uBrightColor.value.set('#FF0000');
				torsoMesh.material.uniforms.uDarkColor.value.set('#0500FF');
				ballMesh.material.uniforms.uColor.value.set('#FF0000');
				ballMesh.material.uniforms.uIsNormalColor.value = 0;
				ballMesh.material.wireframe = false;
				ballMesh.material.roughness = 0.5;
				ballMesh.material.metalness = 0.3;
				ballMesh.material.iridescence = 0.5;
				ballMesh.material.displacementScale = 0;
				ballMesh.material.sheen = 1.0;
				ballMesh.material.clearcoat = 0.0;
				ballMesh.material.ior = 0.0;
				ballMesh.material.sheenColor.set('#ff69b4');
			},
		},
		EXPERIENCE: {
			buffer: useFBO(1024, 1024, maskBufferConfig),
			mutateScene: (ballMesh, torsoMesh, clonedBallMesh) => {
				torsoMesh.material.uniforms.uBrightColor.value.set('#FF0000');
				torsoMesh.material.uniforms.uDarkColor.value.set('#0500FF');
				ballMesh.material.uniforms.uIsNormalColor.value = 1;
				ballMesh.material.wireframe = true;
				ballMesh.material.roughness = 0.1;
				ballMesh.material.metalness = 1;
				clonedBallMesh.material.wireframe = true;
				ballMesh.material.uniforms.uFractAmount.value = 0.1;
				ballMesh.scale.set(0.5, 0.5, 0.5);
				clonedBallMesh.scale.copy(ballMesh.scale);
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

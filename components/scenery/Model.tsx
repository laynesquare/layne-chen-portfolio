/// cSpell: ignore Raycaster, GLTF, metalness, clearcoat, matcap, drei

import { memo, useEffect, useMemo, useRef, useState } from 'react';
import {
	MeshTransmissionMaterial,
	useAnimations,
	useGLTF,
	Float,
	Sparkles,
	Billboard,
	RoundedBox,
	useScroll,
	meshBounds,
} from '@react-three/drei';
import { Intersection, useFrame, useGraph, useLoader, useThree } from '@react-three/fiber';
import { BallCollider, Physics, RigidBody, CylinderCollider, RapierRigidBody } from '@react-three/rapier';
import { MeshBVH, acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';

import {
	Group,
	Raycaster,
	Vector2,
	Vector3,
	Quaternion,
	Mesh,
	TextureLoader,
	Color,
	LoopRepeat,
	MeshMatcapMaterial,
	MeshPhysicalMaterial,
	MeshDepthMaterial,
	MeshNormalMaterial,
	RGBADepthPacking,
	DoubleSide,
	ShaderMaterial,
	IcosahedronGeometry,
	MathUtils,
	SphereGeometry,
	TorusGeometry,
	FrontSide,
	BackSide,
	CubeRefractionMapping,
	Euler,
	MeshBasicMaterial,
	CircleGeometry,
	NoBlending,
} from 'three';

import { ReactLenis, useLenis } from '@studio-freight/react-lenis';

import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import vertexShader from '@/shaders/animated-displaced-sphere/vertex';
import fragmentShader from '@/shaders/animated-displaced-sphere/fragment';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import { useControls } from 'leva';
import { lerp } from 'three/src/math/MathUtils.js';

import { useDomStore, usePlatformStore, useWebGlStore } from '@/store';

// gsap
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default memo(function Model() {
	const getThree = useThree(state => state.get);

	const ballRef = useRef();
	const ballCloneRef = useRef();
	const ballInitPosRef = useRef(new Vector3(5, 5, 1));
	const ballCenterPosRef = useRef(new Vector3(0, 0, 1));
	const ballDynamicPosRef = useRef(new Vector3());
	const ballClonedDynamicPosRef = useRef(new Vector3());
	const ballMeshRatio = 1 - getThree().viewport.factor / calcFactorCamZ(1);
	const ballGeometry = useRef(
		(() => {
			const geometry = mergeVertices(new IcosahedronGeometry(0.5, 64));
			geometry.computeTangents();
			return geometry;
		})(),
	);

	const ballMaskRef = useRef(null);
	const ballClonedMaskRef = useRef(null);

	const scrollOffsetRef = useRef(0);

	const displacementTexture = useLoader(TextureLoader, '/scenery/textures/test2.jpg');

	const uniformsRef = useRef({
		uTime: { value: 0 },
		uColor: { value: new Color(0xe6ff00) },
		uSpeed: { value: 4 },
		uNoiseStrength: { value: 2.5 },
		uDisplacementStrength: { value: 1 },
		uFractAmount: { value: 0.8 },
		uIsNormalColor: { value: 0 },
	});

	useFrame(({ clock, scene, gl, raycaster, invalidate }, delta) => {
		const inViewEl = [...useDomStore.getState().anchorEls].findLast(el => ScrollTrigger.isInViewport(el, 0.3));

		if (!inViewEl && ballCloneRef.current) {
			const epsilon = ballRef.current.position.distanceTo(ballCenterPosRef.current) > 0.005;
			if (epsilon) {
				ballRef.current.position.lerp(ballCenterPosRef.current, 0.035);
				ballMaskRef.current.position.copy(ballRef.current.position);
				ballCloneRef.current?.position.copy(ballRef.current.position);
				ballClonedMaskRef.current?.position.copy(ballRef.current.position);
				ballCloneRef.current.visible = false;
			}
		}

		ballCloneRef.current?.rotation.copy(ballRef.current.rotation);

		const isMobile = usePlatformStore.getState().isMobile;

		ballMaskRef.current?.scale.set(...(isMobile ? [0.72, 0.72, 0.72] : [1.2, 1.2, 1.2]));
		ballClonedMaskRef.current?.scale.copy(ballMaskRef.current?.scale);

		ballMaterialUpdate(delta);
		ballRotationUpdate(clock.elapsedTime);
	});

	function ballRotationUpdate(elapsedTime) {
		const isBallPress = useWebGlStore.getState().isBallPress;
		const speed = isBallPress ? 5 : 1.2;
		const targetRotationX = Math.cos(elapsedTime) * speed;
		const targetRotationY = Math.sin(elapsedTime) * speed;
		const targetRotationZ = Math.sin(elapsedTime) * speed;

		ballRef.current.rotation.x = lerp(ballRef.current.rotation.x, targetRotationX, 0.1);
		ballRef.current.rotation.y = lerp(ballRef.current.rotation.y, targetRotationY, 0.1);
		ballRef.current.rotation.z = lerp(ballRef.current.rotation.z, targetRotationZ, 0.1);
	}

	useLenis(event => {
		scrollOffsetRef.current = event.scroll;
		updatePosByScroll();
	});

	function updatePosByScroll() {
		const els = [...useDomStore.getState().anchorEls];
		const inViewEl = els.findLast(el => ScrollTrigger.isInViewport(el, 0.3));
		const { viewport } = getThree();

		if (!inViewEl) return;

		const { anchor, anchorMirror } = inViewEl.dataset;
		const { factor } = viewport;
		const baseX = (-viewport.width / 2) * ballMeshRatio;
		const baseY = (viewport.height / 2) * ballMeshRatio;

		const getElementPosition = el => {
			const { left, top, width, height } = el.getBoundingClientRect();
			const shiftHalfW = width / 2;
			const shiftHalfH = height / 2;
			const x = baseX + ((left + shiftHalfW) / factor) * ballMeshRatio;
			const y = baseY - ((top + shiftHalfH) / factor) * ballMeshRatio;
			return { x, y };
		};

		const { x: targetX, y: targetY } = getElementPosition(inViewEl);
		const targetBallPos = ballDynamicPosRef.current.set(targetX, targetY, 1);
		ballRef.current.position.lerp(targetBallPos, 0.035);
		ballMaskRef.current.position.copy(ballRef.current.position);

		if (anchorMirror) {
			const inViewMirrorEl = els.find(el => el.dataset['anchor'] === anchor && el !== inViewEl);
			const { x: mirrorX, y: mirrorY } = getElementPosition(inViewMirrorEl);
			const targetBallClonePos = ballClonedDynamicPosRef.current.set(mirrorX, mirrorY, 1);
			ballCloneRef.current.position.lerp(targetBallClonePos, 0.035);
			ballClonedMaskRef.current.position.copy(ballCloneRef.current.position);
			ballCloneRef.current.visible = true;
		} else {
			ballCloneRef.current.position.lerp(targetBallPos, 0.035);
			ballClonedMaskRef.current.position.copy(ballCloneRef.current.position);
		}
	}

	useEffect(() => {
		const { scene } = getThree();
		ballCloneRef.current = ballRef.current.clone();
		ballCloneRef.current.name = 'psychedelic-ball-cloned-mesh';
		ballCloneRef.current.visible = false;
		scene.add(ballCloneRef.current);
	}, []);

	function ballMaterialUpdate(delta: number) {
		ballRef.current.material.uniforms.uTime.value += delta;
	}

	function calcFactorCamZ(zPosition: number) {
		const { camera, size } = getThree();
		const fov = (camera.fov * Math.PI) / 180;
		const h = 2 * Math.tan(fov / 2) * zPosition;
		const w = h * (size.width / size.height);
		const factor = size.width / w;
		return factor;
	}

	const ballMaterialRef = useRef(
		new CustomShaderMaterial({
			baseMaterial: new MeshPhysicalMaterial(),
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			roughness: 0.1,
			metalness: 0.1,
			reflectivity: 0.46,
			clearcoat: 1.0,
			ior: 0,
			iridescence: 0,
			iridescenceIOR: 1.3,
			uniforms: uniformsRef.current,
			displacementMap: displacementTexture,
			displacementScale: 0,
			silent: true,
			transparent: true,
			side: FrontSide,
			blending: NoBlending,
		}),
	);

	console.log('model re rerenders');

	return (
		<group>
			<mesh
				name='psychedelic-ball-mesh'
				raycast={meshBounds}
				ref={ballRef}
				geometry={ballGeometry.current}
				position={ballInitPosRef.current}
				material={ballMaterialRef.current}
				frustumCulled={false}></mesh>

			<MaskBall
				ballRef={ballRef}
				ballMaskRef={ballMaskRef}
				ballClonedMaskRef={ballClonedMaskRef}
			/>
		</group>
	);
});

function MaskBall({ ballRef, ballMaskRef, ballClonedMaskRef }) {
	const isBallPress = useWebGlStore(state => state.isBallPress);
	const ballMaskGeo = useRef(new CircleGeometry(1, 8));
	const ballMaskMaterialRef = useRef(
		new MeshBasicMaterial({
			visible: true,
			depthTest: false,
			depthWrite: false,
			transparent: true,
			opacity: 0,
			side: FrontSide,
		}),
	);

	useGSAP(
		() => {
			if (ballRef.current && ballRef.current.material) {
				if (isBallPress) {
					gsap.to(ballRef.current.material.uniforms.uDisplacementStrength, {
						value: 1.5,
						duration: 0.5,
						ease: 'bounce.out',
					});
					gsap.to(ballRef.current.material.uniforms.uNoiseStrength, {
						value: 1,
						duration: 2,
						ease: 'bounce.out',
					});
					gsap.to(ballRef.current.material, {
						iridescence: 1,
						metalness: 0.6,
						ior: 0.4,
						roughness: 1,
						clearcoat: 0,
						duration: 2,
						ease: 'bounce.out',
					});
				} else {
					gsap.to(ballRef.current.material.uniforms.uDisplacementStrength, {
						value: 1,
						duration: 0.5,
						ease: 'bounce.in',
					});
					gsap.to(ballRef.current.material.uniforms.uNoiseStrength, {
						value: 2.5,
						duration: 2,
						ease: 'bounce.in',
					});
					gsap.to(ballRef.current.material, {
						iridescence: 0.1,
						ior: 0,
						metalness: 0.5,
						roughness: 0.1,
						clearcoat: 1.0,
						duration: 2,
						ease: 'bounce.in',
					});
				}
			}
		},
		{ dependencies: [isBallPress], scope: ballRef },
	);

	return (
		<>
			<mesh
				raycast={meshBounds}
				ref={ballMaskRef}
				position={[0, 0, -1]}
				material={ballMaskMaterialRef.current}
				onPointerDown={e => {
					e.stopPropagation();
					useWebGlStore.setState({ isBallPress: true });
				}}
				onPointerUp={e => {
					e.stopPropagation();
					useWebGlStore.setState({ isBallPress: false });
				}}
				onPointerOver={e => {
					e.stopPropagation();
					document.body.style.cursor = 'pointer';
				}}
				onPointerOut={e => {
					e.stopPropagation();
					useWebGlStore.setState({ isBallPress: false });
					document.body.style.cursor = 'default';
				}}
				scale={1.2}
				geometry={ballMaskGeo.current}></mesh>
			<mesh
				raycast={meshBounds}
				ref={ballClonedMaskRef}
				material={ballMaskMaterialRef.current}
				position={[0, 0, -1]}
				onPointerDown={e => {
					e.stopPropagation();
					useWebGlStore.setState({ isBallPress: true });
				}}
				onPointerUp={e => {
					e.stopPropagation();
					useWebGlStore.setState({ isBallPress: false });
				}}
				onPointerOver={e => {
					e.stopPropagation();
					document.body.style.cursor = 'pointer';
				}}
				onPointerOut={e => {
					e.stopPropagation();
					useWebGlStore.setState({ isBallPress: false });
					document.body.style.cursor = 'default';
				}}
				scale={1.2}
				geometry={ballMaskGeo.current}></mesh>
		</>
	);
}

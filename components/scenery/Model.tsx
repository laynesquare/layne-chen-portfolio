// cSpell: ignore Raycaster, GLTF, metalness, clearcoat, matcap, drei

import { useEffect, useMemo, useRef, useState } from 'react';
import { MeshTransmissionMaterial, useAnimations, useGLTF, Float, Sparkles, Billboard } from '@react-three/drei';
import { Intersection, useFrame, useGraph, useThree } from '@react-three/fiber';
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
	MeshMatcapMaterial,
	Color,
	LoopRepeat,
	MeshPhysicalMaterial,
	MeshDepthMaterial,
	RGBADepthPacking,
	DoubleSide,
	TorusGeometry,
	ShaderMaterial,
	IcosahedronGeometry,
	MathUtils,
	SphereGeometry,
	FrontSide,
} from 'three';

import CustomShaderMaterial from 'three-custom-shader-material';
import vertexShader from '@/shaders/animated-displaced-sphere/vertex';
import fragmentShader from '@/shaders/animated-displaced-sphere/fragment';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import { useControls } from 'leva';
import { lerp } from 'three/src/math/MathUtils.js';

// gsap
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { RoughEase } from 'gsap/EasePack';
gsap.registerPlugin(useGSAP);

export default function Model({ r = MathUtils.randFloatSpread }) {
	const materialRef = useRef(null);
	const depthMaterialRef = useRef(null);
	const [isBallPress, setIsBallPress] = useState(false);
	const ballRef = useRef();
	const ballPos = useMemo(() => [r(10), r(10), r(0)], []);
	const ballGeometry = useMemo(() => {
		const geometry = mergeVertices(new IcosahedronGeometry(1, 128));
		geometry.computeTangents();
		return geometry;
	}, []);

	const ballMaskRef = useRef(null);

	const {
		gradientStrength,
		color,
		speed,
		noiseStrength,
		displacementStrength,
		fractAmount,
		roughness,
		metalness,
		clearcoat,
		reflectivity,
		ior,
		iridescence,
		iridescenceIOR,
		transmission,
		thickness,
		dispersion,
	} = useControls({
		gradientStrength: { value: 1, min: 1, max: 3, step: 0.001 },
		color: '#E0FB60',
		speed: { min: 0, max: 20, step: 0.001, value: 4 },
		noiseStrength: { value: 2, min: 0, max: 10, step: 0.001 },
		displacementStrength: { min: 0, max: 10, step: 0.01, value: 1.2 },
		fractAmount: { min: 0, max: 10, step: 0.1, value: 1.2 },
		roughness: { min: 0, max: 1, step: 0.001, value: 0.5 },
		metalness: { min: 0, max: 1, step: 0.001, value: 0 },
		clearcoat: { min: 0, max: 1, step: 0.001, value: 0 },
		reflectivity: { min: 0, max: 1, step: 0.001, value: 0.46 },
		ior: { min: 0.001, max: 5, step: 0.001, value: 1.2 },
		iridescence: { min: 0, max: 1, step: 0.001, value: 0 },
		iridescenceIOR: { min: 1, max: 2.333, step: 0.001, value: 1.3 },
		transmission: { min: 0, max: 1, step: 0.001, value: 0 },
		thickness: { min: 0, max: 10, step: 0.1, value: 5 },
		dispersion: { min: 0, max: 20, step: 1, value: 5 },
	});

	const uniformsRef = useRef({
		uTime: { value: 0 },
		uColor: { value: new Color(color) },
		uGradientStrength: { value: gradientStrength },
		uSpeed: { value: speed },
		uNoiseStrength: { value: noiseStrength },
		uDisplacementStrength: { value: displacementStrength },
		uFractAmount: { value: fractAmount },
	});

	useEffect(() => {
		initializeGeometry(ballRef);
		initializeGeometry(ballMaskRef);
	}, [ballRef, ballMaskRef]);

	useFrame(({ clock }) => {
		const elapsedTime = clock.getElapsedTime();

		if (materialRef.current && depthMaterialRef.current) {
			updatePosition();
			updateMaterialTime(elapsedTime);
		}
	});

	useGSAP(() => {
		if (ballRef.current && materialRef.current && uniformsRef.current) {
			if (isBallPress) {
				gsap.to(ballRef.current.scale, {
					x: 1.05,
					y: 1.05,
					z: 1.05,
					duration: 1,
					ease: 'elastic',
				});
				gsap.to(materialRef.current.uniforms.uNoiseStrength, {
					value: 4,
					duration: 2.5,
					ease: 'elastic',
				});
				gsap.to(materialRef.current, {
					iridescence: 1,
					metalness: 1,
					clearcoat: 1,
					duration: 1,
					ease: 'bounce.out',
				});
			} else {
				gsap.to(ballRef.current.scale, {
					x: 1,
					y: 1,
					z: 1,
					duration: 1,
					ease: 'elastic',
				});
				gsap.to(materialRef.current.uniforms.uNoiseStrength, {
					value: 2,
					duration: 2.5,
					ease: 'elastic',
				});
				gsap.to(materialRef.current, {
					iridescence: 0.1,
					metalness: 0.1,
					clearcoat: 0,
					duration: 1,
					ease: 'bounce.out',
				});
			}
		}
	}, [isBallPress]);

	function updatePosition() {
		if (ballRef.current) {
			ballRef.current.position.lerp(new Vector3(0, 0, 0), 0.02);
		}
	}

	function initializeGeometry(ref) {
		if (ref?.current?.geometry) {
			ref.current.geometry.computeBoundsTree = computeBoundsTree;
			ref.current.geometry.disposeBoundsTree = disposeBoundsTree;
			ref.current.geometry.boundsTree = new MeshBVH(ref.current.geometry);
		}
	}

	function updateMaterialTime(elapsedTime: number) {
		materialRef.current.uniforms.uTime.value = elapsedTime;
		depthMaterialRef.current.uniforms.uTime.value = elapsedTime;
	}

	return (
		<>
			<mesh
				name='main-character'
				geometry={ballGeometry}
				ref={ballRef}
				position={ballPos}
				frustumCulled={true}>
				<CustomShaderMaterial
					ref={materialRef}
					baseMaterial={MeshPhysicalMaterial}
					silent
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					roughness={roughness}
					metalness={metalness}
					reflectivity={reflectivity}
					clearcoat={clearcoat}
					ior={ior}
					iridescence={iridescence}
					iridescenceIOR={iridescenceIOR}
					transmission={transmission}
					thickness={thickness}
					dispersion={dispersion}
					uniforms={uniformsRef.current}
					transparent
				/>
				<CustomShaderMaterial
					ref={depthMaterialRef}
					baseMaterial={MeshDepthMaterial}
					vertexShader={vertexShader}
					uniforms={uniformsRef.current}
					silent
					depthPacking={RGBADepthPacking}
					attach='customDepthMaterial'
				/>
			</mesh>

			<mesh
				ref={ballMaskRef}
				position={[0, 0, 0]}
				onPointerDown={e => setIsBallPress(true)}
				onPointerUp={e => setIsBallPress(false)}
				onPointerOver={e => (document.body.style.cursor = 'pointer')}
				onPointerOut={e => {
					setIsBallPress(false);
					document.body.style.cursor = 'default';
				}}
				frustumCulled={true}>
				<circleGeometry args={[2, 32]} />
				<meshBasicMaterial
					transparent={true}
					opacity={0}
				/>
			</mesh>
		</>
	);
}

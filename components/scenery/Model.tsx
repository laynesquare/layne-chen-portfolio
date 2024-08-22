// cSpell: ignore Raycaster, GLTF, metalness, clearcoat, matcap, drei

import { useEffect, useMemo, useRef, useState } from 'react';
import { MeshTransmissionMaterial, useAnimations, useGLTF, Float } from '@react-three/drei';
import { Intersection, useFrame, useGraph, useThree } from '@react-three/fiber';
import { BallCollider, Physics, RigidBody, CylinderCollider } from '@react-three/rapier';
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

export default function Model({ position, children, vec = new Vector3(), scale, r = MathUtils.randFloatSpread }) {
	const materialRef = useRef(null);
	const depthMaterialRef = useRef(null);
	const isBallPress = useRef(false);
	const ballPhysicsApi = useRef();
	const ballRef = useRef();
	const ballPos = useMemo(() => position || [r(10), r(10), r(0)], []);
	const ballGeometry = useMemo(() => {
		const geometry = mergeVertices(new IcosahedronGeometry(1, 128));
		geometry.computeTangents();
		return geometry;
	}, []);

	const ballMaskRef = useRef(null);

	let {
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
		roughness: { min: 0, max: 1, step: 0.001, value: 1 },
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

	const uniforms = {
		uTime: { value: 0 },
		uColor: { value: new Color(color) },
		uGradientStrength: { value: gradientStrength },
		uSpeed: { value: speed },
		uNoiseStrength: { value: noiseStrength },
		uDisplacementStrength: { value: displacementStrength },
		uFractAmount: { value: fractAmount },
	};

	useEffect(() => {
		initializeGeometry(ballRef);
		initializeGeometry(ballMaskRef);
	}, [ballRef, ballMaskRef]);

	useFrame(({ clock }) => {
		const elapsedTime = clock.getElapsedTime();

		if (materialRef.current && depthMaterialRef.current) {
			updateMaterialTime(elapsedTime);
			updateNoiseStrength();
			updateIridescence();
			updateMetalness();
			updateClearcoat();
			applyImpulseToApi();
		}
	});

	function initializeGeometry(ref) {
		if (ref?.current?.geometry) {
			ref.current.geometry.computeBoundsTree = computeBoundsTree;
			ref.current.geometry.disposeBoundsTree = disposeBoundsTree;
			ref.current.geometry.boundsTree = new MeshBVH(ref.current.geometry);
		}
	}

	function updateMaterialTime(elapsedTime) {
		materialRef.current.uniforms.uTime.value = elapsedTime;
		depthMaterialRef.current.uniforms.uTime.value = elapsedTime;
	}

	function updateNoiseStrength() {
		const { uNoiseStrength } = materialRef.current.uniforms;
		if (isBallPress.current && uNoiseStrength.value < 4) {
			uNoiseStrength.value += 0.05;
		} else if (!isBallPress.current && uNoiseStrength.value > 2) {
			uNoiseStrength.value -= 0.025;
		}
	}

	function updateIridescence() {
		const targetIridescence = isBallPress.current ? 1 : 0;
		materialRef.current.iridescence = lerp(materialRef.current.iridescence, targetIridescence, 0.05);
	}

	function updateMetalness() {
		const targetMetalness = isBallPress.current ? 1 : 0;
		materialRef.current.metalness = lerp(materialRef.current.metalness, targetMetalness, 0.1);
	}

	function updateClearcoat() {
		const targetClearcoats = isBallPress.current ? 1 : 0;
		materialRef.current.clearcoat = lerp(materialRef.current.clearcoat, targetClearcoats, 0.1);
	}

	function applyImpulseToApi() {
		if (ballPhysicsApi.current) {
			const impulse = vec.copy(ballPhysicsApi.current.translation()).negate().multiplyScalar(0.5);
			ballPhysicsApi.current.applyImpulse(impulse);
			if (isBallPress.current) {
				const impulse = vec.copy(ballPhysicsApi.current.translation()).normalize().multiplyScalar(0.1);
				ballPhysicsApi.current.applyTorqueImpulse(impulse);
			}
		}
	}

	return (
		<>
			<Physics gravity={[0, 0, 0]}>
				<RigidBody
					ref={ballPhysicsApi}
					linearDamping={5}
					angularDamping={1}
					position={ballPos}
					colliders={false}>
					<BallCollider args={[1]} />
					<mesh
						name='main-character'
						geometry={ballGeometry}
						ref={ballRef}
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
							uniforms={uniforms}
							transparent
						/>
						<CustomShaderMaterial
							ref={depthMaterialRef}
							baseMaterial={MeshDepthMaterial}
							vertexShader={vertexShader}
							uniforms={uniforms}
							silent
							depthPacking={RGBADepthPacking}
							attach='customDepthMaterial'
						/>
					</mesh>
				</RigidBody>

				<mesh
					ref={ballMaskRef}
					position={[0, 0, 0]}
					onPointerDown={e => (isBallPress.current = true)}
					onPointerUp={e => (isBallPress.current = false)}
					onPointerOver={e => (document.body.style.cursor = 'pointer')}
					onPointerOut={e => {
						isBallPress.current = false;
						document.body.style.cursor = 'default';
					}}
					frustumCulled={true}>
					<circleGeometry args={[2, 32]} />
					<meshBasicMaterial
						transparent={true}
						opacity={1} // Adjust the opacity value (0.0 to 1.0) as needed
					/>
				</mesh>
			</Physics>
		</>
	);
}

// cSpell: ignore Raycaster, GLTF, metalness, clearcoat, matcap, drei

import { useEffect, useMemo, useRef, useState } from 'react';
import { MeshTransmissionMaterial, useAnimations, useGLTF } from '@react-three/drei';
import { Intersection, useFrame, useGraph, useThree } from '@react-three/fiber';
import { BallCollider, Physics, RigidBody, CylinderCollider } from '@react-three/rapier';

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
} from 'three';

import CustomShaderMaterial from 'three-custom-shader-material';
import vertexShader from '@/shaders/animated-displaced-sphere/vertex';
import fragmentShader from '@/shaders/animated-displaced-sphere/fragment';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import { useControls } from 'leva';

export default function Model({ position, children, vec = new Vector3(), scale, r = MathUtils.randFloatSpread }) {
	const materialRef = useRef(null);
	const depthMaterialRef = useRef(null);

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
		transmission,
		thickness,
		dispersion,
	} = useControls({
		gradientStrength: { value: 1, min: 1, max: 3, step: 0.001 },
		color: '#E0FB60',
		speed: { min: 0, max: 20, step: 0.001, value: 3.5 },
		noiseStrength: { value: 0.3, min: 0, max: 3, step: 0.001 },
		displacementStrength: { min: 0, max: 10, step: 1, value: 1 },
		fractAmount: { value: 4, min: 0, max: 10, step: 1 },
		roughness: { min: 0, max: 1, step: 0.001, value: 1 },
		metalness: { min: 0, max: 1, step: 0.001, value: 0 },
		clearcoat: { min: 0, max: 1, step: 0.001, value: 1 },
		reflectivity: { min: 0, max: 1, step: 0.001, value: 0.46 },
		ior: { min: 0.001, max: 5, step: 0.001, value: 1.2 },
		iridescence: { min: 0, max: 1, step: 0.001, value: 1 },
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

	const geometry = useMemo(() => {
		const geometry = mergeVertices(new IcosahedronGeometry(1, 128));
		geometry.computeTangents();
		return geometry;
	}, []);

	const api = useRef();
	const ballRef = useRef();
	const pos = useMemo(() => position || [r(10), r(10), r(10)], []);

	useFrame(({ clock }) => {
		const elapsedTime = clock.getElapsedTime();

		if (materialRef.current) {
			materialRef.current.uniforms.uTime.value = elapsedTime;
		}

		if (depthMaterialRef.current) {
			depthMaterialRef.current.uniforms.uTime.value = elapsedTime;
		}

		const delta = Math.min(0.1, elapsedTime);
		api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(0.5));
	});

	return (
		<RigidBody
			linearDamping={5}
			angularDamping={1}
			friction={1}
			position={pos}
			ref={api}
			colliders={false}>
			<BallCollider args={[1]} />
			{/* <mesh
				receiveShadow
				castShadow>
				<sphereGeometry args={[3, 32, 32]} />
				<MeshTransmissionMaterial
					backside
					thickness={3}
					chromaticAberration={0.025}
					anisotropy={0.1}
					distortion={0.1}
					distortionScale={0.1}
					temporalDistortion={0.2}
					iridescence={1}
					iridescenceIOR={1}
					iridescenceThicknessRange={[0, 1400]}
				/>
			</mesh> */}
			<mesh
				name='main-character'
				geometry={geometry}
				ref={ballRef}
				frustumCulled={false}>
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
	);
}

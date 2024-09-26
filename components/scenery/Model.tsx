// cSpell: ignore Raycaster, GLTF, metalness, clearcoat, matcap, drei

import { useEffect, useMemo, useRef, useState } from 'react';
import {
	MeshTransmissionMaterial,
	useAnimations,
	useGLTF,
	Float,
	Sparkles,
	Billboard,
	RoundedBox,
} from '@react-three/drei';
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
gsap.registerPlugin(useGSAP);

export default function Model({ r = MathUtils.randFloatSpread }) {
	const materialRef = useRef(null);
	const [isBallPress, setIsBallPress] = useState(false);
	const ballRef = useRef();
	const ballPos = useRef([r(10), r(10), 1]);
	const ballCenterPos = useRef(new Vector3(0, 0, 1));

	const ballGeometry = useMemo(() => {
		const geometry = mergeVertices(new IcosahedronGeometry(0.5, 128));
		geometry.computeTangents();
		return geometry;
	}, []);

	const ballMaskRef = useRef(null);

	console.log('re render from ball');

	// const {
	// 	gradientStrength,
	// 	color,
	// 	speed,
	// 	noiseStrength,
	// 	displacementStrength,
	// 	fractAmount,
	// 	roughness,
	// 	metalness,
	// 	clearcoat,
	// 	reflectivity,
	// 	ior,
	// 	iridescence,
	// 	iridescenceIOR,
	// 	transmission,
	// 	thickness,
	// 	dispersion,
	// } = useControls({
	// 	gradientStrength: { value: 1, min: 1, max: 3, step: 0.001 },
	// 	color: '#e6ff00',
	// 	speed: { min: 0, max: 20, step: 0.001, value: 4 },
	// 	noiseStrength: { value: 4, min: 0, max: 10, step: 0.001 },
	// 	displacementStrength: { min: 0, max: 10, step: 0.01, value: 1.2 },
	// 	fractAmount: { min: 0, max: 10, step: 0.1, value: 1.2 },
	// 	roughness: { min: 0, max: 1, step: 0.001, value: 0.1 },
	// 	metalness: { min: 0, max: 1, step: 0.001, value: 0.1 },
	// 	clearcoat: { min: 0, max: 1, step: 0.001, value: 1.0 },
	// 	reflectivity: { min: 0, max: 1, step: 0.001, value: 0.46 },
	// 	ior: { min: 0.001, max: 5, step: 0.001, value: 0.0 },
	// 	iridescence: { min: 0, max: 1, step: 0.001, value: 0 },
	// 	iridescenceIOR: { min: 1, max: 2.333, step: 0.001, value: 1.3 },
	// 	transmission: { min: 0, max: 1, step: 0.001, value: 0 },
	// 	thickness: { min: 0, max: 10, step: 0.1, value: 5 },
	// 	dispersion: { min: 0, max: 20, step: 1, value: 5 },
	// });

	// const uniformsRef = useRef({
	// 	uTime: { value: 0 },
	// 	uColor: { value: new Color(color) },
	// 	uGradientStrength: { value: gradientStrength },
	// 	uSpeed: { value: speed },
	// 	uNoiseStrength: { value: noiseStrength },
	// 	uDisplacementStrength: { value: displacementStrength },
	// 	uFractAmount: { value: fractAmount },
	// });
	const uniformsRef = useRef({
		uTime: { value: 0 },
		uColor: { value: new Color('#e6ff00') },
		uGradientStrength: { value: 1 },
		uSpeed: { value: 4 },
		uNoiseStrength: { value: 4 },
		uDisplacementStrength: { value: 1.2 },
		uFractAmount: { value: 1.2 },
	});
	// const uniformsRef = {
	// 	uTime: { value: 0 },
	// 	uColor: { value: new Color(color) },
	// 	uGradientStrength: { value: gradientStrength },
	// 	uSpeed: { value: speed },
	// 	uNoiseStrength: { value: noiseStrength },
	// 	uDisplacementStrength: { value: displacementStrength },
	// 	uFractAmount: { value: fractAmount },
	// };

	useFrame(({ clock }) => {
		const elapsedTime = clock.getElapsedTime();

		if (materialRef.current) {
			updatePosition(elapsedTime);
			updateMaterialTime(elapsedTime);
		}
	});

	useGSAP(
		() => {
			if (ballRef.current && materialRef.current) {
				if (isBallPress) {
					gsap.to(materialRef.current.uniforms.uNoiseStrength, {
						value: 8.5,
						duration: 2,
						ease: 'elastic.out(1, 0.1)',
					});
					gsap.to(materialRef.current.uniforms.uDisplacementStrength, {
						value: 1.35,
						duration: 2,
						ease: 'elastic.out(1, 0.1)',
					});
					gsap.to(materialRef.current, {
						iridescence: 1,
						metalness: 0.6,
						roughness: 1,
						clearcoat: 0,
						duration: 2,
						ease: 'elastic.out(1, 0.1)',
					});
				} else {
					gsap.to(materialRef.current.uniforms.uNoiseStrength, {
						value: 4,
						duration: 2,
						ease: 'elastic.out(1, 0.1)',
					});
					gsap.to(materialRef.current.uniforms.uDisplacementStrength, {
						value: 1.2,
						duration: 2,
						ease: 'elastic.out(1, 0.1)',
					});
					gsap.to(materialRef.current, {
						iridescence: 0.1,
						metalness: 0.5,
						roughness: 0.1,
						clearcoat: 1.0,
						duration: 2,
						ease: 'elastic.out(1, 0.1)',
					});
				}
			}
		},
		{ dependencies: [isBallPress], scope: ballRef },
	);

	function updatePosition(elapsedTime) {
		if (ballRef.current) {
			const speed = isBallPress ? 4 : 1.2;
			ballRef.current.position.lerp(ballCenterPos.current, 0.02);
			ballRef.current.rotation.x = Math.cos(elapsedTime) * speed;
			ballRef.current.rotation.y = Math.sin(elapsedTime) * speed;
			ballRef.current.rotation.z = Math.sin(elapsedTime) * speed;
		}
	}

	function updateMaterialTime(elapsedTime: number) {
		materialRef.current.uniforms.uTime.value = elapsedTime;
	}

	return (
		<>
			<mesh
				geometry={ballGeometry}
				ref={ballRef}
				position={ballPos.current}>
				<CustomShaderMaterial
					ref={materialRef}
					baseMaterial={MeshPhysicalMaterial}
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					roughness={0.1}
					metalness={0.1}
					reflectivity={0.46}
					clearcoat={1.0}
					ior={0}
					iridescence={0}
					iridescenceIOR={1.3}
					uniforms={uniformsRef.current}
				/>
				{/* <meshBasicMaterial color={0x000000}></meshBasicMaterial> */}
			</mesh>

			<mesh
				ref={ballMaskRef}
				position={[0, 0, -1]}
				onPointerDown={e => setIsBallPress(true)}
				onPointerUp={e => setIsBallPress(false)}
				onPointerOver={e => (document.body.style.cursor = 'pointer')}
				onPointerOut={e => {
					setIsBallPress(false);
					document.body.style.cursor = 'default';
				}}>
				<circleGeometry args={[4, 1]} />
				<meshBasicMaterial
					transparent={true}
					opacity={0}
				/>
			</mesh>
		</>
	);
}

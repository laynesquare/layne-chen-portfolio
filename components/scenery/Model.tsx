// cSpell: ignore Raycaster, GLTF, metalness, clearcoat, matcap, drei

import { useAnimations, useGLTF } from '@react-three/drei';
import { Intersection, useFrame, useGraph, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
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
} from 'three';

import { SkeletonUtils } from 'three-stdlib';

import CustomShaderMaterial from 'three-custom-shader-material';

import { useControls } from 'leva';

import vertexShader from '@/shaders/animated-displaced-sphere/vertex';

import fragmentShader from '@/shaders/animated-displaced-sphere/fragment';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export default function Model() {
	// Load GLTF models
	const { animations, scene } = useGLTF('/scenery/main-character-transformed.glb');
	const { scene: flowerScene } = useGLTF('/scenery/flower.glb');

	// Load texture: matcap
	const textureLoader = new TextureLoader();
	const matcapTexture = textureLoader.load('scenery/textures/metal_anisotropic.jpg');

	// Create Raycaster
	const raycaster = new Raycaster();

	// Refs for managing state
	const group = useRef<Group>(null);

	const scalingFlowersRef = useRef<{ mesh: Group; scale: number; shrinking: boolean }[]>([]);
	const prevIntersectPointRef = useRef<Vector3 | null>(null);
	const frameCountRef = useRef(0);

	// Use animations
	const { actions } = useAnimations(animations, group);

	// Use Three.js hooks
	const { mouse, camera, scene: mainScene } = useThree();

	// Set tolerance value
	const tolerance = 0.2;

	// Clone the scene for manipulation
	const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
	const { nodes, materials } = useGraph(clone);

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
		gradientStrength: {
			value: 1,
			min: 1,
			max: 3,
			step: 0.001,
		},
		color: '#fff',
		speed: {
			min: 0,
			max: 20,
			step: 0.001,
			value: 3.5,
		},
		noiseStrength: {
			value: 0.3,
			min: 0,
			max: 3,
			step: 0.001,
		},
		displacementStrength: {
			min: 0,
			max: 10,
			step: 1,
			value: 2,
		},
		fractAmount: {
			value: 4,
			min: 0,
			max: 10,
			step: 1,
		},
		roughness: {
			min: 0,
			max: 1,
			step: 0.001,
			value: 0,
		},
		metalness: {
			min: 0,
			max: 1,
			step: 0.001,
			value: 0,
		},
		clearcoat: {
			min: 0,
			max: 1,
			step: 0.001,
			value: 1,
		},
		reflectivity: {
			min: 0,
			max: 1,
			step: 0.001,
			value: 0.46,
		},
		ior: {
			min: 0.001,
			max: 5,
			step: 0.001,
			value: 1.2,
		},
		iridescence: {
			min: 0,
			max: 1,
			step: 0.001,
			value: 1,
		},
		transmission: {
			min: 0,
			max: 1,
			step: 0.001,
			value: 1, // Initial value for glassy effect
		},
		thickness: {
			min: 0,
			max: 10,
			step: 0.1,
			value: 10, // Initial value for thickness
		},
		dispersion: {
			min: 0,
			max: 20,
			step: 1,
			value: 20,
		},
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
		const geometry = mergeVertices(new IcosahedronGeometry(1.3, true ? 128 : 200));
		geometry.computeTangents();
		return geometry;
	}, []);

	useEffect(() => {
		const action = actions['Take 001'];

		// if (action) {
		// 	action.play();
		// 	action.paused = false;
		// 	action.setLoop(LoopRepeat, Infinity);
		// }

		if (materials) {
			// const matcapMaterial = new MeshMatcapMaterial({ matcap: matcapTexture });
			// materials['Material_289'] = matcapMaterial;
		}
	}, [actions, materials]);

	// useEffect(() => {
	// 	flowerScene.traverse(child => {
	// 		// @ts-ignore
	// 		if (child.isMesh) {
	// 			child.castShadow = true;
	// 			child.receiveShadow = true;
	// 		}
	// 	});
	// }, [flowerScene]);

	// useFrame(({ clock }, delta) => {
	// 	if (group.current) {
	// 		const targetX = mouse.x * 1;
	// 		const targetY = mouse.y * 0.2;

	// 		group.current.rotation.y += 0.1 * (targetX - group.current.rotation.y);
	// 		group.current.rotation.x += 0.1 * (targetY - group.current.rotation.x);

	// 		frameCountRef.current += 1;

	// 		if (frameCountRef.current % 6 === 0) {
	// 			frameCountRef.current = 1;
	// 			raycaster.setFromCamera(mouse, camera);
	// 			const intersects = raycaster.intersectObject(group.current, true);

	// 			if (intersects.length > 0) {
	// 				const intersect = intersects[0];
	// 				const currentIntersectPoint = intersect.point;
	// 				const intersectNormal = intersect.face?.normal
	// 					.clone()
	// 					.applyMatrix4(intersect.object.matrixWorld)
	// 					.normalize();

	// 				if (
	// 					!prevIntersectPointRef.current ||
	// 					prevIntersectPointRef.current.distanceTo(currentIntersectPoint) > tolerance
	// 				) {
	// 					const newFlowers = [];

	// 					for (let i = 0; i < 5; i++) {
	// 						const newFlower = flowerScene.clone();
	// 						newFlower.traverse(child => {
	// 							if (child.isMesh && child.name === 'Blossom') {
	// 								const color = new Color(getRandomFlowerColor());
	// 								const newMaterial = child.material.clone();
	// 								newMaterial.color.set(color);
	// 								child.material = newMaterial;
	// 							}
	// 						});

	// 						const flowerPosition = currentIntersectPoint.clone().add(getOffset());

	// 						// Transform the flower position to the local space of the group
	// 						group.current.worldToLocal(flowerPosition);
	// 						newFlower.position.copy(flowerPosition);

	// 						if (intersectNormal) {
	// 							const up = new Vector3((i % 5) * (i % 2 ? 1.3 : -1.3), 10, 0);
	// 							const quaternion = new Quaternion().setFromUnitVectors(up, intersectNormal);
	// 							newFlower.quaternion.multiply(quaternion);
	// 						}

	// 						group.current.add(newFlower); // Add flower to the main group
	// 						newFlowers.push(newFlower);
	// 					}

	// 					scalingFlowersRef.current = [
	// 						...scalingFlowersRef.current.map(({ mesh, scale, shrinking }) => ({
	// 							mesh,
	// 							scale,
	// 							shrinking: true,
	// 						})),
	// 						...newFlowers.map(flower => ({ mesh: flower, scale: 0, shrinking: false })),
	// 					];

	// 					prevIntersectPointRef.current = currentIntersectPoint.clone();
	// 				}
	// 			} else {
	// 				scalingFlowersRef.current = scalingFlowersRef.current.map(({ mesh, scale }) => ({
	// 					mesh,
	// 					scale,
	// 					shrinking: true,
	// 				}));
	// 			}
	// 		}
	// 	}

	// 	// find flowers shrinking and still scaling down, and those growing and scaling up
	// 	scalingFlowersRef.current = scalingFlowersRef.current.reduce((acc, { mesh, scale, shrinking }) => {
	// 		const newScale = shrinking ? Math.max(scale - delta * 0.6, 0) : Math.min(scale + delta * 10, 2);
	// 		mesh.scale.set(newScale, newScale, newScale);
	// 		mesh.position.x += delta * Math.random() * 0.8; // Adjust the speed as needed
	// 		mesh.position.y += delta * Math.random() * 0.8; // Adjust the speed as needed
	// 		mesh.position.z += delta * Math.random() * 0.7; // Adjust the speed as needed

	// 		if (!(shrinking && newScale <= 0)) {
	// 			acc.push({ mesh, scale: newScale, shrinking });
	// 		} else {
	// 			mainScene.remove(mesh);
	// 		}

	// 		return acc;
	// 	}, []);
	// });

	useFrame(({ clock }) => {
		const elapsedTime = clock.getElapsedTime();

		if (materialRef.current) {
			materialRef.current.uniforms.uTime.value = elapsedTime;
		}

		// if (depthMaterialRef.current) {
		//     depthMaterialRef.current.uniforms.uTime.value = elapsedTime;
		// }
	});

	return (
		<group
			ref={group}
			dispose={null}
			// scale={[0.42, 0.42, 0.42]}
			// position={[0, 0.5, 0]}
		>
			<primitive object={nodes._rootJoint} />
			{/* <skinnedMesh
				castShadow={true}
				receiveShadow={true}
				name='Object_7'
				geometry={nodes.Object_7.geometry}
				skeleton={nodes.Object_7.skeleton}>
				<CustomShaderMaterial
					ref={materialRef}
					baseMaterial={MeshPhysicalMaterial}
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					silent
					roughness={roughness}
					metalness={metalness}
					reflectivity={reflectivity}
					clearcoat={clearcoat}
					ior={ior}
					iridescence={iridescence}
					uniforms={uniforms}
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
			</skinnedMesh> */}
			<mesh
				geometry={geometry}
				frustumCulled={false}>
				<CustomShaderMaterial
					ref={materialRef}
					baseMaterial={MeshPhysicalMaterial}
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					silent
					roughness={roughness}
					metalness={metalness}
					reflectivity={reflectivity}
					clearcoat={clearcoat}
					ior={ior}
					iridescence={iridescence}
					transmission={transmission} // Enable transmission
					thickness={thickness} // Set thickness
					dispersion={dispersion} // Enable chromatic aberration
					uniforms={uniforms}
				/>
				{/* <CustomShaderMaterial
					ref={depthMaterialRef}
					baseMaterial={MeshDepthMaterial}
					vertexShader={vertexShader}
					uniforms={uniforms}
					silent
					depthPacking={RGBADepthPacking}
					attach='customDepthMaterial'
				/> */}
			</mesh>
		</group>
	);
}

/* -------------------------------------------------------------------------- */
/*                          pending for organization                          */
/* -------------------------------------------------------------------------- */

useGLTF.preload('/scenery/main-character-transformed.glb');
useGLTF.preload('/scenery/flower.glb');

const getOffset = () => {
	return new Vector3((Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.3);
};

// Function to generate random flower colors
function getRandomFlowerColor() {
	const flowerColors = [
		'#FF69B4', // Pink
		'#FF4500', // Orange
		'#FFD700', // Yellow
		'#ADFF2F', // Greenish-yellow
		'#FF1493', // Deep Pink
		'#9400D3', // Dark Violet
		'#8A2BE2', // Blue Violet
		'#00BFFF', // Deep Sky Blue
		'#FF6347', // Tomato
		'#FFFFFF', // White
		'#FFDAB9', // Peach Puff
		'#8B4513', // Saddle Brown
	];
	const randomIndex = Math.floor(Math.random() * flowerColors.length);
	return flowerColors[randomIndex];
}

import { useAnimations, useGLTF } from '@react-three/drei';
import { Intersection, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import {
	Group,
	MeshNormalMaterial,
	Raycaster,
	Vector2,
	Vector3,
	Quaternion,
	MeshStandardMaterial,
	Color,
	SphereGeometry,
	MeshBasicMaterial,
	Mesh,
} from 'three';

useGLTF.preload('/scenary/main-character.glb');
useGLTF.preload('/scenary/flower.glb');

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

export default function Model() {
	const group = useRef<Group>(null);
	const scalingFlowersRef = useRef<{ mesh: Group; scale: number; shrinking: boolean }[]>([]);
	const prevIntersectPointRef = useRef<Vector3 | null>(null);
	const frameCountRef = useRef(0);

	const tolerance = 0.2;

	const raycaster = new Raycaster();

	const { nodes, materials, animations, scene } = useGLTF('/scenary/main-character.glb');
	const { scene: flowerScene } = useGLTF('/scenary/flower.glb');
	const { actions } = useAnimations(animations, scene);

	const { mouse, camera, scene: mainScene } = useThree();

	useEffect(() => {
		const action = actions['Take 001'];

		if (action) {
			action.play().paused = false;
		}

		scene.traverse(child => {
			if (child.isMesh) {
				child.material = new MeshNormalMaterial({
					wireframe: true,
					wireframeLinewidth: 100,
				});
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});
	}, [actions, scene]);

	useEffect(() => {
		flowerScene.traverse(child => {
			if (child.isMesh) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});
	}, [flowerScene]);

	useFrame((_, delta) => {
		if (group.current) {
			const targetX = mouse.x * 1;
			const targetY = mouse.y * 0.2;

			group.current.rotation.y += 0.1 * (targetX - group.current.rotation.y);
			group.current.rotation.x += 0.1 * (targetY - group.current.rotation.x);

			frameCountRef.current += 1;

			if (frameCountRef.current % 6 === 0) {
				frameCountRef.current = 1;
				raycaster.setFromCamera(mouse, camera);
				const intersects = raycaster.intersectObject(group.current, true);

				if (intersects.length > 0) {
					const intersect = intersects[0];
					const currentIntersectPoint = intersect.point;
					const intersectNormal = intersect.face?.normal
						.clone()
						.applyMatrix4(intersect.object.matrixWorld)
						.normalize();

					if (
						!prevIntersectPointRef.current ||
						prevIntersectPointRef.current.distanceTo(currentIntersectPoint) > tolerance
					) {
						const newFlowers = [];

						for (let i = 0; i < 5; i++) {
							const newFlower = flowerScene.clone();
							newFlower.traverse(child => {
								if (child.isMesh && child.name === 'Blossom') {
									const color = new Color(getRandomFlowerColor());
									const newMaterial = child.material.clone();
									newMaterial.color.set(color);
									child.material = newMaterial;
								}
							});

							const flowerPosition = currentIntersectPoint.clone().add(getOffset());

							// Transform the flower position to the local space of the group
							group.current.worldToLocal(flowerPosition);
							newFlower.position.copy(flowerPosition);

							if (intersectNormal) {
								const up = new Vector3((i % 5) * (i % 2 ? 1.3 : -1.3), 10, 0);
								const quaternion = new Quaternion().setFromUnitVectors(up, intersectNormal);
								newFlower.quaternion.multiply(quaternion);
							}

							group.current.add(newFlower); // Add flower to the main group
							newFlowers.push(newFlower);
						}

						scalingFlowersRef.current = [
							...scalingFlowersRef.current.map(({ mesh, scale, shrinking }) => ({
								mesh,
								scale,
								shrinking: true,
							})),
							...newFlowers.map(flower => ({ mesh: flower, scale: 0, shrinking: false })),
						];

						prevIntersectPointRef.current = currentIntersectPoint.clone();
					}
				} else {
					scalingFlowersRef.current = scalingFlowersRef.current.map(({ mesh, scale }) => ({
						mesh,
						scale,
						shrinking: true,
					}));
				}
			}
		}

		// find flowers shrinking and still scaling down, and those growing and scaling up
		scalingFlowersRef.current = scalingFlowersRef.current.reduce((acc, { mesh, scale, shrinking }) => {
			const newScale = shrinking ? Math.max(scale - delta * 0.6, 0) : Math.min(scale + delta * 10, 2);
			mesh.scale.set(newScale, newScale, newScale);
			mesh.position.x += delta * Math.random() * 0.8; // Adjust the speed as needed
			mesh.position.y += delta * Math.random() * 0.8; // Adjust the speed as needed
			mesh.position.z += delta * Math.random() * 0.7; // Adjust the speed as needed

			if (!(shrinking && newScale <= 0)) {
				acc.push({ mesh, scale: newScale, shrinking });
			} else {
				mainScene.remove(mesh);
			}

			return acc;
		}, []);
	});

	return (
		<group
			ref={group}
			scale={[0.42, 0.42, 0.42]}
			position={[0, 0.5, 0]}>
			<primitive object={scene} />
		</group>
	);
}

import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Color, Group, MeshStandardMaterial, Raycaster, Vector2 } from 'three';

useGLTF.preload('/scenary/cage.glb');

export default function Cage() {
	const group = useRef<Group>(null);
	const { nodes, materials, animations, scene } = useGLTF('/scenary/cage.glb');
	const { actions } = useAnimations(animations, scene);
	const timeRef = useRef(0);
	const hoveredRef = useRef(false);
	const { mouse, camera } = useThree();
	const mouseVector = new Vector2();
	const raycaster = new Raycaster();

	useEffect(() => {
		console.log(materials);

		scene.traverse(child => {
			if (child.isMesh) {
				// Example: Apply material properties
				// applyProps(child.material, { envMapIntensity: 2, roughness: 0.45, metalness: 0.8, color: '#fff' });
			}
		});
	}, [actions, scene, materials]);

	useFrame((state, delta) => {
		if (group.current) {
			timeRef.current += delta;
			group.current.position.y = 4 + Math.sin(timeRef.current * 2) * 0.9;

			scene.traverse(child => {
				if (child.isMesh && child.material instanceof MeshStandardMaterial) {
					// Example: Create a color transition effect
					// const color = new Color();
					// color.setHSL(timeRef.current % 1, 1, 0.5); // Cycle through colors
					// child.material.color = color;
				}
			});

			if (hoveredRef.current) {
				// group.current.rotation.y += delta * 1.5; // Faster rotation
			} else {
				// group.current.rotation.y += delta * 0.1; // Original rotation speed
			}

			// const raycaster = new Raycaster();
			// raycaster.setFromCamera(mouse, camera);
			// const intersects = raycaster.intersectObject(group.current);

			// if (intersects.length > 0) {
			// 	console.log(intersects);
			// }
		}
	});

	return (
		<group
			ref={group}
			scale={[5, 5, 5]}
			position={[0, 4, 0]}
			onPointerOver={() => (hoveredRef.current = true)}
			onPointerOut={() => (hoveredRef.current = false)}>
			<primitive
				object={scene}
				dampen={0.5}
			/>
		</group>
	);
}

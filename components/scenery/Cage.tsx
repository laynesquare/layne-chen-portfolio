import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Color, Group, MeshStandardMaterial, Raycaster, Vector2 } from 'three';

useGLTF.preload('/scenery/cage-transformed.glb');

export default function Cage() {
	const group = useRef<Group>(null);
	const { nodes, materials, animations, scene } = useGLTF('/scenery/cage-transformed.glb');
	const { actions } = useAnimations(animations, scene);
	const timeRef = useRef(0);
	const hoveredRef = useRef(false);
	const { mouse, camera } = useThree();
	const mouseVector = new Vector2();
	const raycaster = new Raycaster();

	useEffect(() => {
		console.log(materials);
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
			dispose={null}
			ref={group}>
			<mesh
				geometry={nodes['Hedra001_Material_#0_0'].geometry}
				material={materials.Material_0}
				scale={0.08}
				position={[-0.016, 0, 0.088]}
				rotation={[-Math.PI / 2, 0, 0]}
			/>
		</group>
	);
}

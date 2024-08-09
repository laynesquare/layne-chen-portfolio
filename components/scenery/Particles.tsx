import { useAnimations, useGLTF, OrbitControls, Environment, Effects } from '@react-three/drei';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Group, MeshStandardMaterial, Color, AnimationAction } from 'three';
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing';
import { BlurPass, Resizer, KernelSize, Resolution } from 'postprocessing';
import { BlendFunction } from 'postprocessing';

useGLTF.preload('/scenary/particles.glb');

export default function Particles() {
	const group = useRef<Group>(null);
	const { nodes, materials, animations, scene } = useGLTF('/scenary/particles.glb');
	const { actions } = useAnimations(animations, scene);

	useEffect(() => {
		const action = actions['Global Rotation'];
		// @ts-ignore
		action.play().paused = false;

		// Modify materials to add emission
		scene.traverse(child => {
			// @ts-ignore
			if (child.isMesh) {
			}
		});
	}, [actions, scene]);

	useFrame(() => {
		const action = actions['Global Rotation'];
		if (group.current) {
			group.current.rotation.y += 0.005; // Rotate the model
		}
	});

	return (
		<>
			<group
				ref={group}
				scale={[13, 13, 13]}
				position={[0, 25, 0]}>
				<primitive object={scene} />
			</group>
		</>
	);
}

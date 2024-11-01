import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

import { LoopRepeat } from 'three';

export default function Particles() {
	const group = React.useRef();
	const { nodes, materials, animations } = useGLTF('/scenery/particles-transformed.glb');
	const { actions } = useAnimations(animations, group);

	useEffect(() => {
		console.log(actions);
		const action = actions['Global Rotation'];
		if (action) {
			action.setLoop(LoopRepeat, Infinity);
			action.play();
		}
	}, [actions]);

	return (
		<group
			ref={group}
			dispose={null}>
			<group name='Sketchfab_Scene'>
				<group
					name='RootNode'
					rotation={[Math.PI / 2, 0, 0]}
					position={[0, 30, 0]}
					scale={0.02}>
					<group
						name='StarCluster3'
						scale={100}>
						<group
							name='Object_5'
							position={[-0.703, 0, 0]}>
							<mesh
								name='StarCluster3_03_-__0'
								geometry={nodes['StarCluster3_03_-__0'].geometry}
								material={materials['03_-']}
							/>
						</group>
					</group>
					<group
						name='StarCluster2'
						scale={49.606}>
						<group
							name='Object_8'
							position={[-1.549, 0, 0]}>
							<mesh
								name='StarCluster2_02_-__0'
								geometry={nodes['StarCluster2_02_-__0'].geometry}
								material={materials['02_-']}
							/>
						</group>
					</group>
					<group
						name='StarCluster1'
						scale={24.803}>
						<group
							name='Object_11'
							position={[-1.993, 0, 0]}>
							<mesh
								name='StarCluster1_01_-__0'
								geometry={nodes['StarCluster1_01_-__0'].geometry}
								material={materials['01_-']}
							/>
						</group>
					</group>
				</group>
			</group>
		</group>
	);
}

// useGLTF.preload('/scenery/particles-transformed.glb');

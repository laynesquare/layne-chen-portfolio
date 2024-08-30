import { useFrame, useLoader, useThree } from '@react-three/fiber';

import React, { useRef } from 'react';
import { Color, MeshBasicMaterial, MeshPhysicalMaterial, TextureLoader } from 'three';

import { ReactLenis, useLenis } from '@studio-freight/react-lenis';

const Banner = () => {
	const viewport = useThree(state => state.viewport);
	const background = useLoader(TextureLoader, '/scenery/textures/background-gradient.png');
	const scrollLenis = useLenis(event => {
		const offset = Math.abs(event.scroll - offsetRef.current) / viewport.factor;
		if (event.direction) {
			updatePosition(event.direction * offset);
		}
		offsetRef.current = event.scroll;
	});

	const meshRef = useRef([]);
	const offsetRef = useRef(0);

	function updatePosition(offset) {
		meshRef.current.forEach(mesh => {
			mesh.position.y += offset;
		});
	}

	return (
		<>
			<group>
				<mesh
					ref={el => [(meshRef.current[0] = el)]}
					scale={[viewport.width, viewport.height, 0]}
					material={new MeshBasicMaterial({ map: background })}>
					<planeGeometry args={[1, 1, 100, 100]} />
				</mesh>
				<mesh
					ref={el => (meshRef.current[1] = el)}
					position={[0, -viewport.height, 0]}
					scale={[viewport.width, viewport.height, 0]}
					material={new MeshBasicMaterial({ map: background })}>
					<planeGeometry args={[1, 1, 100, 100]} />
				</mesh>
			</group>
		</>
	);
};

export default Banner;

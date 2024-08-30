import { useLoader, useThree } from '@react-three/fiber';
import React from 'react';
import { Color, MeshBasicMaterial, MeshPhysicalMaterial, TextureLoader } from 'three';

const Banner = () => {
	const viewport = useThree(state => state.viewport);
	const background = useLoader(TextureLoader, '/scenery/textures/background-gradient.png');

	return (
		<mesh
			scale={[viewport.width, viewport.height, 0]}
			material={new MeshBasicMaterial({ map: background })}>
			<planeGeometry args={[1, 1, 100, 100]} />
		</mesh>
	);
};

export default Banner;

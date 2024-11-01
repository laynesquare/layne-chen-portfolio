import { useFrame, useThree } from '@react-three/fiber';
import { easing } from 'maath';
import { useEffect } from 'react';

export default function Camera({}) {
	const { camera } = useThree();

	useEffect(() => {
		camera.layers.enableAll();
	}, []);
	useFrame((state, delta) => {
		easing.damp3(
			state.camera.position,
			[
				Math.sin(-state.pointer.x / 3) * 2.5,
				(state.pointer.y / 3) * 1.75,
				2 + Math.cos(state.pointer.x / 3) * 0.5,
			],
			0.1,
			delta,
		);
		state.camera.lookAt(0, 0, 0);
	});

	return null;
}

import { useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect } from 'react';

export default function AdjustCamera() {
	const { camera } = useThree();
	const scroll = useScroll();

	useFrame(() => {
		const scrollOffset = scroll.offset;
	});

	useEffect(() => {
		camera.position.set(-0.9225665193808417, 3.534796092969559, 3.3980916163639696);
		camera.rotation.set(0.36711881061574475, -0.09825279434400959, 0.03770469119335154, 'XYZ');
	}, [camera]);

	return null;
}

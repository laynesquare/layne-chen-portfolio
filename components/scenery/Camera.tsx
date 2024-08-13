import { useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useState } from 'react';
import { Vector3 } from 'three';

// Debounce function to limit the rate at which the handler is called
const debounce = (func, wait) => {
	let timeout;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
};

export default function Camera({ handleScroll }) {
	const [vec] = useState(() => new Vector3());
	const { camera, mouse } = useThree();
	const scroll = useScroll();

	useFrame(() => {
		const scrollOffset = scroll.offset;
		handleScroll(scrollOffset);
		// camera.position.lerp(vec.set(mouse.x, mouse.y + 3.534796092969559, 3.3980916163639696), 0.05);
	});

	useEffect(() => {
		camera.position.set(-0.9225665193808417, 3.534796092969559, 3.3980916163639696);
		camera.rotation.set(0.36711881061574475, -0.09825279434400959, 0.03770469119335154, 'XYZ');
	}, [camera]);

	return null;
}

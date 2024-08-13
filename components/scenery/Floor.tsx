import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { Water } from 'three-stdlib';
import * as THREE from 'three';
import { Color, Vector3, CircleGeometry, TextureLoader } from 'three';

export default function Floor() {
	const ref = useRef();
	const { camera, mouse, scene } = useThree();
	const waterNormals = useLoader(TextureLoader, '/scenery/textures/waternormals.jpg');

	const water = useMemo(() => {
		waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
		const waterGeometry = new CircleGeometry(100, 100);
		return new Water(waterGeometry, {
			textureWidth: 1920,
			textureHeight: 1920,
			waterNormals: waterNormals,
			sunDirection: new Vector3(),
			sunColor: 0xffffff,
			waterColor: new Color('rgb(18, 10, 143)').lerp(new Color('rgb(128, 0, 128)'), 0.5),
			distortionScale: 2,
		});
	}, [waterNormals]);

	useFrame((state, delta) => {
		if (ref.current) {
			ref.current.material.uniforms.time.value += delta;
		}
	});

	return (
		<primitive
			object={water}
			ref={ref}
			rotation={[-Math.PI / 2, 0, 0]}
			position={[0, 0, 0]}
		/>
	);
}

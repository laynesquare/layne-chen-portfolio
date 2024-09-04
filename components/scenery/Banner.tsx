import { extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import React, { useRef, useEffect, useMemo } from 'react';
import {
	Color,
	MeshBasicMaterial,
	ShaderMaterial,
	TextureLoader,
	Vector2,
	CustomBlending,
	OneMinusSrcAlphaFactor,
	AddEquation,
	SrcAlphaFactor,
	MeshPhysicalMaterial,
	OneFactor,
	DstColorFactor,
	OneMinusDstColorFactor,
	OneMinusSrcColorFactor,
	AdditiveBlending,
} from 'three';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { Text } from '@react-three/drei';
import CustomShaderMaterial from 'three-custom-shader-material';

const Banner = () => {
	const viewport = useThree(state => state.viewport);
	const background = useLoader(TextureLoader, '/scenery/textures/Frame 10.png');

	const aspectRatio = background.image.width / background.image.height;

	const offsetRef = useRef(0);
	const groupRef = useRef(null);

	function updatePosition(offset) {
		groupRef.current.position.y += offset;
	}

	const blendedMaterial = useMemo(() => {
		return new MeshPhysicalMaterial({
			color: new Color('#93FB60'),
			blending: AdditiveBlending,
		});
	}, []);

	useLenis(event => {
		const offset = Math.abs(event.scroll - offsetRef.current) / viewport.factor;
		if (event.direction) updatePosition(event.direction * offset);
		offsetRef.current = event.scroll;

		console.log(viewport);
	});

	const shared = { font: '/font/ClashDisplay-Semibold.woff' };

	return (
		<>
			<group ref={groupRef}>
				<Text
					children='Front-end'
					position={[-viewport.width / 5, viewport.height / 10, 2]}
					{...shared}
					anchorX={'left'}
					material={blendedMaterial}
					fontSize={0.75}
				/>
				<Text
					children='Developer'
					position={[viewport.width / 5, -viewport.height / 30, 2]}
					anchorX={'right'}
					{...shared}
					material={blendedMaterial}
					fontSize={0.75}
				/>
				<Text
					position={[-viewport.width / 9.25, -viewport.height / 7, 2]}
					anchorX={'left'}
					material={blendedMaterial}
					fontSize={0.05}
					font='/font/ClashDisplay-Regular.woff'>
					{`Craft with a blend\nof technical expertise and\ndesign sensibility`}
				</Text>
				<Text
					position={[viewport.width / 9.5, -viewport.height / 8, 2]}
					anchorX={'right'}
					material={blendedMaterial}
					fontSize={0.05}
					font='/font/ClashDisplay-Regular.woff'>
					{`Based in Taipei, Taiwan`}
				</Text>
				<mesh
					scale={[viewport.width, viewport.height, 1]}
					position={[0, 0, 0]}
					material={new MeshBasicMaterial({ map: background, transparent: true })}>
					<planeGeometry args={[1, 1, 100, 100]} />
				</mesh>
				<mesh
					scale={[viewport.width, viewport.height, 1]}
					position={[0, -viewport.height, 0]}
					material={new MeshBasicMaterial({ map: background, transparent: true })}>
					<planeGeometry args={[1, 1, 100, 100]} />
				</mesh>
			</group>
		</>
	);
};

export default Banner;

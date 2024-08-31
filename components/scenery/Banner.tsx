import { useFrame, useLoader, useThree } from '@react-three/fiber';
import React, { useRef, useEffect } from 'react';
import { MeshBasicMaterial, TextureLoader } from 'three';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';

const Banner = () => {
	const viewport = useThree(state => state.viewport);
	const background = useLoader(TextureLoader, '/scenery/textures/waternormals.jpg');
	// Ensure the texture is using sRGB encoding

	const aspectRatio = background.image.width / background.image.height;

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

	useEffect(() => {
		const scale = mesh => {
			const meshAspectRatio = viewport.width / viewport.height;
			if (meshAspectRatio > aspectRatio) {
				mesh.scale.set(viewport.width, viewport.width / aspectRatio, 1);
			} else {
				mesh.scale.set(viewport.height * aspectRatio, viewport.height, 1);
			}
		};

		meshRef.current.forEach(mesh => {
			if (mesh) {
				scale(mesh);
			}
		});
	}, [aspectRatio, viewport.width, viewport.height]);

	return (
		<group>
			<mesh
				ref={el => (meshRef.current[0] = el)}
				position={[0, 0, 0]}
				material={new MeshBasicMaterial({ map: background, transparent: true })}>
				<planeGeometry args={[1, 1, 100, 100]} />
			</mesh>
			<mesh
				ref={el => (meshRef.current[1] = el)}
				position={[0, -viewport.height, 0]}
				material={new MeshBasicMaterial({ map: background, transparent: true })}>
				<planeGeometry args={[1, 1, 100, 100]} />
			</mesh>
		</group>
	);
};

export default Banner;

import React, { useRef, useState } from 'react';
import { MeshTransmissionMaterial, useFBO } from '@react-three/drei';
import { createPortal, useFrame, useThree } from '@react-three/fiber';
import { Scene } from 'three';
import { easing } from 'maath';

export default function Ripple({ children, damping = 0.15, ...props }) {
	const ref = useRef();
	const buffer = useFBO();
	const viewport = useThree(state => state.viewport);
	const [scene] = useState(() => new Scene());
	useFrame((state, delta) => {
		state.gl.setRenderTarget(buffer);
		state.gl.setClearColor('#d8d7d7');
		state.gl.render(scene, state.camera);
		state.gl.setRenderTarget(null);
	});
	return (
		<>
			{createPortal(children, scene)}
			<mesh scale={[viewport.width, viewport.height, 1]}>
				<planeGeometry />
				<MeshTransmissionMaterial
					buffer={buffer.texture}
					// ior={1.2}
					thickness={0}
					// anisotropy={0.1}
					// chromaticAberration={1}
				/>
			</mesh>
		</>
	);
}

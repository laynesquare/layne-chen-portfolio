import React, { useMemo, useRef, useState } from 'react';
import { MeshTransmissionMaterial, shaderMaterial, useFBO, useScroll } from '@react-three/drei';
import { createPortal, useFrame, useThree, extend, useLoader } from '@react-three/fiber';
import { GLSL3, Scene, ShaderMaterial, TextureLoader, Vector2 } from 'three';
import { easing } from 'maath';

import vertexShader from '@/shaders/animated-scroll-warp/vertex';
import fragmentShader from '@/shaders/animated-scroll-warp/fragment';

import { ReactLenis, useLenis } from '@studio-freight/react-lenis';

import { lerp } from 'three/src/math/MathUtils.js';

// Create the shader material
const RippleMaterial = shaderMaterial(
	{
		uResolution: new Vector2(window.innerWidth, window.innerHeight),
		uTime: 0,
		uCursor: new Vector2(0.5, 0.5),
		uScrollVelocity: 0,
		uTexture: null,
		uTextureSize: new Vector2(100, 100),
		uQuadSize: new Vector2(100, 100),
		uBorderRadius: 0,
		uMouseEnter: 0,
		uMouseOverPos: new Vector2(0.5, 0.5),
	},
	vertexShader,
	fragmentShader,
);

extend({ RippleMaterial });

export default function Ripple({ children, damping = 0.15, ...props }) {
	const ref = useRef();
	const buffer = useFBO();
	const viewport = useThree(state => state.viewport);
	const [scene] = useState(() => new Scene());
	const waterNormals = useLoader(TextureLoader, '/scenery/textures/background-gradient.png');
	const scrollRef = useRef(0);
	const velocityRef = useRef(0);
	const scrollThree = useScroll();
	const scrollLenis = useLenis(event => {
		velocityRef.current = event.velocity;
	});

	const materialRef = useRef(
		new ShaderMaterial({
			uniforms: {
				uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
				uTime: { value: 0 },
				uCursor: { value: new Vector2(0.5, 0.5) },
				uScrollVelocity: { value: 0 },
				uTexture: { value: null },
				uTextureSize: { value: new Vector2(100, 100) },
				uQuadSize: { value: new Vector2(100, 100) },
				uBorderRadius: { value: 0 },
				uMouseEnter: { value: 0 },
				uMouseOverPos: { value: new Vector2(0.5, 0.5) },
			},
			vertexShader,
			fragmentShader,
			glslVersion: GLSL3,
			// depthTest: true,
			// depthWrite: false,
		}),
	);

	useFrame(({ clock, gl, camera }, delta) => {
		const elapsedTime = clock.getElapsedTime();

		gl.setRenderTarget(buffer);
		gl.render(scene, camera);
		gl.setRenderTarget(null);

		if (materialRef.current) {
			materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
			materialRef.current.uniforms.uTexture.value = buffer.texture;
			materialRef.current.uniforms.uScrollVelocity.value = velocityRef.current;
		}
	});

	return (
		<>
			{createPortal(children, scene)}
			<mesh
				ref={ref}
				scale={[viewport.width, viewport.height, 1]}
				material={materialRef.current}
				position={[0, 0, 0]}>
				<planeGeometry args={[1, 1, 128, 128]} />
			</mesh>
		</>
	);
}
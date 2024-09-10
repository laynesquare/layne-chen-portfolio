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
	MeshStandardMaterial,
	SubtractiveBlending,
	MultiplyBlending,
	NormalBlending,
} from 'three';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { MeshTransmissionMaterial, RoundedBox, Text, PivotControls, useFBO, Line } from '@react-three/drei';
import CustomShaderMaterial from 'three-custom-shader-material';
import { RGBELoader } from 'three/examples/jsm/Addons.js';

const Banner = () => {
	const viewport = useThree(state => state.viewport);
	const background = useLoader(TextureLoader, '/scenery/textures/background-noise-medium.webp');
	const texture = useLoader(
		RGBELoader,
		'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr',
	);

	const metalAnisotropic = useLoader(TextureLoader, '/scenery/textures/metal_anisotropic.jpg');

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
			dithering: true,
		});
	}, []);

	useLenis(event => {
		const offset = Math.abs(event.scroll - offsetRef.current) / viewport.factor;
		if (event.direction) updatePosition(event.direction * offset);
		offsetRef.current = event.scroll;
	});

	const shared = { font: '/font/ClashDisplay-Semibold.woff' };

	const fbo = useFBO();
	const frontEndTextRef = useRef(null);
	const metalMeshRef = useRef(null);

	useFrame(({ scene, camera, gl, clock }) => {
		// Hide other objects

		const originalPosition = groupRef.current.position.y;
		groupRef.current.position.y = 0;

		gl.setRenderTarget(fbo); // Render to FBO
		gl.render(scene, camera); // Render the scene from the camera's perspective
		gl.setRenderTarget(null); // Reset the render target to default

		groupRef.current.position.y = originalPosition;

		metalMeshRef.current.rotation.x = Math.cos(clock.elapsedTime / 2);
		metalMeshRef.current.rotation.y = Math.sin(clock.elapsedTime / 2);
		metalMeshRef.current.rotation.z = Math.sin(clock.elapsedTime / 2);
		if (bgMaterial.current) {
			bgMaterial.current.uniforms.uTime.value = clock.elapsedTime;
		}
	});

	const bgMaterial = useRef(
		new ShaderMaterial({
			uniforms: {
				uTime: { value: 0 },
			},
			vertexShader: `
				varying vec2 vUv;
				
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				}
			  `,
			fragmentShader: `
					uniform float uTime;
					varying vec2 vUv;

					// Simplex 2D noise
					vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

					float snoise(vec2 v){
						const vec4 C = vec4(0.211324865405187, 0.366025403784439,
											-0.577350269189626, 0.024390243902439);
						vec2 i  = floor(v + dot(v, C.yy) );
						vec2 x0 = v -   i + dot(i, C.xx);
						vec2 i1;
						i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
						vec4 x12 = x0.xyxy + C.xxzz;
						x12.xy -= i1;
						i = mod(i, 289.0);
						vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
										+ i.x + vec3(0.0, i1.x, 1.0 ));
						vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
												dot(x12.zw,x12.zw)), 0.0);
						m = m*m ;
						m = m*m ;
						vec3 x = 2.0 * fract(p * C.www) - 1.0;
						vec3 h = abs(x) - 0.5;
						vec3 ox = floor(x + 0.5);
						vec3 a0 = x - ox;
						m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
						vec3 g;
						g.x  = a0.x  * x0.x  + h.x  * x0.y;
						g.yz = a0.yz * x12.xz + h.yz * x12.yw;
						return 130.0 * dot(m, g);
					}

					// Generate high-frequency noise for grain effect
					float grainNoise(vec2 uv) {
						return snoise(uv * 2000.0 + 1.0 * 10.0) * 0.05;
					}

					void main() {
						// Create vertical gradient
						float gradient = smoothstep(0.1, 10.0, abs(vUv.y - 0.5) * 100.0);
						
						// Generate low-frequency noise for pattern
						float noise = snoise(vUv * 10.0 + 1.0 * 0.1) * 2.0 * 0.5;
						
						// Combine gradient and noise for base pattern
						float pattern = mix(gradient, noise, 0.5);
						
						// Define colors
						vec3 darkColor = vec3(0.227, 0.227, 0.227);
						vec3 brightColor = vec3(0.243, 0.639, 0.482);
						
						// Mix colors based on the pattern
						vec3 finalColor = mix(brightColor, darkColor, pattern);
						
						// Add grainy texture on top
						float grain = grainNoise(vUv);
						finalColor += grain;  // Adjust the strength of the grain effect here
						
						gl_FragColor = vec4(finalColor, 1.0);
					}
			`,
		}),
	);

	return (
		<>
			<group ref={groupRef}>
				<Text
					ref={frontEndTextRef}
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
					scale={[viewport.width, viewport.height * 8, 1]}
					position={[0, -viewport.height * 3.5, 0]}
					material={bgMaterial.current}>
					<planeGeometry args={[1, 1, 100, 100]} />
				</mesh>

				<mesh
					ref={metalMeshRef}
					position={[0, -viewport.height, 1]}>
					<boxGeometry args={[1, 1, 1]} />
					<meshMatcapMaterial
						bumpMap={fbo.texture}
						bumpScale={0.5}
						// blending={AdditiveBlending}
						matcap={metalAnisotropic}
						dithering={true}
					/>
				</mesh>
			</group>
		</>
	);
};

export default Banner;

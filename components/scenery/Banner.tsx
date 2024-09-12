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
	LinearFilter,
	RGBAFormat,
	UnsignedShort4444Type,
	FrontSide,
	ACESFilmicToneMapping,
	MultiplyOperation,
} from 'three';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { MeshTransmissionMaterial, RoundedBox, Text, PivotControls, useFBO, Line } from '@react-three/drei';
import CustomShaderMaterial from 'three-custom-shader-material';
import { RGBELoader } from 'three/examples/jsm/Addons.js';

import { useDomStore } from '@/store';

const Banner = () => {
	const { viewport, size, camera, pointer } = useThree();
	const el = useDomStore(state => state.element);

	// const background = useLoader(TextureLoader, '/scenery/textures/background-noise-medium.webp');
	// const texture = useLoader(
	// 	RGBELoader,
	// 	'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr',
	// );

	const metalAnisotropic = useLoader(TextureLoader, '/scenery/textures/metal_anisotropic.jpg');

	// const aspectRatio = background.image.width / background.image.height;

	const offsetRef = useRef(0);
	const groupRef = useRef(null);

	function updatePosition(offset) {
		groupRef.current.position.y += offset;
	}

	const blendedMaterial = useMemo(() => {
		return new MeshBasicMaterial({
			color: new Color('#FFFFF0'),
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

	const fbo = useFBO(size.width * 0.1, size.height * 0.1, {
		minFilter: LinearFilter,
		magFilter: LinearFilter,
		format: RGBAFormat,
		type: UnsignedShort4444Type,
	});
	const frontEndTextRef = useRef(null);
	const metalMeshRef = useRef(null);

	useFrame(({ scene, camera, gl, clock }) => {
		// Hide other objects

		// console.log(viewport);
		// console.log(size);

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
				varying vec3 vPosition;
				
				void main() {
					vUv = uv;
					vPosition = position;
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				}
			  `,
			fragmentShader: `
				uniform float uTime;
				varying vec2 vUv;
				varying vec3 vPosition;

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
					vec3 x = 2.0 * fract(p * C.www) - 2.0;
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
					return snoise(uv * 1800.0 + 1.0 * 10.0) * 0.05;
				}

				float curvedLines(vec2 uv, float offset, float curveAmount) {
					// Apply curvature to the uv.x by using uv.y and curveAmount
					uv.x += sin(uv.y * 3.14159) * curveAmount;

					// Create the curved lines using the modified uv
					return smoothstep(
						0.0, 0.5 + offset * 0.5,
						abs(0.5 * (sin(uv.x * 10.0) + offset * 2.0))
					);
				}

				void main() {
					// Create vertical gradient
					float gradient = smoothstep(0.1, 8.0, abs(vUv.x - 0.5) * 80.0); // Adjust gradient smoothness
					
					// Generate low-frequency noise for pattern (scale down for larger shapes)
					float noise = snoise(vUv * 8.0 + uTime * 0.05) * 0.5; // Lower the frequency of noise
					
					// Combine gradient and noise for base pattern
					float pattern = mix(gradient, noise, 0.7); // Use more of the noise in blending

					vec2 baseUV = vPosition.xy;
					float basePattern = curvedLines(baseUV, 0.1, 1.0);
					float baseSecondPattern = curvedLines(baseUV, noise, 1.0);
					
					// Define colors
					vec3 darkColor = vec3(0.227, 0.227, 0.227);
					vec3 brightColor = vec3(0.243, 0.639, 0.482);
					
					// Mix colors based on the pattern
					vec3 finalColor = mix(brightColor, darkColor, baseSecondPattern);
					
					// Add grainy texture on top
					float grain = grainNoise(vUv);
					finalColor += grain;  // Adjust the strength of the grain effect here
					
					gl_FragColor = vec4(finalColor, 1.0);
				}
			`,
		}),
	);

	console.log('banner re rendner');

	const pixelFontSize = 16; // for example, 16px in CSS
	const threeJsFontSize = pixelFontSize / viewport.factor; // Convert px to Three.js units

	const camAt35 = {
		initialDpr: 1.5,
		dpr: 1.5,
		width: 11.041621754215447,
		height: 5.371288915852722,
		top: 0,
		left: 0,
		aspect: 2.0556745182012848,
		distance: 3.5,
		factor: 173.88749974766944,
	};

	const camAt2 = {
		initialDpr: 1.5,
		dpr: 1.5,
		width: 6.3094981452659695,
		height: 3.0693079519158415,
		top: 0,
		left: 0,
		aspect: 2.0556745182012848,
		distance: 2,
		factor: 304.30312455842153,
	};

	/**
	 *
	 * viewport.factor: 1 unit === 173.8874px
	 *
	 * viewport.factor: 1 unit = 304.3031px
	 *
	 * 304.303px
	 */

	const offset = 1 - 173.8874 / 304.3031;

	function calcPixel(ratio) {
		const base = (viewport.width + viewport.height) * ratio * offset;
		// const weight = 0.052579;
		return (viewport.width + viewport.height) * ratio * offset;
	}

	function calcX(ratio) {
		return viewport.width * ratio * offset;
	}

	function calcY(ratio) {
		return viewport.height * ratio * offset;
	}

	function calcFs(el) {
		if (!el) return 0;
		const cs = window.getComputedStyle(el);
		const bounding = el.getBoundingClientRect();

		console.log(cs.left);
		console.log(cs.fontSize);
		console.log(cs.top);
		console.log(cs.lineHeight);
		console.log(cs.letterSpacing);
		console.log(cs.height);
		console.log(cs.width);
		const fs = parseFloat(cs.fontSize);

		return (fs / 173) * offset;
	}

	return (
		<>
			<group ref={groupRef}>
				<Text
					ref={frontEndTextRef}
					position={[
						(-viewport.width / 2) * offset + (480 / 173.8874) * offset,
						(viewport.height / 2) * offset - (200 / 173.8874) * offset,
						2,
					]}
					{...shared}
					anchorX={'left'}
					anchorY={'top'}
					material={blendedMaterial}
					lineHeight={1.5}
					overflowWrap='break-word'
					maxWidth={(1425 / 173) * offset}
					fontSize={calcFs(el)}>
					{`Front-end`}
				</Text>

				<Text
					ref={frontEndTextRef}
					position={[calcX(-1 / 3.875), calcY(-1 / 5), 2]}
					{...shared}
					anchorX={'right'}
					anchorY={'top'}
					material={blendedMaterial}
					fontSize={calcPixel(1 / 60)}>
					{`[01.]`}
				</Text>
				<Text
					ref={frontEndTextRef}
					position={[calcX(-1 / 3), calcY(1 / 5), 2]}
					{...shared}
					anchorX={'left'}
					anchorY={'middle'}
					material={blendedMaterial}
					fontSize={calcPixel(7 / 100)}>
					{`Front-end`}
				</Text>
				<Text
					position={[calcX(1 / 3), calcY(0), 2]}
					anchorX={'right'}
					anchorY={'middle'}
					{...shared}
					material={blendedMaterial}
					fontSize={calcPixel(7 / 100)}>
					{`Developer`}
				</Text>
				<Text
					position={[calcX(-1 / 4.125), calcY(-1 / 5), 2]}
					anchorX={'left'}
					anchorY={'top'}
					material={blendedMaterial}
					fontSize={calcPixel(0.75 / 100)}
					font='/font/ClashDisplay-Regular.woff'>
					{`Craft with a blend\nof technical\nexpertise and\ndesign sensibility`}
					{viewport.height}
				</Text>

				<Text
					position={[calcX(-1 / 30), calcY(-1 / 5), 2]}
					anchorX={'right'}
					anchorY={'top'}
					material={blendedMaterial}
					fontSize={calcPixel(0.75 / 100)}
					textAlign='right'
					font='/font/ClashDisplay-Regular.woff'>
					{`Click the\nball to\nglow up`}
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
					<planeGeometry args={[1, 1, 1, 1]} />
				</mesh>
				<mesh
					ref={metalMeshRef}
					position={[0, -viewport.height, 1]}>
					<boxGeometry args={[1, 1, 1]} />
					{/* <meshMatcapMaterial
						side={FrontSide}
						bumpMap={fbo.texture}
						bumpScale={0.5}
						matcap={metalAnisotropic}
						dithering={true}
					/> */}
				</mesh>
			</group>
		</>
	);
};

export default Banner;

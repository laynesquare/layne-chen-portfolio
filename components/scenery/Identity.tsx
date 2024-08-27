import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import {
	Color,
	MeshBasicMaterial,
	MeshDepthMaterial,
	MeshPhysicalMaterial,
	MeshStandardMaterial,
	RGBADepthPacking,
	TextureLoader,
	Vector2,
} from 'three';
import vertexShader from '@/shaders/animated-jelly-text/vertex';
import fragmentShader from '@/shaders/animated-jelly-text/fragment';

import CustomShaderMaterial from 'three-custom-shader-material';

export default function Identity() {
	const meshRef = useRef();
	const materialRef = useRef();
	const depthMaterialRef = useRef(null);
	const waterNormals = useLoader(TextureLoader, '/scenery/textures/waternormals.jpg');

	const uniforms = {
		time: { value: 0 },
		Tiling_Caustic1477531952046_152_resolution: { value: new Vector2(1, 1) },
		Tiling_Caustic1477531952046_152_color: { value: new Color(0x202046) },
		Tiling_Caustic1477531952046_152_speed: { value: 0.5 },
		Tiling_Caustic1477531952046_152_brightness: { value: 1.4 },
		noiseImage: { value: waterNormals }, // Make sure waterNormals is a valid texture
		distortion: { value: 2.0 },
		contrast: { value: 1.6 },
		Noise_Ripples1477531959288_166_speed: { value: 0.1 },
		Noise_Ripples1477531959288_166_color: { value: new Color(0x470b6f) },
		Noise_Ripples1477531959288_166_brightness: { value: 0.1 },
		Noise_Ripples1477531959288_166_resolution: { value: new Vector2(2, 2) },
		amplitude: { value: 1 }, // Ensure this is a positive value
		frequency: { value: 1 }, // Ensure this is a positive value
		highlightIntensity: { value: 1 },
		highlightColor: { value: new Color(0x00570a) },
		Transparent_Glow1477532059126_201_color: { value: new Color(0x57605a) },
		Transparent_Glow1477532059126_201_start: { value: 0.54674743 },
		Transparent_Glow1477532059126_201_end: { value: 0.44399246 },
		Transparent_Glow1477532059126_201_alpha: { value: 0.5 },
		Glow_Effect1477532183055_216_color: { value: new Color(0xffffff) },
		Glow_Effect1477532183055_216_start: { value: 0.0 },
		Glow_Effect1477532183055_216_end: { value: 1.9 },
		Glow_Effect1477532183055_216_alpha: { value: 1.0 },
		Wiggly_Improved1477532051339_181_speed: { value: 0.5 }, // Add this missing uniform
	};

	useFrame(({ clock }) => {
		const elapsedTime = clock.getElapsedTime();

		if (materialRef.current) {
			console.log(waterNormals);

			materialRef.current.uniforms.time.value = elapsedTime;
		}
	});

	useEffect(() => {
		if (materialRef.current) {
			materialRef.current.onBeforeCompile = shader => {
				shader.fragmentShader = '#extension GL_OES_standard_derivatives : enable\n' + shader.fragmentShader;
			};
		}
	}, []);

	return (
		<mesh ref={meshRef}>
			<boxGeometry args={[1, 1, 1]} />
			<CustomShaderMaterial
				ref={materialRef}
				baseMaterial={MeshPhysicalMaterial}
				uniforms={uniforms}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
			/>
			<CustomShaderMaterial
				ref={depthMaterialRef}
				baseMaterial={MeshDepthMaterial}
				vertexShader={vertexShader}
				uniforms={uniforms}
				silent
				depthPacking={RGBADepthPacking}
				attach='customDepthMaterial'
			/>
		</mesh>
	);
}

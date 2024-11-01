import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { MeshTransmissionMaterial, Text3D, Center } from '@react-three/drei';
import {
	BoxGeometry,
	CapsuleGeometry,
	Color,
	IcosahedronGeometry,
	MeshBasicMaterial,
	MeshDepthMaterial,
	MeshPhysicalMaterial,
	MeshStandardMaterial,
	RGBADepthPacking,
	TextureLoader,
	TorusGeometry,
	TorusKnotGeometry,
	Vector2,
} from 'three';
import { TextGeometry } from 'three/examples/jsm/Addons.js';
import vertexShader from '@/shaders/animated-jelly-text/vertex';
import fragmentShader from '@/shaders/animated-jelly-text/fragment';

import CustomShaderMaterial from 'three-custom-shader-material';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { FontLoader } from 'three/examples/jsm/Addons.js';

import Inter from '@/public/font/Inter_Medium_Regular.json';
import { useControls } from 'leva';

extend({ TextGeometry });

export default function Identity() {
	const meshRef = useRef();
	const materialRef = useRef();
	const depthMaterialRef = useRef(null);
	const waterNormals = useLoader(TextureLoader, '/scenery/textures/waternormals.jpg');
	const ballGeometry = useMemo(() => {
		const geometry = mergeVertices(new TorusKnotGeometry());
		geometry.computeTangents();
		return geometry;
	}, []);

	const viewport = useThree(state => state.viewport);

	const { autoRotate, text, shadow, ...config } = {
		text: 'Inter',
		backside: true,
		backsideThickness: 0.15,
		samples: 16,
		resolution: 1024,
		transmission: 1,
		clearcoat: 1,
		clearcoatRoughness: 0.0,
		thickness: 0.3,
		chromaticAberration: 0.15,
		anisotropy: 0.25,
		roughness: 0,
		distortion: 0.5,
		distortionScale: 0.1,
		temporalDistortion: 0,
		ior: 1.25,
		color: 'white',
		shadow: '#94cbff',
		autoRotate: false,
	};
	// const { autoRotate, text, shadow, ...config } = useControls({
	// 	text: 'Inter',
	// 	backside: true,
	// 	backsideThickness: { value: 0.15, min: 0, max: 2 },
	// 	samples: { value: 16, min: 1, max: 32, step: 1 },
	// 	resolution: { value: 1024, min: 64, max: 2048, step: 64 },
	// 	transmission: { value: 1, min: 0, max: 1 },
	// 	clearcoat: { value: 1, min: 0.1, max: 1 },
	// 	clearcoatRoughness: { value: 0.0, min: 0, max: 1 },
	// 	thickness: { value: 0.3, min: 0, max: 5 },
	// 	chromaticAberration: { value: 0.15, min: -5, max: 5 },
	// 	anisotropy: { value: 0.25, min: 0, max: 1, step: 0.01 },
	// 	roughness: { value: 0, min: 0, max: 1, step: 0.01 },
	// 	distortion: { value: 0.5, min: 0, max: 4, step: 0.01 },
	// 	distortionScale: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
	// 	temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
	// 	ior: { value: 1.25, min: 0, max: 2, step: 0.01 },
	// 	color: 'white',
	// 	shadow: '#94cbff',
	// 	autoRotate: false,
	// });

	// const uniforms = {
	// 	time: { value: 0 },
	// 	Tiling_Caustic1477531952046_152_resolution: { value: new Vector2(1, 1) },
	// 	Tiling_Caustic1477531952046_152_color: { value: new Color(0x202046) },
	// 	Tiling_Caustic1477531952046_152_speed: { value: 0.5 },
	// 	Tiling_Caustic1477531952046_152_brightness: { value: 1 },
	// 	noiseImage: { value: waterNormals },
	// 	distortion: { value: 1.0 },
	// 	contrast: { value: 1 },
	// 	Noise_Ripples1477531959288_166_speed: { value: 1 },
	// 	Noise_Ripples1477531959288_166_color: { value: new Color(0x470b6f) },
	// 	Noise_Ripples1477531959288_166_brightness: { value: 1 },
	// 	Noise_Ripples1477531959288_166_resolution: { value: new Vector2(2, 2) },
	// 	amplitude: { value: 2 },
	// 	frequency: { value: 2 },
	// 	highlightIntensity: { value: 1 },
	// 	highlightColor: { value: new Color(0x00570a) },
	// 	Transparent_Glow1477532059126_201_color: { value: new Color(0x57605a) },
	// 	Transparent_Glow1477532059126_201_start: { value: 0.54674743 },
	// 	Transparent_Glow1477532059126_201_end: { value: 0.44399246 },
	// 	Transparent_Glow1477532059126_201_alpha: { value: 0.5 },
	// 	Glow_Effect1477532183055_216_color: { value: new Color(0xffffff) },
	// 	Glow_Effect1477532183055_216_start: { value: 0.0 },
	// 	Glow_Effect1477532183055_216_end: { value: 1 },
	// 	Glow_Effect1477532183055_216_alpha: { value: 1.0 },
	// 	Wiggly_Improved1477532051339_181_speed: { value: 1 }, // Add this missing uniform
	// };

	const uniforms = {
		time: { value: 0 },
		Tiling_Caustic1477531952046_152_resolution: { value: new Vector2(1, 1) },
		Tiling_Caustic1477531952046_152_color: { value: new Color(0x202046) },
		Tiling_Caustic1477531952046_152_speed: { value: 0.5 },
		Tiling_Caustic1477531952046_152_brightness: { value: 1.4 },
		noiseImage: { value: waterNormals },
		distortion: { value: 2.0 },
		contrast: { value: 1.6 },
		Noise_Ripples1477531959288_166_speed: { value: 0.3 },
		Noise_Ripples1477531959288_166_color: { value: new Color(0x470b6f) },
		Noise_Ripples1477531959288_166_brightness: { value: 0.2 },
		Noise_Ripples1477531959288_166_resolution: { value: new Vector2(2, 2) },
		amplitude: { value: 1.0 },
		frequency: { value: 1.0 },
		highlightIntensity: { value: 0.0 },
		highlightColor: { value: new Color(0x00570a) },
		Wiggly_Improved1477532051339_181_speed: { value: 1.0 },
		Transparent_Glow1477532059126_201_color: { value: new Color(0x57605a) },
		Transparent_Glow1477532059126_201_start: { value: 0.54674743 },
		Transparent_Glow1477532059126_201_end: { value: 0.44399246 },
		Transparent_Glow1477532059126_201_alpha: { value: 0.5 },
		Glow_Effect1477532183055_216_color: { value: new Color('#ffffff ') },
		Glow_Effect1477532183055_216_start: { value: 0.0 },
		Glow_Effect1477532183055_216_end: { value: 1 },
		Glow_Effect1477532183055_216_alpha: { value: 1.0 },
	};

	useFrame(({ clock }) => {
		const elapsedTime = clock.getElapsedTime();

		if (materialRef.current) {
			materialRef.current.uniforms.time.value = elapsedTime;
		}
	});

	useEffect(() => {
		if (materialRef.current) {
			materialRef.current.onBeforeCompile = shader => {
				shader.fragmentShader = '#extension GL_OES_standard_derivatives : enable\n' + shader.fragmentShader;

				console.log('working');
			};
		}
	}, []);

	return (
		<Center
			// onCentered={({ container, height }) => container.scale.setScalar(viewport.height / height)}
			position={[0, 0, 2]}>
			<mesh ref={meshRef}>
				<Text3D
					// castShadow
					// bevelEnabled
					// scale={1}
					// letterSpacing={-0.03}
					// smooth={1}
					font={'/font/Inter_Medium_Regular.json'}
					size={0.25}
					height={0.02}
					bevelSize={0.01}
					bevelSegments={10}
					curveSegments={128}
					bevelThickness={0.01}>
					{'Front-end Developer\n'}
					{'Based in Taiwan'}
					{/* <CustomShaderMaterial
						ref={materialRef}
						baseMaterial={MeshPhysicalMaterial}
						uniforms={uniforms}
						vertexShader={vertexShader}
						// fragmentShader={fragmentShader}
						{...config}
					/> */}
					<MeshTransmissionMaterial
						{...config}
						// background={texture}
					/>
				</Text3D>
			</mesh>
		</Center>
	);
}

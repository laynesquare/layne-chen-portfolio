import { extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import React, { useRef, useEffect, useMemo, useState } from 'react';
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
	PerspectiveCamera,
} from 'three';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { MeshTransmissionMaterial, RoundedBox, Text, PivotControls, useFBO, Line } from '@react-three/drei';
import CustomShaderMaterial from 'three-custom-shader-material';
import { RGBELoader } from 'three/examples/jsm/Addons.js';

import { useDomStore } from '@/store';

import vertexShader from '@/shaders/animated-underlay-acid-fluid/vertex';
import fragmentShader from '@/shaders/animated-underlay-acid-fluid/fragment';

const Banner = () => {
	const { viewport, size, camera, pointer } = useThree();
	const domTextEls = useDomStore(state => state.textEls);
	const torsoEl = useDomStore(state => state.torsoEl);
	const meshMetalRef = useRef(null);

	const textureMetalAnisotropic = useLoader(TextureLoader, '/scenery/textures/metal_anisotropic.jpg');

	const scrollOffsetRef = useRef(0); // pixel
	const groupRef = useRef(null);

	const textMeshRatio = 1 - viewport.factor / calcFactorCamZ(2);

	function calcFactorCamZ(zPosition: number) {
		const fov = (camera.fov * Math.PI) / 180;
		const h = 2 * Math.tan(fov / 2) * zPosition;
		const w = h * (size.width / size.height);
		const factor = size.width / w;
		return factor;
	}

	const materialDomText = useRef(
		new MeshBasicMaterial({
			color: new Color('#FFFFF0'),
			blending: AdditiveBlending,
			dithering: true,
		}),
	);

	const materialAcidBg = useRef(
		new ShaderMaterial({
			uniforms: { uTime: { value: 0 } },
			vertexShader,
			fragmentShader,
		}),
	);

	const domTextShared = {
		font: '/font/ClashDisplay-Semibold.woff',
		anchorX: 'left',
		anchorY: 'top',
		overflowWrap: 'break-word',
	};

	const fbo = useFBO(size.width * 0.1, size.height * 0.1, {
		minFilter: LinearFilter,
		magFilter: LinearFilter,
		format: RGBAFormat,
		type: UnsignedShort4444Type,
	});

	useFrame(({ scene, camera, gl, clock }) => {
		const originalPosition = groupRef.current.position.y;

		groupRef.current.position.y = 0;

		gl.setRenderTarget(fbo); // Render to FBO
		gl.render(scene, camera); // Render the scene from the camera's perspective
		gl.setRenderTarget(null); // Reset the render target to default

		groupRef.current.position.y = originalPosition;

		if (meshMetalRef.current) {
			meshMetalRef.current.rotation.x = Math.cos(clock.elapsedTime / 2);
			meshMetalRef.current.rotation.y = Math.sin(clock.elapsedTime / 2);
			meshMetalRef.current.rotation.z = Math.sin(clock.elapsedTime / 2);
		}

		if (materialAcidBg.current) {
			materialAcidBg.current.uniforms.uTime.value = clock.elapsedTime;
		}
	});

	useLenis(
		event => {
			const offset = (Math.abs(event.scroll - scrollOffsetRef.current) / viewport.factor) * textMeshRatio;
			if (event.direction) {
				updatePosition(event.direction * offset);
				scrollOffsetRef.current = event.scroll;
			}
		},
		[size],
	);

	function updatePosition(offset: number) {
		if (groupRef.current) {
			groupRef.current.position.y += offset;
		}
	}

	useEffect(() => {
		if (groupRef.current) {
			groupRef.current.position.y = (scrollOffsetRef.current / viewport.factor) * textMeshRatio;
		}
	}, [size, viewport, textMeshRatio]);

	console.log('banner re rendner');

	return (
		<>
			<group ref={groupRef}>
				{[...domTextEls].map((el, idx) => {
					const { fontSize, lineHeight, height, width, textAlign, maxWidth, letterSpacing } =
						window.getComputedStyle(el);

					const { left, top } = el.getBoundingClientRect();
					const baseX = (-viewport.width / 2) * textMeshRatio;
					const baseY = (viewport.height / 2) * textMeshRatio;
					const isFlip = el.dataset.flip;
					let x = baseX + (parseFloat(left) / viewport.factor) * textMeshRatio;

					const y =
						baseY -
						(parseFloat(top) / viewport.factor) * textMeshRatio -
						Math.abs((scrollOffsetRef.current / viewport.factor) * textMeshRatio);

					const z = 2;

					if (isFlip) {
						x += (parseFloat(width) / viewport.factor) * textMeshRatio;
					}

					return (
						<Text
							key={idx}
							{...domTextShared}
							position={[x, y, z]}
							material={materialDomText.current}
							lineHeight={parseFloat(lineHeight) / parseFloat(fontSize)}
							maxWidth={(parseFloat(width) / viewport.factor) * textMeshRatio + 0.01}
							scale={isFlip ? [-1, 1, 1] : [1, 1, 1]}
							textAlign={textAlign}
							overflowWrap='break-word'
							fontSize={(parseFloat(fontSize) / viewport.factor) * textMeshRatio}>
							{el.textContent}
						</Text>
					);
				})}

				{/* <Text
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
				</Text> */}
				<mesh
					scale={[torsoEl.offsetWidth / viewport.factor + 0.1, torsoEl.offsetHeight / viewport.factor, 1]}
					position={[0, 0, 0]}
					material={materialAcidBg.current}>
					<planeGeometry args={[1, 1, 1, 1]} />
				</mesh>
				<mesh
					ref={meshMetalRef}
					position={[0, -viewport.height, 2]}>
					{/* <boxGeometry args={[1, 1, 1]} /> */}
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

/* -------------------------------------------------------------------------- */
/*                                  later use                                 */
/* -------------------------------------------------------------------------- */

// const background = useLoader(TextureLoader, '/scenery/textures/background-noise-medium.webp');
// const texture = useLoader(
// 	RGBELoader,
// 	'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr',
// );

// const background = useLoader(
// 	THREE.TextureLoader,
// 	'/scenery/textures/background-noise-medium.webp',
// );
// const texture = useLoader(
// 	THREE.RGBELoader,
// 	'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr',
// );

const useCustomViewport = () => {
	const { viewport, camera, pointer, size } = useThree();
	const [custom, setCustom] = useState({ viewport, camera, pointer, size });

	useEffect(() => {
		const isMobile = () => {
			const userAgent = navigator.userAgent || navigator.vendor || window.opera;

			// Mobile user agent detection
			if (/android/i.test(userAgent)) {
				return true;
			}

			if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
				return true;
			}

			// Tablets (Android, iOS)
			if (/Tablet|PlayBook|Silk|Kindle|iPad/.test(userAgent)) {
				return true;
			}

			// Windows phone
			if (/Windows Phone|IEMobile|WPDesktop/.test(userAgent)) {
				return true;
			}

			return false;
		};

		const handleSize = () => {
			console.log('calling');
			if (false) {
				alert('resize from banner');
				setCustom({ viewport, camera, pointer, size });
			}
		};

		window.addEventListener('resize', handleSize);
		return () => window.removeEventListener('resize', handleSize);
	}, [viewport, camera, pointer, size]);

	return { ...custom };
};

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

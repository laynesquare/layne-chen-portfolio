// cSpell: ignore Raycaster, GLTF, metalness, clearcoat, matcap, drei, RGBE, GSAP, Satoshi

import { extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import React, { useRef, useEffect, useMemo, useState, useCallback, memo } from 'react';
import {
	Color,
	MeshBasicMaterial,
	MeshStandardMaterial,
	MeshPhysicalMaterial,
	ShaderMaterial,
	TextureLoader,
	Vector2,
	CustomBlending,
	AddEquation,
	SubtractEquation,
	SrcAlphaFactor,
	OneFactor,
	DstColorFactor,
	OneMinusDstColorFactor,
	OneMinusSrcColorFactor,
	OneMinusSrcAlphaFactor,
	OneMinusDstAlphaFactor,
	SrcColorFactor,
	SrcAlphaSaturateFactor,
	ZeroFactor,
	AdditiveBlending,
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
	Vector4,
	AddOperation,
	Scene,
	MeshNormalMaterial,
	UnsignedByteType,
	NearestFilter,
	HalfFloatType,
	NoBlending,
} from 'three';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { MeshTransmissionMaterial, RoundedBox, Text, PivotControls, useFBO, Line, useGLTF } from '@react-three/drei';
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import { RGBELoader } from 'three/examples/jsm/Addons.js';

import { useDomStore, usePortFboStore, useWebGlStore } from '@/store';
import { useShallow } from 'zustand/react/shallow';

import vertexShaderRoundedRec from '@/shaders/rounded-rectangle/vertex';
import fragmentShaderRoundedRec from '@/shaders/rounded-rectangle/fragment';
import vertexShaderAcidBg from '@/shaders/animated-underlay-acid-fluid/vertex';
import fragmentShaderAcidBg from '@/shaders/animated-underlay-acid-fluid/fragment';
import fragmentShaderParallaxDepth from '@/shaders/animated-parallax-depth/fragment';
import vertexShaderParallaxDepth from '@/shaders/animated-parallax-depth/vertex';

// gsap
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Banner = memo(function Banner() {
	// const viewport = useThree(state => state.viewport);
	// const size = useThree(state => state.size);
	// const camera = useThree(state => state.camera);

	const [viewport, size, camera] = useThree(state => [state.viewport, state.size, state.camera]);

	const pointerRef = useRef(new Vector2(0, 0));
	const pointerCenterRef = useRef(new Vector2(0, 0));

	const textGroupRef = useRef(null);
	const textMeshRatio = 1 - viewport.factor / calcFactorCamZ(3);

	const torsoMeshRef = useRef(null);
	const torsoGroupRef = useRef(null);
	const torsoMeshRatio = 1 - viewport.factor / calcFactorCamZ(0);

	const containerGroupRef = useRef(null);
	const containerMeshRatio = 1 - viewport.factor / calcFactorCamZ(2.9);
	const containerMaterialParallaxRefs = useRef({
		previewShareYourMemoriesTemp: null,
		previewShareYourMemories: null,
		previewLearnEnglishDictionary: null,
	});
	const containerMaskedMeshesRef = useRef(new Set());

	const [previewShareYourMemories, previewLearnEnglishDictionary] = useLoader(TextureLoader, [
		'/frame/project-preview-share-your-memories.webp',
		'/frame/project-preview-learn-english-dictionary.webp',
	]);

	const previewMap = {
		previewShareYourMemoriesTemp: previewShareYourMemories,
		previewShareYourMemories: previewShareYourMemories,
		previewLearnEnglishDictionary: previewLearnEnglishDictionary,
	};

	useEffect(() => {
		// containerMaskedMeshesRegister(containerMaskedMeshesRef.current);
		useWebGlStore.setState({ containerMaskedMeshes: containerMaskedMeshesRef.current });
	}, []);

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
			dithering: true,
			depthWrite: false,
			depthTest: false,
		}),
	);

	const materialDomTextHighlight = useRef(
		new MeshBasicMaterial({
			color: new Color('#FAFF00'),
			dithering: true,
			depthWrite: false,
			depthTest: false,
		}),
	);

	const materialAcidBg = useRef(
		new ShaderMaterial({
			uniforms: {
				uTime: { value: 0 },
				uBrightColor: { value: new Color('#69D2B7') },
				uDarkColor: { value: new Color('#868686') },
			},
			vertexShader: vertexShaderAcidBg,
			fragmentShader: fragmentShaderAcidBg,
			depthWrite: false,
			depthTest: false,
		}),
	);

	useFrame(({ scene, camera, gl, clock, pointer }) => {
		if (materialAcidBg.current) {
			materialAcidBg.current.uniforms.uTime.value = clock.elapsedTime;
		}

		const containerMaterialParallaxRefsKeys = Object.keys(containerMaterialParallaxRefs.current);

		const target =
			pointerRef.current.distanceTo(pointer) > 0
				? pointerRef.current.clone().sub(pointer).negate()
				: pointerCenterRef.current;

		pointerRef.current.copy(pointer);

		containerMaterialParallaxRefsKeys.forEach(key => {
			containerMaterialParallaxRefs.current[key].uniforms.uMouse.value.lerp(target, 0.025);
		});

		textGroupRef.current.visible = false;
		containerGroupRef.current.visible = false;
	});

	useLenis(event => {
		updatePosition(event.scroll);
	});

	function updatePosition(offset: number) {
		if (textGroupRef.current && containerGroupRef.current) {
			const base = offset / viewport.factor;
			textGroupRef.current.position.y = base * textMeshRatio;
			containerGroupRef.current.position.y = base * containerMeshRatio;
			torsoGroupRef.current.position.y = base * torsoMeshRatio;
		}
	}

	const containerMeshMaterial = useRef(
		new ShaderMaterial({
			uniforms: {
				uTexture: { value: null },
				uResolution: { value: new Vector2(0, 0) },
				uRadii: { value: new Vector4(0, 0, 0, 0) },
				uMouse: { value: new Vector2(0.5, 0.5) },
				uAnchor: { value: 0 },
				uHeatMap: { value: 0 },
				uMask: { value: null },
				uMaskResolution: { value: new Vector2(size.width, size.height) },
			},
			vertexShader: vertexShaderRoundedRec,
			fragmentShader: fragmentShaderRoundedRec,
			transparent: true,
			depthWrite: false,
			depthTest: false,
			stencilWrite: false,
		}),
	);

	const containerMeshParallaxMaterial = useRef(
		new ShaderMaterial({
			uniforms: {
				uTexture: { value: null },
				uResolution: { value: new Vector2(0, 0) },
				uRadii: { value: new Vector4(0, 0, 0, 0) },
				uMouse: { value: new Vector2(0.5, 0.5) },
				uAnchor: { value: 0 },
				uHeatMap: { value: 0 },
				uMask: { value: null },
				uMaskResolution: { value: new Vector2(size.width, size.height) },
			},
			vertexShader: vertexShaderParallaxDepth,
			fragmentShader: fragmentShaderParallaxDepth,
			transparent: true,
			depthWrite: false,
			depthTest: false,
			stencilWrite: false,
		}),
	);

	console.log('banner re rerenders');

	return (
		<>
			<group
				name='text-mesh-group'
				ref={textGroupRef}>
				{/* {[...domTexts].map((el, idx) => { */}
				{[...useDomStore.getState().textEls].map((el, idx) => {
					const { fontSize, lineHeight, textAlign } = window.getComputedStyle(el);
					const { scrollY } = window;
					const { left, top, height, width } = el.getBoundingClientRect();
					const { fontFamily, scaleY, fontHighlight } = el.dataset;
					const { factor } = viewport;

					const parsedFontSize = parseFloat(fontSize);
					const parsedLineHeight = parseFloat(lineHeight);
					const ratio = textMeshRatio;
					const baseX = (-viewport.width / 2) * ratio;
					const baseY = (viewport.height / 2) * ratio;
					const scrollOffset = (scrollY / factor) * ratio;
					const material = fontHighlight ? materialDomTextHighlight.current : materialDomText.current;

					let pX = baseX + (left / factor) * ratio;
					let pY = baseY - (top / factor) * ratio - scrollOffset;
					let pZ = 3;

					let sX = 1;
					let sY = 1;
					let sZ = 1;

					if (scaleY) {
						sY = parseFloat(scaleY);
					}

					return (
						<Text
							key={idx}
							{...domTextShared(fontFamily)}
							position={[pX, pY, pZ]}
							material={material}
							lineHeight={parsedLineHeight / parsedFontSize}
							maxWidth={(width / factor) * ratio + 0.01}
							scale={[sX, sY, sZ]}
							textAlign={textAlign}
							fontSize={(parsedFontSize / factor) * ratio}
							userData={el.dataset}
							characters={el.innerText}>
							{el.textContent}
						</Text>
					);
				})}
			</group>

			<group
				ref={containerGroupRef}
				name='container-mesh-group'>
				{[...useDomStore.getState().containerEls].map((el, idx) => {
					const {
						borderBottomLeftRadius: rbl,
						borderBottomRightRadius: rbr,
						borderTopLeftRadius: rtl,
						borderTopRightRadius: rtr,
					} = window.getComputedStyle(el);
					const { scrollY } = window;
					const { left, top, width, height } = el.getBoundingClientRect();
					const { parallax, anchor, anchorMirror } = el.dataset;
					const { factor } = viewport;
					const ratio = containerMeshRatio;
					const baseX = (-viewport.width / 2) * ratio;
					const baseY = (viewport.height / 2) * ratio;
					const shiftHalfW = width / 2;
					const shiftHalfH = height / 2;
					const scrollOffset = (scrollY / factor) * ratio;

					let x = baseX + ((left + shiftHalfW) / factor) * ratio;
					let y = baseY - ((top + shiftHalfH) / factor) * ratio - scrollOffset;
					let z = 2.9;

					const radius = [parseFloat(rtr), parseFloat(rbr), parseFloat(rtl), parseFloat(rbl)];

					const material = parallax
						? containerMeshParallaxMaterial.current.clone()
						: containerMeshMaterial.current.clone();

					containerMaterialParallaxRefs.current[parallax] = material;

					material.uniforms.uTexture.value = previewMap[parallax] || null;
					material.uniforms.uResolution.value.set(width, height);
					material.uniforms.uRadii.value.set(...radius);
					material.uniforms.uMouse.value.set(0.5, 0.5);
					material.uniforms.uAnchor.value = +!!anchor;
					material.uniforms.uHeatMap.value = 0;
					material.uniforms.uMask.value = null;
					material.uniforms.uMaskResolution.value.set(size.width, size.height);

					return (
						<mesh
							key={idx}
							name={anchor}
							ref={el => {
								anchor && el ? containerMaskedMeshesRef.current.add(el) : null;
							}}
							position={[x, y, z]}
							userData={{ dataset: el.dataset, el }}
							material={material}>
							<planeGeometry args={[(width / factor) * ratio, (height / factor) * ratio, 1, 1]} />
						</mesh>
					);
				})}
			</group>

			<group ref={torsoGroupRef}>
				<mesh
					name='torso-mesh'
					ref={torsoMeshRef}
					scale={[
						(useDomStore.getState().torsoEl.offsetWidth / viewport.factor) * torsoMeshRatio + 1,
						(useDomStore.getState().torsoEl.offsetHeight / viewport.factor) * torsoMeshRatio,
						1,
					]}
					position={[
						0,
						(viewport.height / 2) * torsoMeshRatio -
							((useDomStore.getState().torsoEl.offsetHeight / viewport.factor) * torsoMeshRatio) / 2,
						0,
					]}
					material={materialAcidBg.current}>
					<planeGeometry args={[1, 1, 1, 1]} />
				</mesh>
			</group>
		</>
	);
});

export default Banner;

/* -------------------------------------------------------------------------- */
/*                                  later use                                 */
/* -------------------------------------------------------------------------- */

function domTextShared(type: 'boxing' | 'satoshi') {
	const fontFamily = {
		boxing: '/font/Boxing-Regular.woff',
		satoshi: '/font/Satoshi-Bold.woff',
	};

	return {
		font: fontFamily[type],
		anchorX: 'left',
		anchorY: 'top',
		overflowWrap: 'break-word',
	};
}

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

// const useCustomViewport = () => {
// 	const { viewport, camera, pointer, size } = useThree();
// 	const [custom, setCustom] = useState({ viewport, camera, pointer, size });

// 	useEffect(() => {
// 		const isMobile = () => {
// 			const userAgent = navigator.userAgent || navigator.vendor || window.opera;

// 			// Mobile user agent detection
// 			if (/android/i.test(userAgent)) {
// 				return true;
// 			}

// 			if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
// 				return true;
// 			}

// 			// Tablets (Android, iOS)
// 			if (/Tablet|PlayBook|Silk|Kindle|iPad/.test(userAgent)) {
// 				return true;
// 			}

// 			// Windows phone
// 			if (/Windows Phone|IEMobile|WPDesktop/.test(userAgent)) {
// 				return true;
// 			}

// 			return false;
// 		};

// 		const handleSize = () => {
// 			console.log('calling');
// 			if (false) {
// 				alert('resize from banner');
// 				setCustom({ viewport, camera, pointer, size });
// 			}
// 		};

// 		window.addEventListener('resize', handleSize);
// 		return () => window.removeEventListener('resize', handleSize);
// 	}, [viewport, camera, pointer, size]);

// 	return { ...custom };
// };

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

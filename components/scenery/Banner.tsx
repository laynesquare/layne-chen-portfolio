// cSpell: ignore Raycaster, GLTF, metalness, clearcoat, matcap, drei, RGBE, GSAP, Satoshi

import { extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import React, { useRef, useEffect, useMemo, useState } from 'react';
import {
	Color,
	MeshBasicMaterial,
	MeshStandardMaterial,
	MeshPhysicalMaterial,
	ShaderMaterial,
	TextureLoader,
	Vector2,
	CustomBlending,
	OneMinusSrcAlphaFactor,
	AddEquation,
	SrcAlphaFactor,
	OneFactor,
	DstColorFactor,
	OneMinusDstColorFactor,
	OneMinusSrcColorFactor,
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
} from 'three';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { MeshTransmissionMaterial, RoundedBox, Text, PivotControls, useFBO, Line } from '@react-three/drei';
import CustomShaderMaterial from 'three-custom-shader-material';
import { RGBELoader } from 'three/examples/jsm/Addons.js';

import { useDomStore } from '@/store';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';

import vertexShaderRoundedRec from '@/shaders/rounded-rectangle/vertex';
import fragmentShaderRoundedRec from '@/shaders/rounded-rectangle/fragment';
import vertexShaderAcidBg from '@/shaders/animated-underlay-acid-fluid/vertex';
import fragmentShaderAcidBg from '@/shaders/animated-underlay-acid-fluid/fragment';
import fragmentShaderParallaxDepth from '@/shaders/animated-parallax-depth/fragment';
import vertexShaderParallaxDepth from '@/shaders/animated-parallax-depth/vertex';

import debounce from 'lodash/debounce';

gsap.registerPlugin(useGSAP);

// Custom hook for debounced viewport
// Custom hook for debounced viewport and size

const Banner = () => {
	const { viewport, size, camera } = useThree();
	// const torsoDomEl = useDomStore(state => state.torsoEl);
	// const containerDomEls = useDomStore(state => state.containerEls);
	// const textDomEls = useDomStore(state => state.textEls);

	const { torsoEl: torsoDomEl, containerEls: containerDomEls, textEls: textDomEls } = useDomStore(state => state);

	const scrollOffsetRef = useRef(0); // pixel
	const pointerRef = useRef(new Vector2(0, 0));
	const pointerCenterRef = useRef(new Vector2(0, 0));

	const textGroupRef = useRef(null);
	const textMeshRatio = 1 - viewport.factor / calcFactorCamZ(3);

	const containerGroupRef = useRef(null);
	const containerMeshRatio = 1 - viewport.factor / calcFactorCamZ(2.9);
	const containerMaterialParallaxRefs = useRef([]);

	const meshMetalRef = useRef(null);

	const previewShareYourMemories = useLoader(TextureLoader, '/frame/project-preview-share-your-memories.jpg');
	const previewLearnEnglishDictionary = useLoader(
		TextureLoader,
		'/frame/project-preview-learn-english-dictionary.jpg',
	);

	const previewMap = {
		previewShareYourMemories: previewShareYourMemories,
		previewLearnEnglishDictionary: previewLearnEnglishDictionary,
	};

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
			// blending: MultiplyBlending,
			depthWrite: false,
			depthTest: false,
		}),
	);

	const materialDomTextHighlight = useRef(
		new MeshBasicMaterial({
			color: new Color('#25fed3'),
			dithering: true,
			depthWrite: false,
			depthTest: false,
		}),
	);

	const materialAcidBg = useRef(
		new ShaderMaterial({
			uniforms: { uTime: { value: 0 } },
			vertexShader: vertexShaderAcidBg,
			fragmentShader: fragmentShaderAcidBg,
			depthWrite: false,
			depthTest: false,
		}),
	);

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

	const fbo = useFBO(size.width * 0.1, size.height * 0.1, {
		minFilter: LinearFilter,
		magFilter: LinearFilter,
		format: RGBAFormat,
		type: UnsignedShort4444Type,
	});

	useFrame(({ scene, camera, gl, clock }) => {
		const originalPosition = textGroupRef.current.position.y;

		textGroupRef.current.position.y = 0;

		gl.setRenderTarget(fbo); // Render to FBO
		gl.render(scene, camera); // Render the scene from the camera's perspective
		gl.setRenderTarget(null); // Reset the render target to default

		textGroupRef.current.position.y = originalPosition;

		if (meshMetalRef.current) {
			meshMetalRef.current.rotation.x = Math.cos(clock.elapsedTime / 2);
			meshMetalRef.current.rotation.y = Math.sin(clock.elapsedTime / 2);
			meshMetalRef.current.rotation.z = Math.sin(clock.elapsedTime / 2);
		}

		if (materialAcidBg.current) {
			materialAcidBg.current.uniforms.uTime.value = clock.elapsedTime;
		}

		if (containerMaterialParallaxRefs.current.length) {
			const target =
				pointerRef.current.distanceTo(pointer) > 0
					? pointerRef.current.clone().sub(pointer).negate()
					: pointerCenterRef.current;

			pointerRef.current.copy(pointer);
			containerMaterialParallaxRefs.current.forEach(ref => {
				ref.uniforms.uMouse.value.lerp(target, 0.025);
			});
		}
	});

	useLenis(
		event => {
			const baseOffset = Math.abs(event.scroll - scrollOffsetRef.current) / viewport.factor;
			if (event.direction) {
				updatePosition(event.direction * baseOffset);
				scrollOffsetRef.current = event.scroll;
			}
		},
		[size],
	);

	function updatePosition(offset: number) {
		if (textGroupRef.current) {
			textGroupRef.current.position.y += offset * textMeshRatio;
		}

		if (containerGroupRef.current) {
			containerGroupRef.current.position.y += offset * containerMeshRatio;
		}
	}

	useEffect(() => {
		if (textGroupRef.current) {
			textGroupRef.current.position.y = (scrollOffsetRef.current / viewport.factor) * textMeshRatio;
		}

		if (containerGroupRef.current) {
			containerGroupRef.current.position.y = (scrollOffsetRef.current / viewport.factor) * containerMeshRatio;
		}
	}, [size, viewport, textMeshRatio, containerMeshRatio]);

	// useGSAP(() => {
	// 	if (isHover) {
	// 		gsap.to(groupRef.current.position, {
	// 			z: -10,
	// 			duration: 5,
	// 			ease: 'power2.inOut',
	// 		});
	// 	}
	// }, [isHover]);

	return (
		<>
			<group
				ref={textGroupRef}
				onPointerOver={() => null}>
				{[...textDomEls].map((el, idx) => {
					const { fontSize, lineHeight, textAlign } = window.getComputedStyle(el);
					const { left, top, height, width } = el.getBoundingClientRect();
					const { fontFamily, scaleY, fontHighlight } = el.dataset;
					const { factor } = viewport;
					const parsedL = parseFloat(left);
					const parsedT = parseFloat(top);
					const parsedFontSize = parseFloat(fontSize);
					const parsedLineHeight = parseFloat(lineHeight);
					const parsedH = parseFloat(height);
					const parsedW = parseFloat(width);
					const ratio = textMeshRatio;
					const baseX = (-viewport.width / 2) * ratio;
					const baseY = (viewport.height / 2) * ratio;
					const scrollOffset = Math.abs((scrollOffsetRef.current / factor) * ratio);
					const material = fontHighlight ? materialDomTextHighlight.current : materialDomText.current;

					let pX = baseX + (parsedL / factor) * ratio;
					let pY = baseY - (parsedT / factor) * ratio - scrollOffset;
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
							maxWidth={(parsedW / factor) * ratio + 0.01}
							scale={[sX, sY, sZ]}
							textAlign={textAlign}
							fontSize={(parsedFontSize / factor) * ratio}>
							{el.textContent}
						</Text>
					);
				})}

				<mesh
					scale={[
						torsoDomEl.offsetWidth / viewport.factor + 0.1,
						torsoDomEl.offsetHeight / viewport.factor,
						1,
					]}
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

			<group ref={containerGroupRef}>
				{[...containerDomEls].map((el, idx) => {
					const {
						width,
						height,
						borderBottomLeftRadius: rbl,
						borderBottomRightRadius: rbr,
						borderTopLeftRadius: rtl,
						borderTopRightRadius: rtr,
					} = window.getComputedStyle(el);
					const { left, top } = el.getBoundingClientRect();
					const { parallax } = el.dataset;
					const { factor } = viewport;
					const ratio = containerMeshRatio;
					const baseX = (-viewport.width / 2) * ratio;
					const baseY = (viewport.height / 2) * ratio;
					const parsedW = parseFloat(width);
					const parsedH = parseFloat(height);
					const parseL = parseFloat(left);
					const parseT = parseFloat(top);
					const shiftHalfW = parsedW / 2;
					const shiftHalfH = parsedH / 2;
					const scrollOffset = Math.abs((scrollOffsetRef.current / factor) * ratio);

					let x = baseX + ((parseL + shiftHalfW) / factor) * ratio;
					let y = baseY - ((parseT + shiftHalfH) / factor) * ratio - scrollOffset;
					let z = 2.9;

					const radius = [parseFloat(rtr), parseFloat(rbr), parseFloat(rtl), parseFloat(rbl)];

					const vs = parallax ? vertexShaderParallaxDepth : vertexShaderRoundedRec;
					const fs = parallax ? fragmentShaderParallaxDepth : fragmentShaderRoundedRec;

					const uniforms = parallax
						? {
								uTexture: { value: previewMap[parallax] },
								uResolution: { value: new Vector2(parsedW, parsedH) },
								uRadii: { value: new Vector4(...radius) },
								uMouse: { value: new Vector2(0.5, 0.5) },
						  }
						: {
								uResolution: { value: new Vector2(parsedW, parsedH) },
								uRadii: { value: new Vector4(...radius) },
						  };

					const materialRef = parallax ? el => (containerMaterialParallaxRefs.current[idx] = el) : null;

					return (
						<mesh
							key={idx}
							position={[x, y, z]}>
							<planeGeometry args={[(parsedW / factor) * ratio, (parsedH / factor) * ratio, 1, 1]} />
							<CustomShaderMaterial
								ref={materialRef}
								baseMaterial={MeshBasicMaterial}
								silent
								vertexShader={vs}
								fragmentShader={fs}
								uniforms={uniforms}
								transparent
								depthTest={false}
								depthWrite={false}
							/>
						</mesh>
					);
				})}
			</group>

			{/* <group>
				<mesh
					position={[0, 0, 1]}
					material={materialParallaxDepth.current}
					onPointerEnter={() => console.log('enter')}>
					<planeGeometry args={[5, 3, 1, 1]} />
				</mesh>
			</group> */}
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

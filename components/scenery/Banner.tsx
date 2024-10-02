// cSpell: ignore Raycaster, GLTF, metalness, clearcoat, matcap, drei, RGBE, GSAP, Satoshi

import { extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react';
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
} from 'three';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { MeshTransmissionMaterial, RoundedBox, Text, PivotControls, useFBO, Line } from '@react-three/drei';
import CustomShaderMaterial from 'three-custom-shader-material';
import { RGBELoader } from 'three/examples/jsm/Addons.js';

import { useDomStore, usePortFboStore } from '@/store';

import { useGSAP } from '@gsap/react';

import gsap from 'gsap';

import vertexShaderRoundedRec from '@/shaders/rounded-rectangle/vertex';
import fragmentShaderRoundedRec from '@/shaders/rounded-rectangle/fragment';
import vertexShaderAcidBg from '@/shaders/animated-underlay-acid-fluid/vertex';
import fragmentShaderAcidBg from '@/shaders/animated-underlay-acid-fluid/fragment';
import fragmentShaderParallaxDepth from '@/shaders/animated-parallax-depth/fragment';
import vertexShaderParallaxDepth from '@/shaders/animated-parallax-depth/vertex';

import debounce from 'lodash/debounce';
import { Vector } from 'html2canvas/dist/types/render/vector';

gsap.registerPlugin(useGSAP);

// Custom hook for debounced viewport
// Custom hook for debounced viewport and size

const Banner = () => {
	const { viewport, size, camera } = useThree();

	const { torsoEl: torsoDomEl, containerEls: containerDomEls, textEls: textDomEls } = useDomStore(state => state);
	// const { portFbo } = usePortFboStore(state => state);

	const pointerRef = useRef(new Vector2(0, 0));
	const pointerCenterRef = useRef(new Vector2(0, 0));

	const textGroupRef = useRef(null);
	const textMeshRatio = 1 - viewport.factor / calcFactorCamZ(3);

	const torsoMeshRef = useRef(null);
	const torsoGroupRef = useRef(null);
	const torsoMeshRatio = 1 - viewport.factor / calcFactorCamZ(0);

	const containerGroupRef = useRef(null);
	const containerMeshRatio = 1 - viewport.factor / calcFactorCamZ(2.9);
	const containerMaterialParallaxRefs = useRef([]);
	const containerMaskedMeshesRef = useRef(new Set());

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

	const meshMetalRef = useRef(null);

	useFrame(({ scene, camera, gl, clock, pointer }) => {
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

		const psychedelicBallMesh = scene.getObjectByName('psychedelic-ball');
		const ogRoughness = psychedelicBallMesh.material.roughness;
		const ogMetalness = psychedelicBallMesh.material.metalness;
		const ogIridescence = psychedelicBallMesh.material.iridescence;

		maskBufferMap['ABOUT'].mutateScene(psychedelicBallMesh);
		gl.setRenderTarget(maskBufferMap['ABOUT'].buffer);
		gl.clear();
		gl.render(scene, camera);

		maskBufferMap['SKILL'].mutateScene(psychedelicBallMesh);
		gl.setRenderTarget(maskBufferMap['SKILL'].buffer);
		gl.clear();
		gl.render(scene, camera);

		const maskMeshesArr = [...containerMaskedMeshesRef.current];
		if (maskMeshesArr.length > 0) {
			maskMeshesArr.forEach(mesh => {
				if (mesh) {
					mesh.material.uniforms.uMask.value = maskBufferMap[mesh.name]?.buffer.texture || null;
				}
			});
		}

		materialAcidBg.current.uniforms.uBrightColor.value = new Color('#69D2B7');
		materialAcidBg.current.uniforms.uDarkColor.value = new Color('#868686');
		psychedelicBallMesh.material.roughness = ogRoughness;
		psychedelicBallMesh.material.metalness = ogMetalness;
		psychedelicBallMesh.material.iridescence = ogIridescence;
		psychedelicBallMesh.material.wireframe = false;
		psychedelicBallMesh.material.uniforms.uIsNormalColor.value = 0;

		gl.setRenderTarget(null);
		gl.clear();
	});

	const maskBufferMap = {
		ABOUT: {
			buffer: useFBO(size.width * 0.8, size.height * 0.8, {
				minFilter: LinearFilter,
				magFilter: LinearFilter,
				format: RGBAFormat,
				type: UnsignedShort4444Type,
			}),
			mutateScene: ballMesh => {
				materialAcidBg.current.uniforms.uBrightColor.value = new Color('#7B60FB');
				materialAcidBg.current.uniforms.uDarkColor.value = new Color('#FF00C7');
				ballMesh.material.roughness = 0.5;
				ballMesh.material.wireframe = true;
				ballMesh.material.uniforms.uIsNormalColor.value = 1;
			},
		},
		SKILL: {
			buffer: useFBO(size.width, size.height, {
				minFilter: LinearFilter,
				magFilter: LinearFilter,
				format: RGBAFormat,
				type: UnsignedShort4444Type,
			}),
			mutateScene: ballMesh => {
				materialAcidBg.current.uniforms.uBrightColor.value = new Color('#FF0000');
				materialAcidBg.current.uniforms.uDarkColor.value = new Color('#0500FF');
				ballMesh.material.roughness = 20;
				ballMesh.material.metalness = 0;
				ballMesh.material.iridescence = 20;
				ballMesh.material.wireframe = false;
				ballMesh.material.uniforms.uIsNormalColor.value = 1;
			},
		},
	};

	const commonMaskBuffer = useFBO(size.width * 0.8, size.height * 0.8, {
		minFilter: LinearFilter,
		magFilter: LinearFilter,
		format: RGBAFormat,
		type: UnsignedShort4444Type,
	});

	// const maskBufferMap = {
	// 	ABOUT: {
	// 		buffer
	// 	},
	// };

	useLenis(
		event => {
			updatePosition(event.scroll);
		},
		[size],
	);

	function updatePosition(offset: number) {
		if (textGroupRef.current && containerGroupRef.current) {
			const base = offset / viewport.factor;
			textGroupRef.current.position.y = base * textMeshRatio;
			containerGroupRef.current.position.y = base * containerMeshRatio;
			torsoGroupRef.current.position.y = base * torsoMeshRatio;
		}
	}

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
							fontSize={(parsedFontSize / factor) * ratio}>
							{el.textContent}
						</Text>
					);
				})}

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
						borderBottomLeftRadius: rbl,
						borderBottomRightRadius: rbr,
						borderTopLeftRadius: rtl,
						borderTopRightRadius: rtr,
					} = window.getComputedStyle(el);
					const { scrollY } = window;
					const { left, top, width, height } = el.getBoundingClientRect();
					const { parallax, anchor } = el.dataset;
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

					const vs = parallax ? vertexShaderParallaxDepth : vertexShaderRoundedRec;
					const fs = parallax ? fragmentShaderParallaxDepth : fragmentShaderRoundedRec;

					const uniforms = parallax
						? {
								uTexture: { value: previewMap[parallax] },
								uResolution: { value: new Vector2(width, height) },
								uRadii: { value: new Vector4(...radius) },
								uMouse: { value: new Vector2(0.5, 0.5) },
						  }
						: {
								uResolution: { value: new Vector2(width, height) },
								uRadii: { value: new Vector4(...radius) },
								uAnchor: { value: +!!anchor },
								uMask: { value: null },
								uMaskResolution: { value: new Vector2(size.width, size.height) },
						  };

					const materialRef = parallax ? el => (containerMaterialParallaxRefs.current[idx] = el) : null;

					return (
						<mesh
							key={idx}
							name={anchor}
							ref={el => (anchor && el ? containerMaskedMeshesRef.current.add(el) : null)}
							position={[x, y, z]}>
							<planeGeometry args={[(width / factor) * ratio, (height / factor) * ratio, 1, 1]} />
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

			<group ref={torsoGroupRef}>
				<mesh
					ref={torsoMeshRef}
					scale={[
						(torsoDomEl.offsetWidth / viewport.factor) * torsoMeshRatio + 1,
						(torsoDomEl.offsetHeight / viewport.factor) * torsoMeshRatio,
						1,
					]}
					position={[
						0,
						(viewport.height / 2) * torsoMeshRatio -
							((torsoDomEl.offsetHeight / viewport.factor) * torsoMeshRatio) / 2,
						0,
					]}
					material={materialAcidBg.current}>
					<planeGeometry args={[1, 1, 1, 1]} />
				</mesh>
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

import { extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import React, { useRef, useEffect, useMemo, useState, useCallback, memo } from 'react';
import { Color, MeshBasicMaterial, ShaderMaterial, TextureLoader, Vector2, Vector4 } from 'three';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { MeshTransmissionMaterial, RoundedBox, Text, PivotControls, useFBO, Line, useGLTF } from '@react-three/drei';

import { useDomStore, usePlatformStore, useWebGlStore } from '@/store';

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
		previewLayneChenPortfolio: null,
		previewShareYourMemories: null,
		previewLearnEnglishDictionary: null,
	});
	const containerMaskedMeshesRef = useRef(new Set());
	const containerTranslucentMaskedMeshesRef = useRef(new Set());

	const [previewLayneChenPortfolio, previewShareYourMemories, previewLearnEnglishDictionary] = useLoader(
		TextureLoader,
		[
			'/frame/project-preview-layne-chen-portfolio-2024.webp',
			'/frame/project-preview-share-your-memories.webp',
			'/frame/project-preview-learn-english-dictionary.webp',
		],
	);

	const previewMap = {
		previewLayneChenPortfolio: previewLayneChenPortfolio,
		previewShareYourMemories: previewShareYourMemories,
		previewLearnEnglishDictionary: previewLearnEnglishDictionary,
	};

	useEffect(() => {
		useWebGlStore.setState({
			containerMaskedMeshes: containerMaskedMeshesRef.current,
			containerTranslucentMaskedMeshes: containerTranslucentMaskedMeshesRef.current,
		});
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

	useFrame(({ scene, camera, gl, clock, pointer }, delta) => {
		if (materialAcidBg.current) {
			materialAcidBg.current.uniforms.uTime.value += delta;
		}

		const containerMaterialParallaxRefsKeys = Object.keys(containerMaterialParallaxRefs.current);

		const target =
			pointerRef.current.distanceTo(pointer) > 0
				? pointerRef.current.clone().sub(pointer).negate()
				: pointerCenterRef.current;

		pointerRef.current.copy(pointer);

		containerMaterialParallaxRefsKeys.forEach(key => {
			const material = containerMaterialParallaxRefs.current[key];
			const inView = ScrollTrigger.isInViewport(material.userData.el);
			containerMaterialParallaxRefs.current[key].uniforms.uIsInView.value = +!!inView;
			containerMaterialParallaxRefs.current[key].uniforms.uMouse.value.lerp(target, delta);
		});
	});

	useLenis(event => updatePosition(event.scroll), [size]);

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
				uMouse: { value: new Vector2(0, 0) },
				uAnchor: { value: 0 },
				uHeatMap: { value: 0 },
				uMaskTexture: { value: null },
				uMaskResolution: { value: new Vector2(0, 0) },
				uTranslucentMaskTexture: { value: new Vector2(0, 0) },
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
				uMouse: { value: new Vector2(0, 0) },
				uAnchor: { value: 0 },
				uHeatMap: { value: 0 },
				uMaskTexture: { value: null },
				uMaskResolution: { value: new Vector2(0, 0) },
				uTranslucentMaskTexture: { value: new Vector2(0, 0) },
				uIsInView: { value: 0 },
			},
			vertexShader: vertexShaderParallaxDepth,
			fragmentShader: fragmentShaderParallaxDepth,
			transparent: true,
			// depthWrite: false,
			// depthTest: false,
			// stencilWrite: false,
		}),
	);

	console.log('banner re rerenders');

	return (
		<>
			<group
				name='text-mesh-group'
				ref={textGroupRef}>
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
							maxWidth={(width / factor) * ratio * 1.025}
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
					const { factor, dpr } = viewport;
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

					let material;

					if (parallax) {
						material = containerMeshParallaxMaterial.current.clone();
						containerMaterialParallaxRefs.current[parallax] = material;
						material.userData = { dataset: el.dataset, el };
					} else {
						material = containerMeshMaterial.current.clone();
					}

					const dynamicDpr = usePlatformStore.getState().isMobile
						? Math.max(Math.min(window.devicePixelRatio, 2.5), 2)
						: 1.1;
					// const dynamicDpr = useWebGlStore.getState().dynamicDpr;

					material.uniforms.uTexture.value = previewMap[parallax] || null;
					material.uniforms.uResolution.value.set(width, height);
					material.uniforms.uRadii.value.set(...radius);
					material.uniforms.uMouse.value.set(0, 0);
					material.uniforms.uAnchor.value = +!!anchor;
					material.uniforms.uHeatMap.value = 0;
					material.uniforms.uMaskTexture.value = null;
					material.uniforms.uMaskResolution.value.set(size.width * dynamicDpr, size.height * dynamicDpr);
					material.uniforms.uTranslucentMaskTexture.value =
						useWebGlStore.getState().shareTranslucentBuffer?.texture || null;

					return (
						<mesh
							key={idx}
							name={anchor}
							ref={el => {
								if (el) {
									if (!anchor && !parallax) {
										containerTranslucentMaskedMeshesRef.current.add(el);
									} else if (anchor) {
										containerMaskedMeshesRef.current.add(el);
									}
								}
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

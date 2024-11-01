import { useRef, useEffect } from 'react';

// three
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { FrontSide, PlaneGeometry, ShaderMaterial, TextureLoader, Vector2, Vector4 } from 'three';

// lenis
import { useLenis } from '@studio-freight/react-lenis';

// store
import { useCursorStore, useDomStore, useNavStore, usePlatformStore, useWebGlStore } from '@/store';

// shader
import vertexShaderRoundedRec from '@/shaders/rounded-rectangle/vertex';
import fragmentShaderRoundedRec from '@/shaders/rounded-rectangle/fragment';
import fragmentShaderParallaxDepth from '@/shaders/animated-parallax-depth/fragment';
import vertexShaderParallaxDepth from '@/shaders/animated-parallax-depth/vertex';

// util
import { getScaleMultiplier } from '@/utils';

// constant
import { MESH_DISTANCE } from '@/config/constants';

// gsap
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Containers() {
	const [viewport, size, camera] = useThree(state => [state.viewport, state.size, state.camera]);
	const pointerRef = useRef(new Vector2(0, 0));
	const pointerCenterRef = useRef(new Vector2(0, 0));
	const planeGeoRef = useRef(new PlaneGeometry(1, 1, 1, 1));
	const containerGroupRef = useRef(null);
	const containerMeshRatio = getScaleMultiplier(MESH_DISTANCE.CONTAINER, viewport, camera, size);
	const containerParallaxMeshesRefs = useRef(new Set());
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
			side: FrontSide,
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
				uShouldSample: { value: 0 },
			},
			vertexShader: vertexShaderParallaxDepth,
			fragmentShader: fragmentShaderParallaxDepth,
			transparent: true,
			side: FrontSide,
		}),
	);

	function updatePosition(offset: number) {
		if (!containerGroupRef.current) return;
		const base = offset / viewport.factor;
		containerGroupRef.current.position.y = base * containerMeshRatio;
	}

	useLenis(event => updatePosition(event.scroll), [size]);

	useEffect(() => {
		useWebGlStore.setState({
			containerMaskedMeshes: containerMaskedMeshesRef.current,
			containerTranslucentMaskedMeshes: containerTranslucentMaskedMeshesRef.current,
		});
	}, []);

	useFrame(({}, delta) => {
		if (!useWebGlStore.getState().isEntryAnimationDone) return;

		const ndcPosition = useCursorStore.getState().ndcPosition;
		const isNavOpen = useNavStore.getState().isOpen;

		const target =
			pointerRef.current.distanceTo(ndcPosition) > 0
				? pointerRef.current.clone().sub(ndcPosition).negate()
				: pointerCenterRef.current;

		pointerRef.current.copy(ndcPosition);

		containerParallaxMeshesRefs.current.forEach(mesh => {
			const inView = ScrollTrigger.isInViewport(mesh.userData.el);
			mesh.material.uniforms.uShouldSample.value = +!!(inView && !isNavOpen);
			mesh.material.uniforms.uMouse.value.lerp(target, delta * 2);
		});
	});

	return (
		<group
			name='container-mesh-group'
			ref={containerGroupRef}>
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
				let z = MESH_DISTANCE.CONTAINER;

				const radius = [parseFloat(rtr), parseFloat(rbr), parseFloat(rtl), parseFloat(rbl)];

				let material;
				let geometry = planeGeoRef.current.clone();

				if (parallax) {
					material = containerMeshParallaxMaterial.current.clone();
				} else {
					material = containerMeshMaterial.current.clone();
				}

				const dynamicDpr = usePlatformStore.getState().isMobile
					? Math.max(Math.min(window.devicePixelRatio, 2.5), 2)
					: window.devicePixelRatio > 1
					? 1
					: 1.2;

				material.uniforms.uTexture.value = previewMap[parallax] || null;
				material.uniforms.uResolution.value.set(width, height);
				material.uniforms.uRadii.value.set(...radius);
				material.uniforms.uMouse.value.set(0, 0);
				material.uniforms.uAnchor.value = +!!anchor;
				material.uniforms.uHeatMap.value = +!!anchorMirror;
				material.uniforms.uMaskResolution.value.set(size.width * dynamicDpr, size.height * dynamicDpr);
				material.uniforms.uTranslucentMaskTexture.value =
					useWebGlStore.getState().shareTranslucentBuffer?.texture;
				material.uniforms.uMaskTexture.value = useWebGlStore.getState().maskBufferMap?.[anchor]?.buffer.texture;

				return (
					<mesh
						key={idx}
						ref={el => {
							if (!el) return;

							if (!anchor && !parallax) {
								containerTranslucentMaskedMeshesRef.current.add(el);
							} else if (parallax) {
								containerParallaxMeshesRefs.current.add(el);
							} else if (anchor) {
								containerMaskedMeshesRef.current.add(el);
							}
						}}
						position={[x, y, z]}
						userData={{ dataset: el.dataset, el }}
						material={material}
						geometry={geometry}
						scale={[(width / factor) * ratio, (height / factor) * ratio, 1]}></mesh>
				);
			})}
		</group>
	);
}

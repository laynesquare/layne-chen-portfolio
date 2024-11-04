import { useEffect, useMemo, useRef } from 'react';

// three
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { meshBounds } from '@react-three/drei';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { lerp } from 'three/src/math/MathUtils.js';
import { Vector3, TextureLoader, Color, MeshPhysicalMaterial, IcosahedronGeometry, FrontSide, NoBlending } from 'three';
import { useControls } from 'leva';

// component
import { BallMask } from '@/components';

// lenis
import { useLenis } from '@studio-freight/react-lenis';

// shader
import vertexShader from '@/shaders/animated-displaced-sphere/vertex';
import fragmentShader from '@/shaders/animated-displaced-sphere/fragment';

// store
import { useDomStore, usePlatformStore, useWebGlStore } from '@/store';

// util
import { getScaleMultiplier } from '@/utils';

// constant
import { MESH_DISTANCE, MESH_NAME, BALL_INIT_MATERIAL, BALL_INIT_UNIFORMS } from '@/config/constants';

// gsap
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Ball() {
	const getThree = useThree(state => state.get);
	const ballMeshRatio = getScaleMultiplier(1, getThree().viewport, getThree().camera, getThree().size);

	const ballRef = useRef();
	const ballCloneRef = useRef();
	const ballMaskRef = useRef(null);
	const ballClonedMaskRef = useRef(null);

	const ballInitPos = useMemo(() => new Vector3(5, 5, MESH_DISTANCE.BALL), []);
	const ballCenterPos = useMemo(() => new Vector3(0, 0, MESH_DISTANCE.BALL), []);
	const ballDynamicPos = useMemo(() => new Vector3(), []);
	const ballClonedDynamicPos = useMemo(() => new Vector3(), []);
	const ballDisplacementTexture = useLoader(TextureLoader, '/scene/textures/ball-displacement.webp');

	const ballGeometry = useMemo(() => {
		const geometry = mergeVertices(new IcosahedronGeometry(0.5, 64));
		geometry.computeTangents();
		return geometry;
	}, []);

	const scrollOffsetRef = useRef(0);

	const uniforms = useMemo(
		() => ({
			uColor: { value: new Color(0xe6ff00) },
			uTime: { value: BALL_INIT_UNIFORMS.uTime.value },
			uSpeed: { value: BALL_INIT_UNIFORMS.uSpeed.value },
			uNoiseStrength: { value: BALL_INIT_UNIFORMS.uNoiseStrength.value },
			uDisplacementStrength: { value: BALL_INIT_UNIFORMS.uDisplacementStrength.value },
			uFractAmount: { value: BALL_INIT_UNIFORMS.uFractAmount.value },
			uIsNormalColor: { value: BALL_INIT_UNIFORMS.uIsNormalColor.value },
		}),
		[],
	);

	const ballMaterial = useMemo(
		() =>
			new CustomShaderMaterial({
				baseMaterial: new MeshPhysicalMaterial(),
				vertexShader: vertexShader,
				fragmentShader: fragmentShader,
				uniforms: uniforms,
				displacementMap: ballDisplacementTexture,
				...BALL_INIT_MATERIAL,
				iridescenceIOR: 1.3,
			}),
		[ballDisplacementTexture, uniforms],
	);

	function ballRotationUpdate(elapsedTime) {
		const isBallPress = useWebGlStore.getState().isBallPress;
		const speed = isBallPress ? 5 : 1.2;
		const targetRotationX = Math.cos(elapsedTime) * speed;
		const targetRotationY = Math.sin(elapsedTime) * speed;
		const targetRotationZ = Math.sin(elapsedTime) * speed;

		ballRef.current.rotation.x = lerp(ballRef.current.rotation.x, targetRotationX, 0.1);
		ballRef.current.rotation.y = lerp(ballRef.current.rotation.y, targetRotationY, 0.1);
		ballRef.current.rotation.z = lerp(ballRef.current.rotation.z, targetRotationZ, 0.1);
	}

	function updatePosByScroll() {
		const els = [...useDomStore.getState().anchorEls];
		const inViewEl = els.findLast(el => ScrollTrigger.isInViewport(el, 0.3));
		const { viewport } = getThree();

		if (!inViewEl) return;

		const { anchor, anchorMirror } = inViewEl.dataset;
		const { factor } = viewport;
		const baseX = (-viewport.width / 2) * ballMeshRatio;
		const baseY = (viewport.height / 2) * ballMeshRatio;

		const getElementCenter = el => {
			const { left, top, width, height } = el.getBoundingClientRect();
			const shiftHalfW = width / 2;
			const shiftHalfH = height / 2;
			const x = baseX + ((left + shiftHalfW) / factor) * ballMeshRatio;
			const y = baseY - ((top + shiftHalfH) / factor) * ballMeshRatio;
			return { x, y };
		};

		const { x: targetX, y: targetY } = getElementCenter(inViewEl);
		const targetBallPos = ballDynamicPos.set(targetX, targetY, 1);
		ballRef.current.position.lerp(targetBallPos, 0.035);
		ballMaskRef.current.position.copy(ballRef.current.position);

		if (anchorMirror) {
			const inViewMirrorEl = els.find(el => el.dataset['anchor'] === anchor && el !== inViewEl);
			const { x: mirrorX, y: mirrorY } = getElementCenter(inViewMirrorEl);
			const targetBallClonePos = ballClonedDynamicPos.set(mirrorX, mirrorY, 1);
			ballCloneRef.current?.position.lerp(targetBallClonePos, 0.035);
			ballClonedMaskRef.current?.position.copy(ballCloneRef.current?.position);
			ballCloneRef.current.visible = true;
		} else {
			ballCloneRef.current?.position.lerp(targetBallPos, 0.035);
			ballClonedMaskRef.current?.position.copy(ballCloneRef.current?.position);
		}
	}

	function ballMaterialUpdate(delta: number) {
		ballRef.current.material.uniforms.uTime.value += delta;
	}

	useLenis(event => {
		scrollOffsetRef.current = event.scroll;
		updatePosByScroll();
	});

	useEffect(() => {
		const { scene } = getThree();
		ballCloneRef.current = ballRef.current.clone();
		ballCloneRef.current.name = MESH_NAME.CLONED_BALL;
		ballCloneRef.current.visible = false;
		scene.add(ballCloneRef.current);
	}, [getThree]);

	useFrame(({ clock }, delta) => {
		if (!useWebGlStore.getState().isEntryAnimationDone) return;
		const inViewEl = [...useDomStore.getState().anchorEls].findLast(el => ScrollTrigger.isInViewport(el, 0.3));

		if (!inViewEl && ballCloneRef.current) {
			const epsilon = ballRef.current.position.distanceTo(ballCenterPos) > 0.005;
			if (epsilon) {
				ballRef.current.position.lerp(ballCenterPos, 0.035);
				ballMaskRef.current.position.copy(ballRef.current.position);
				ballCloneRef.current?.position.copy(ballRef.current.position);
				ballClonedMaskRef.current?.position.copy(ballRef.current.position);
				ballCloneRef.current.visible = false;
			}
		}

		ballCloneRef.current?.rotation.copy(ballRef.current.rotation);

		const isMobile = usePlatformStore.getState().isMobile;

		ballMaskRef.current?.scale.set(...(isMobile ? [0.72, 0.72, 0.72] : [1.2, 1.2, 1.2]));
		ballClonedMaskRef.current?.scale.copy(ballMaskRef.current?.scale);

		ballMaterialUpdate(delta);
		ballRotationUpdate(clock.elapsedTime);
	});

	console.log('ball renders');

	return (
		<group>
			<mesh
				name={MESH_NAME.BALL}
				raycast={meshBounds}
				ref={ballRef}
				scale={1.1}
				geometry={ballGeometry}
				position={ballInitPos}
				material={ballMaterial}
				frustumCulled={false}></mesh>

			<BallMask
				ballRef={ballRef}
				ballMaskRef={ballMaskRef}
				ballClonedMaskRef={ballClonedMaskRef}
			/>
		</group>
	);
}

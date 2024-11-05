import { useEffect, useMemo, useRef } from 'react';

// three
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { meshBounds } from '@react-three/drei';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { lerp } from 'three/src/math/MathUtils.js';
import { Vector3, TextureLoader, Color, MeshPhysicalMaterial, IcosahedronGeometry } from 'three';
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

// type
import type { Mesh, BufferGeometry, MeshBasicMaterial } from 'three';

// gsap
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(useGSAP, ScrollTrigger);

type BallMesh = Mesh<BufferGeometry, CustomShaderMaterial & MeshPhysicalMaterial>;
type BallMaskMesh = Mesh<BufferGeometry, MeshBasicMaterial>;

export default function Ball() {
	const getThree = useThree(state => state.get);
	const ballMeshRatio = getScaleMultiplier(1, getThree().viewport, getThree().camera, getThree().size);

	const ballRef = useRef<BallMesh>(null);
	const ballCloneRef = useRef<BallMesh | null>(null);
	const ballMaskRef = useRef<BallMaskMesh>(null);
	const ballMaskCloneRef = useRef<BallMaskMesh>(null);

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

	function ballRotationUpdate(elapsedTime: number) {
		const isBallPress = useWebGlStore.getState().isBallPress;
		const speed = isBallPress ? 5 : 1.2;
		const targetRotationX = Math.cos(elapsedTime) * speed;
		const targetRotationY = Math.sin(elapsedTime) * speed;
		const targetRotationZ = Math.sin(elapsedTime) * speed;

		const ball = ballRef.current;

		if (ball) {
			ball.rotation.x = lerp(ball.rotation.x, targetRotationX, 0.1);
			ball.rotation.y = lerp(ball.rotation.y, targetRotationY, 0.1);
			ball.rotation.z = lerp(ball.rotation.z, targetRotationZ, 0.1);
		}
	}

	function getElementCenter(el: HTMLElement, factor: number, baseX: number, baseY: number) {
		const { left, top, width, height } = el.getBoundingClientRect();
		const shiftHalfW = width / 2;
		const shiftHalfH = height / 2;
		const x = baseX + ((left + shiftHalfW) / factor) * ballMeshRatio;
		const y = baseY - ((top + shiftHalfH) / factor) * ballMeshRatio;
		return { x, y };
	}

	function updatePosByScroll() {
		const anchorEls = [...useDomStore.getState().anchorEls];
		const inViewEl = anchorEls.findLast(el => ScrollTrigger.isInViewport(el, 0.3));

		const ball = ballRef.current;
		const ballClone = ballCloneRef.current;
		const ballMask = ballMaskRef.current;
		const ballMaskClone = ballMaskCloneRef.current;

		if (!inViewEl || !ball || !ballClone || !ballMask || !ballMaskClone) return;

		const { viewport } = getThree();
		const { factor } = viewport;
		const { anchor, anchorMirror } = inViewEl.dataset;
		const baseX = (-viewport.width / 2) * ballMeshRatio;
		const baseY = (viewport.height / 2) * ballMeshRatio;

		const { x: targetX, y: targetY } = getElementCenter(inViewEl, factor, baseX, baseY);
		const targetBallPos = ballDynamicPos.set(targetX, targetY, 1);
		ball.position.lerp(targetBallPos, 0.035);
		ballMask.position.copy(ball.position);

		if (anchorMirror) {
			const inViewMirrorEl = anchorEls.find(el => el.dataset['anchor'] === anchor && el !== inViewEl);
			const { x: mirrorX, y: mirrorY } = inViewMirrorEl
				? getElementCenter(inViewMirrorEl, factor, baseX, baseY)
				: { x: targetX, y: targetY };

			const targetBallClonePos = ballClonedDynamicPos.set(mirrorX, mirrorY, 1);
			ballClone.position.lerp(targetBallClonePos, 0.035);
			ballMaskClone.position.copy(ballClone.position);
			ballClone.visible = true;
		} else {
			ballClone.position.lerp(targetBallPos, 0.035);
			ballMaskClone.position.copy(ballClone.position);
		}
	}

	useLenis(event => {
		scrollOffsetRef.current = event.scroll;
		updatePosByScroll();
	});

	useEffect(() => {
		const { scene } = getThree();
		if (ballRef.current) {
			ballCloneRef.current = ballRef.current.clone();
			ballCloneRef.current.name = MESH_NAME.CLONED_BALL;
			ballCloneRef.current.visible = false;
			scene.add(ballCloneRef.current);
		}
	}, [getThree]);

	useFrame(({ clock }, delta) => {
		const ball = ballRef.current;
		const ballClone = ballCloneRef.current;
		const ballMask = ballMaskRef.current;
		const ballMaskClone = ballMaskCloneRef.current;

		if (
			//
			!useWebGlStore.getState().isEntryAnimationDone ||
			!ball ||
			!ballClone ||
			!ballMask ||
			!ballMaskClone
		)
			return;

		const inViewEl = [...useDomStore.getState().anchorEls].findLast(el => ScrollTrigger.isInViewport(el, 0.3));

		if (!inViewEl) {
			const epsilon = ballRef.current.position.distanceTo(ballCenterPos) > 0.005;
			if (epsilon) {
				ball.position.lerp(ballCenterPos, 0.035);
				ballMask.position.copy(ball.position);
				ballClone.position.copy(ball.position);
				ballMaskClone.position.copy(ball.position);
				ballClone.visible = false;
			}
		}

		const isMobile = usePlatformStore.getState().isMobile;
		const scale: [number, number, number] = isMobile ? [0.72, 0.72, 0.72] : [1.2, 1.2, 1.2];
		ball.material.uniforms.uTime.value += delta;
		ballClone.rotation.copy(ball.rotation);
		ballMask?.scale.set(...scale);
		ballMaskClone.scale.copy(ballMask.scale);

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
				ballMaskCloneRef={ballMaskCloneRef}
			/>
		</group>
	);
}

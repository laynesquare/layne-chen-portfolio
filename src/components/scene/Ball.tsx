import { useEffect, useMemo, useRef, useState } from 'react';

// three
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { meshBounds } from '@react-three/drei';
import { lerp } from 'three/src/math/MathUtils.js';
import {
	Vector3,
	TextureLoader,
	Color,
	MeshPhysicalMaterial,
	IcosahedronGeometry,
	BufferAttribute,
	Float32BufferAttribute,
	Uint16BufferAttribute,
} from 'three';

// lenis
import { useLenis } from '@studio-freight/react-lenis';

// shader
import vertexShader from '@/shaders/animated-displaced-sphere/vertex';
import fragmentShader from '@/shaders/animated-displaced-sphere/fragment';

// store
import { useDomStore, useWebGlStore } from '@/store';

// util
import { getScaleMultiplier } from '@/utils';

// constant
import { MESH_DISTANCE, MESH_NAME, BALL_INIT_MATERIAL, BALL_INIT_UNIFORMS } from '@/config/constants';

// type
import type { BallMesh } from '@/types';

// gsap
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Ball() {
	const getThree = useThree(state => state.get);
	const workerRef = useRef<Worker>();

	const ballMeshRatio = getScaleMultiplier(1, getThree().viewport, getThree().camera, getThree().size);
	const ballRef = useRef<BallMesh | null>(null);
	const ballClonedRef = useRef<BallMesh | null>(null);

	const ballInitPos = useMemo(() => new Vector3(5, 5, MESH_DISTANCE.BALL), []);
	const ballCenterPos = useMemo(() => new Vector3(0, 0, MESH_DISTANCE.BALL), []);
	const ballDynamicPos = useMemo(() => new Vector3(), []);
	const ballClonedDynamicPos = useMemo(() => new Vector3(), []);
	const ballDisplacementTexture = useLoader(TextureLoader, '/scene/textures/ball-displacement.webp');

	const [ballGeo, setBallGeo] = useState<IcosahedronGeometry | null>(null);

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

	const ballMaterial = useMemo(() => {
		const material = new CustomShaderMaterial({
			baseMaterial: MeshPhysicalMaterial,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			...BALL_INIT_MATERIAL,
			uniforms: uniforms,
			displacementMap: ballDisplacementTexture,
		});

		/*
		 * For some reason, the 'ior' property is not defined in the type definition of the material,
		 * but it is present in the material object at runtime and the value is around 1.45.
		 * Manually cast the material as a combination of CustomShaderMaterial and MeshPhysicalMaterial.
		 */
		(material as CustomShaderMaterial & MeshPhysicalMaterial).ior = BALL_INIT_MATERIAL.ior;

		return material;
	}, [ballDisplacementTexture, uniforms]);

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
		const ballClone = ballClonedRef.current;

		if (!inViewEl || !ball || !ballClone) return;

		const { viewport } = getThree();
		const { factor } = viewport;
		const { anchor, anchorMirror } = inViewEl.dataset;
		const baseX = (-viewport.width / 2) * ballMeshRatio;
		const baseY = (viewport.height / 2) * ballMeshRatio;

		const { x: targetX, y: targetY } = getElementCenter(inViewEl, factor, baseX, baseY);
		const targetBallPos = ballDynamicPos.set(targetX, targetY, 1);
		ball.position.lerp(targetBallPos, 0.035);

		if (anchorMirror) {
			const inViewMirrorEl = anchorEls.find(el => el.dataset['anchor'] === anchor && el !== inViewEl);
			const { x: mirrorX, y: mirrorY } = inViewMirrorEl
				? getElementCenter(inViewMirrorEl, factor, baseX, baseY)
				: { x: targetX, y: targetY };

			const targetBallClonePos = ballClonedDynamicPos.set(mirrorX, mirrorY, 1);
			ballClone.position.lerp(targetBallClonePos, 0.035);
			ballClone.visible = true;
		} else {
			ballClone.position.lerp(targetBallPos, 0.035);
		}
	}

	useLenis(event => {
		scrollOffsetRef.current = event.scroll;
		updatePosByScroll();
	});

	useEffect(() => {
		workerRef.current = new Worker(new URL('@/workers/offload.ts', import.meta.url));

		// Offload mergeVertices/computeTangents to web worker.
		workerRef.current?.postMessage({ radius: 0.5, detail: 64 });

		workerRef.current.onmessage = (event: MessageEvent<IcosahedronGeometry>) => {
			const geometry = event.data;

			/*
			 * Geometry's prototype and methods are lost during serialization.
			 * Manually patch up the prototypes and methods.
			 */
			Object.setPrototypeOf(geometry, IcosahedronGeometry.prototype);
			Object.setPrototypeOf(geometry.attributes.normal, Float32BufferAttribute.prototype);
			Object.setPrototypeOf(geometry.attributes.position, Float32BufferAttribute.prototype);
			Object.setPrototypeOf(geometry.attributes.tangent, BufferAttribute.prototype);
			Object.setPrototypeOf(geometry.attributes.uv, Float32BufferAttribute.prototype);
			Object.setPrototypeOf(geometry.index, Uint16BufferAttribute.prototype);
			setBallGeo(geometry);
		};

		return () => workerRef.current?.terminate();
	}, []);

	useEffect(() => {
		const { scene } = getThree();
		if (ballRef.current) {
			ballClonedRef.current = ballRef.current.clone();
			ballClonedRef.current.name = MESH_NAME.CLONED_BALL;
			ballClonedRef.current.visible = false;
			scene.add(ballClonedRef.current);
		}
	}, [getThree, ballGeo]);

	useFrame(({ clock }, delta) => {
		const ball = ballRef.current;
		const ballClone = ballClonedRef.current;
		const isEntryAnimationDone = useWebGlStore.getState().isEntryAnimationDone;

		if (!isEntryAnimationDone || !ball || !ballClone) return;

		const inViewEl = [...useDomStore.getState().anchorEls].findLast(el => ScrollTrigger.isInViewport(el, 0.3));

		if (!inViewEl) {
			const epsilon = ball.position.distanceTo(ballCenterPos) > 0.005;
			if (epsilon) {
				ball.position.lerp(ballCenterPos, 0.035);
				ballClone.position.copy(ball.position);
				ballClone.visible = false;
			}
		}

		ball.material.uniforms.uTime.value += delta;
		ballClone.rotation.copy(ball.rotation);

		ballRotationUpdate(clock.elapsedTime);
	});

	// console.log('ball renders');

	if (!ballGeo) return null;

	return (
		<group>
			<mesh
				name={MESH_NAME.BALL}
				raycast={meshBounds}
				ref={(el: BallMesh) => {
					ballRef.current = el;
					useWebGlStore.setState({ isBallReady: true });
				}}
				scale={1.1}
				geometry={ballGeo}
				position={ballInitPos}
				material={ballMaterial}
				frustumCulled={false}></mesh>
		</group>
	);
}

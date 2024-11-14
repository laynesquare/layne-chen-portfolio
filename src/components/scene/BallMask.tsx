import { useEffect, useMemo, useRef } from 'react';

// three
import { meshBounds } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { FrontSide, MeshBasicMaterial, CircleGeometry } from 'three';

// store
import { useWebGlStore } from '@/store';

// constant
import { BALL_INIT_MATERIAL, BALL_INIT_UNIFORMS, MESH_NAME } from '@/config/constants';

// type
import type { Mesh, BufferGeometry, MeshPhysicalMaterial } from 'three';
import type CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import type { ThreeEvent } from '@react-three/fiber';

// gsap
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type BallMesh = Mesh<BufferGeometry, CustomShaderMaterial & MeshPhysicalMaterial>;
type BallMaskMesh = Mesh<BufferGeometry, MeshBasicMaterial>;

export default function BallMask() {
	const isBallPress = useWebGlStore(state => state.isBallPress);
	const ballRef = useRef<BallMesh | undefined>();
	const ballClonedRef = useRef<BallMesh | undefined>();

	const ballMaskRef = useRef<BallMaskMesh>(null);
	const ballMaskClonedRef = useRef<BallMaskMesh>(null);

	const ballMaskGeo = useMemo(() => new CircleGeometry(1, 8), []);
	const ballMaskMaterial = useMemo(
		() =>
			new MeshBasicMaterial({
				visible: true,
				depthTest: false,
				depthWrite: false,
				transparent: true,
				opacity: 0,
				side: FrontSide,
			}),
		[],
	);

	useFrame(({ scene }) => {
		ballRef.current = scene.getObjectByName(MESH_NAME.BALL) as BallMesh | undefined;
		ballClonedRef.current = scene.getObjectByName(MESH_NAME.CLONED_BALL) as BallMesh | undefined;

		const ball = ballRef.current;
		const ballCloned = ballClonedRef.current;
		const ballMask = ballMaskRef.current;
		const ballClonedMask = ballClonedRef.current;

		if (!ball || !ballCloned || !ballMask || !ballClonedMask) return;

		ballMask.position.copy(ball.position);
		ballClonedMask.position.copy(ballCloned.position);

		ballMask.scale.copy(ball.scale);
		ballClonedMask.scale.copy(ball.scale);
	});

	useGSAP(
		() => {
			if (ballRef.current) {
				if (isBallPress) {
					gsap.to(ballRef.current.material.uniforms.uDisplacementStrength, {
						value: 1.5,
						duration: 0.5,
						ease: 'bounce.out',
					});
					gsap.to(ballRef.current.material.uniforms.uNoiseStrength, {
						value: 1,
						duration: 2,
						ease: 'bounce.out',
					});
					gsap.to(ballRef.current.material, {
						iridescence: 1,
						metalness: 0.6,
						ior: 0.4,
						roughness: 1,
						clearcoat: 0,
						duration: 2,
						ease: 'bounce.out',
					});
				} else {
					gsap.to(ballRef.current.material.uniforms.uDisplacementStrength, {
						value: BALL_INIT_UNIFORMS.uDisplacementStrength.value,
						duration: 0.5,
						ease: 'bounce.in',
					});
					gsap.to(ballRef.current.material.uniforms.uNoiseStrength, {
						value: BALL_INIT_UNIFORMS.uNoiseStrength.value,
						duration: 2,
						ease: 'bounce.in',
					});
					gsap.to(ballRef.current.material, {
						iridescence: BALL_INIT_MATERIAL.iridescence,
						metalness: BALL_INIT_MATERIAL.metalness,
						roughness: BALL_INIT_MATERIAL.roughness,
						clearcoat: BALL_INIT_MATERIAL.clearcoat,
						ior: BALL_INIT_MATERIAL.ior,
						duration: 2,
						ease: 'bounce.in',
					});
				}
			}
		},
		{ dependencies: [isBallPress] },
	);

	function handlePointerDown(e: ThreeEvent<PointerEvent>) {
		e.stopPropagation();
		useWebGlStore.setState({ isBallPress: true });
	}

	function handlePointerUp(e: ThreeEvent<PointerEvent>) {
		e.stopPropagation();
		useWebGlStore.setState({ isBallPress: false });
	}

	function handlePointerOver(e: ThreeEvent<PointerEvent>) {
		e.stopPropagation();
		document.body.style.cursor = 'pointer';
	}

	function handlePointerOut(e: ThreeEvent<PointerEvent>) {
		e.stopPropagation();
		useWebGlStore.setState({ isBallPress: false });
		document.body.style.cursor = 'auto';
	}

	// console.log('mask ball renders');

	return (
		<>
			<mesh
				name={MESH_NAME.BALL_MASK}
				raycast={meshBounds}
				ref={ballMaskRef}
				position={[0, 0, -1]}
				material={ballMaskMaterial}
				onPointerDown={e => handlePointerDown(e)}
				onPointerUp={e => handlePointerUp(e)}
				onPointerOver={e => handlePointerOver(e)}
				onPointerOut={e => handlePointerOut(e)}
				scale={1.2}
				geometry={ballMaskGeo}></mesh>
			<mesh
				name={MESH_NAME.BALL_MASK_CLONED}
				raycast={meshBounds}
				ref={ballMaskClonedRef}
				material={ballMaskMaterial}
				position={[0, 0, -1]}
				onPointerDown={e => handlePointerDown(e)}
				onPointerUp={e => handlePointerUp(e)}
				onPointerOver={e => handlePointerOver(e)}
				onPointerOut={e => handlePointerOut(e)}
				scale={1.2}
				geometry={ballMaskGeo}></mesh>
		</>
	);
}

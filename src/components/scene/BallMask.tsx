import { useMemo, useRef } from 'react';

// three
import { meshBounds } from '@react-three/drei';
import { FrontSide, MeshBasicMaterial, CircleGeometry } from 'three';

// store
import { useWebGlStore } from '@/store';

// constant
import { BALL_INIT_MATERIAL, BALL_INIT_UNIFORMS } from '@/config/constants';

// gsap
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function BallMask({ ballRef, ballMaskRef, ballClonedMaskRef }) {
	const isBallPress = useWebGlStore(state => state.isBallPress);
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

	useGSAP(
		() => {
			if (ballRef.current && ballRef.current.material) {
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
		{ dependencies: [isBallPress], scope: ballRef },
	);

	function handlePointerDown(e) {
		e.stopPropagation();
		useWebGlStore.setState({ isBallPress: true });
	}

	function handlePointerUp(e) {
		e.stopPropagation();
		useWebGlStore.setState({ isBallPress: false });
	}

	function handlePointerOver(e) {
		e.stopPropagation();
		document.body.style.cursor = 'pointer';
	}

	function handlePointerOut(e) {
		e.stopPropagation();
		useWebGlStore.setState({ isBallPress: false });
		document.body.style.cursor = 'auto';
	}

	console.log('mask ball renders');

	return (
		<>
			<mesh
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
				raycast={meshBounds}
				ref={ballClonedMaskRef}
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

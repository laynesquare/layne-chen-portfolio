import { useMemo, useRef } from 'react';

// three
import { meshBounds } from '@react-three/drei';
import { FrontSide, MeshBasicMaterial, CircleGeometry } from 'three';

// store
import { useWebGlStore } from '@/store';

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
						value: 1,
						duration: 0.5,
						ease: 'bounce.in',
					});
					gsap.to(ballRef.current.material.uniforms.uNoiseStrength, {
						value: 2.5,
						duration: 2,
						ease: 'bounce.in',
					});
					gsap.to(ballRef.current.material, {
						iridescence: 0.1,
						ior: 0,
						metalness: 0.5,
						roughness: 0.1,
						clearcoat: 1.0,
						duration: 2,
						ease: 'bounce.in',
					});
				}
			}
		},
		{ dependencies: [isBallPress], scope: ballRef },
	);

	return (
		<>
			<mesh
				raycast={meshBounds}
				ref={ballMaskRef}
				position={[0, 0, -1]}
				material={ballMaskMaterial}
				onPointerDown={e => {
					e.stopPropagation();
					useWebGlStore.setState({ isBallPress: true });
				}}
				onPointerUp={e => {
					e.stopPropagation();
					useWebGlStore.setState({ isBallPress: false });
				}}
				onPointerOver={e => {
					e.stopPropagation();
					document.body.style.cursor = 'pointer';
				}}
				onPointerOut={e => {
					e.stopPropagation();
					useWebGlStore.setState({ isBallPress: false });
					document.body.style.cursor = 'auto';
				}}
				scale={1.2}
				geometry={ballMaskGeo}></mesh>
			<mesh
				raycast={meshBounds}
				ref={ballClonedMaskRef}
				material={ballMaskMaterial}
				position={[0, 0, -1]}
				onPointerDown={e => {
					e.stopPropagation();
					useWebGlStore.setState({ isBallPress: true });
				}}
				onPointerUp={e => {
					e.stopPropagation();
					useWebGlStore.setState({ isBallPress: false });
				}}
				onPointerOver={e => {
					e.stopPropagation();
					document.body.style.cursor = 'pointer';
				}}
				onPointerOut={e => {
					e.stopPropagation();
					useWebGlStore.setState({ isBallPress: false });
					document.body.style.cursor = 'auto';
				}}
				scale={1.2}
				geometry={ballMaskGeo}></mesh>
		</>
	);
}

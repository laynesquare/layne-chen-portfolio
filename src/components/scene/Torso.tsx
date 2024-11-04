import { useMemo, useRef } from 'react';

// three
import { useFrame, useThree } from '@react-three/fiber';
import { Color, FrontSide, PlaneGeometry, ShaderMaterial } from 'three';

// lenis
import { useLenis } from '@studio-freight/react-lenis';

// store
import { useDomStore, useWebGlStore } from '@/store';

// shader
import vertexShaderAcidBg from '@/shaders/animated-underlay-acid-fluid/vertex';
import fragmentShaderAcidBg from '@/shaders/animated-underlay-acid-fluid/fragment';

// util
import { getScaleMultiplier } from '@/utils';

// constant
import { MESH_DISTANCE, MESH_NAME } from '@/config/constants';

export default function Torso() {
	const [viewport, size, camera] = useThree(state => [state.viewport, state.size, state.camera]);
	const { factor, height } = viewport;
	const { offsetWidth, offsetHeight } = useDomStore.getState().torsoEl;

	const planeGeo = useMemo(() => new PlaneGeometry(1, 1, 1, 1), []);
	const torsoMeshRef = useRef(null);
	const torsoGroupRef = useRef(null);
	const torsoMeshRatio = getScaleMultiplier(MESH_DISTANCE.TORSO, viewport, camera, size);

	const torsoScale = [(offsetWidth / factor) * torsoMeshRatio, (offsetHeight / factor) * torsoMeshRatio, 1];
	const torsoPos = [
		0,
		(height / 2) * torsoMeshRatio - ((offsetHeight / factor) * torsoMeshRatio) / 2,
		MESH_DISTANCE.TORSO,
	];

	const materialAcidBg = useMemo(
		() =>
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
				side: FrontSide,
			}),
		[],
	);

	useLenis(
		event => {
			if (!torsoGroupRef.current) return;
			const offset = (event.scroll / factor) * torsoMeshRatio;
			torsoGroupRef.current.position.y = offset;
		},
		[size],
	);

	useFrame(({}, delta) => {
		if (!useWebGlStore.getState().isEntryAnimationDone || !materialAcidBg.current) return;
		materialAcidBg.current.uniforms.uTime.value += delta;
	});

	console.log('torso renders');

	return (
		<group ref={torsoGroupRef}>
			<mesh
				name={MESH_NAME.TORSO}
				ref={torsoMeshRef}
				scale={torsoScale}
				position={torsoPos}
				material={materialAcidBg}
				geometry={planeGeo.clone()}></mesh>
		</group>
	);
}

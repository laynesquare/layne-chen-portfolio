import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react';

// three
import { useFBO } from '@react-three/drei';
import { createPortal, useFrame, useThree, useLoader } from '@react-three/fiber';

import {
	Scene,
	TextureLoader,
	MeshBasicMaterial,
	Vector3,
	LinearFilter,
	RGBAFormat,
	NearestFilter,
	UnsignedByteType,
	PlaneGeometry,
	FrontSide,
} from 'three';

// type
import type { RippleMesh } from '@/types';

// store
import { useWebGlStore, useCursorStore } from '@/store';

export default function Ripple() {
	const getThree = useThree(state => state.get);
	const rippleScene = useMemo(() => new Scene(), []);

	const preMousePos = useRef({ x: 0, y: 0 });
	const rippleVec3 = useMemo(() => new Vector3(), []);
	const rippleTexture = useLoader(TextureLoader, '/scene/textures/ripple.webp');
	const rippleRefs = useRef<RippleMesh[]>([]);
	const rippleCurrIdx = useRef(-1);
	const rippleGeo = useMemo(() => new PlaneGeometry(0.5, 0.5, 1, 1), []);
	const rippleMaterial = useMemo(
		() =>
			new MeshBasicMaterial({
				map: rippleTexture,
				transparent: true,
				visible: false,
				depthTest: false,
				depthWrite: false,
				stencilWrite: false,
				side: FrontSide,
			}),
		[rippleTexture],
	);

	const rippleBuffer = useFBO(32, 32, {
		samples: 0,
		minFilter: NearestFilter,
		magFilter: LinearFilter,
		format: RGBAFormat,
		type: UnsignedByteType,
		stencilBuffer: false,
		depthBuffer: false,
		depth: false,
		anisotropy: 0,
		colorSpace: '',
		generateMipmaps: false,
	});

	const ripples = useMemo(() => {
		const max = 25;
		const meshes = [];

		for (let i = 0; i < max; i++) {
			meshes.push(
				<mesh
					key={i}
					ref={(el: RippleMesh) => {
						rippleRefs.current[i] = el;
					}}
					material={rippleMaterial.clone()}
					position={[0, 0, 3]}
					rotation={[0, 0, 2 * Math.PI * Math.random()]}
					geometry={rippleGeo}></mesh>,
			);
		}

		return meshes;
	}, [rippleGeo, rippleMaterial]);

	const handleMouseMove = useCallback(
		(event: MouseEvent) => {
			if (!useWebGlStore.getState().isEntryAnimationDone) return;

			const { size, camera } = getThree();
			const ndcX = (event.clientX / size.width) * 2 - 1;
			const ndcY = -((event.clientY / size.height) * 2 - 1);

			useCursorStore.setState({
				curr: {
					x: event.clientX,
					y: event.clientY,
					cursor: event.target ? window.getComputedStyle(event.target as HTMLElement).cursor : 'auto',
				},
				ndcPosition: useCursorStore.getState().ndcPosition.set(ndcX, ndcY),
			});

			rippleVec3.set(ndcX, ndcY, 0.5);
			rippleVec3.unproject(camera);
			rippleVec3.sub(camera.position).normalize();

			const distance = (3 - camera.position.z) / rippleVec3.z;
			const offsetX = Math.abs(preMousePos.current.x - event.clientX);
			const offsetY = Math.abs(preMousePos.current.y - event.clientY);

			const isRippleZone = useCursorStore.getState().isRippleZone;

			if ((offsetX >= 0.5 || offsetY >= 0.5) && isRippleZone) {
				const currRipple = rippleRefs.current[++rippleCurrIdx.current % 25];

				if (currRipple) {
					currRipple.material.visible = true;
					currRipple.material.opacity = 1;
					currRipple.scale.x = currRipple.scale.y = 1;
					currRipple.position.copy(camera.position).add(rippleVec3.multiplyScalar(distance));
				}
			}

			preMousePos.current = { x: event.clientX, y: event.clientY };
		},
		[getThree, rippleVec3],
	);

	useEffect(() => useWebGlStore.setState({ rippleBuffer }), [rippleBuffer]);

	useEffect(() => {
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, [handleMouseMove]);

	useFrame(({ gl, camera }) => {
		rippleRefs.current.forEach(mesh => {
			if (mesh) {
				mesh.rotation.z += 0.025;
				mesh.material.opacity *= 0.95;
				mesh.scale.x = 0.98 * mesh.scale.x + 0.155;
				mesh.scale.y = mesh.scale.x;
			}
		});

		gl.setRenderTarget(rippleBuffer);
		gl.render(rippleScene, camera);
	});

	// console.log('Ripple renders');

	return <>{createPortal(ripples, rippleScene)}</>;
}

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react';

// three
import { useFBO } from '@react-three/drei';
import { createPortal, useFrame, useThree, useLoader } from '@react-three/fiber';
import { lerp } from 'three/src/math/MathUtils.js';
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

// store
import { useWebGlStore, useCursorStore } from '@/store';

// constant
import { MESH_NAME } from '@/config/constants';

export default function Ripple() {
	const getThree = useThree(state => state.get);
	const rippleScene = useMemo(() => new Scene(), []);

	const preMousePos = useRef({ x: 0, y: 0 });
	const rippleVec3 = useMemo(() => new Vector3(), []);
	const rippleTexture = useLoader(TextureLoader, '/scene/textures/ripple.png');
	const rippleRefs = useRef([]);
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
		[],
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
					ref={el => (rippleRefs.current[i] = el)}
					material={rippleMaterial.clone()}
					position={[0, 0, 3]}
					rotation={[0, 0, 2 * Math.PI * Math.random()]}
					geometry={rippleGeo}></mesh>,
			);
		}

		return meshes;
	}, []);

	const handleMouseMove = useCallback(
		(event: MouseEvent) => {
			if (!useWebGlStore.getState().isEntryAnimationDone) return;

			const { size, camera } = getThree();
			const ndcX = (event.clientX / size.width) * 2 - 1;
			const ndcY = -((event.clientY / size.height) * 2 - 1);

			useCursorStore.setState({
				curr: { x: event.clientX, y: event.clientY, cursor: window.getComputedStyle(event.target).cursor },
				ndcPosition: useCursorStore.getState().ndcPosition.set(ndcX, ndcY),
			});

			const vector = rippleVec3;
			vector.set(ndcX, ndcY, 0.5);
			vector.unproject(camera);
			vector.sub(camera.position).normalize();
			const distance = (3 - camera.position.z) / vector.z;

			const offsetX = Math.abs(preMousePos.current.x - event.clientX);
			const offsetY = Math.abs(preMousePos.current.y - event.clientY);

			const isRippleZone = useCursorStore.getState().isRippleZone;

			if ((offsetX >= 0.5 || offsetY >= 0.5) && isRippleZone) {
				rippleCurrIdx.current = (rippleCurrIdx.current + 1) % 25;
				rippleRefs.current[rippleCurrIdx.current].material.visible = true;
				rippleRefs.current[rippleCurrIdx.current].material.opacity = 1;
				rippleRefs.current[rippleCurrIdx.current].scale.x = rippleRefs.current[
					rippleCurrIdx.current
				].scale.y = 1;
				rippleRefs.current[rippleCurrIdx.current].position
					.copy(camera.position)
					.add(vector.multiplyScalar(distance));
			}

			preMousePos.current = { x: event.clientX, y: event.clientY };
		},
		[getThree, rippleVec3],
	);

	useEffect(() => {
		useWebGlStore.setState({ rippleBuffer });
	}, [rippleBuffer]);

	useEffect(() => {
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, [handleMouseMove]);

	useFrame(({ gl, camera }) => {
		rippleRefs.current.forEach(mesh => {
			mesh.rotation.z += 0.025;
			mesh.material.opacity *= 0.95;
			mesh.scale.x = 0.98 * mesh.scale.x + 0.155;
			mesh.scale.y = mesh.scale.x;
		});

		gl.setRenderTarget(rippleBuffer);
		gl.render(rippleScene, camera);
	});

	console.log('Ripple renders');

	return <>{createPortal(ripples, rippleScene)}</>;
}

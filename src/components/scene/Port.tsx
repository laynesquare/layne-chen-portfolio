import { Suspense, useEffect, useRef } from 'react';
import { Environment, Lightformer } from '@react-three/drei';

// three
import { Vector3 } from 'three';

// components
import Ripple from '@/components/scene/Ripple';
import Banner from '@/components/scene/Banner';
import Model from '@/components/scene/Ball';

// store
import { useWebGlStore } from '@/store';

export default function Port() {
	const lightDirRef = useRef(new Vector3(0, 0, 0));
	return (
		<>
			{/* <OrbitControls /> */}
			<Suspense fallback={<SuspenseMonitor />}>
				<Ripple>
					<Banner />
					<Model />
					<Environment
						files='/scene/textures/empty_warehouse.hdr'
						resolution={16}>
						<Lightformer
							color='#FAE9D5'
							intensity={3}
							position={[8, 8, 8]}
							scale={[10, 50, 1]}
							target={lightDirRef.current}
							form='rect'
						/>
					</Environment>
				</Ripple>
			</Suspense>
		</>
	);
}

/**
 * use useEffect's clean-up callback to detect whether progress is 100 and 3D components are fully loaded,
 * since even if progress is 100, the 3D components still take a little time to load.
 */
function SuspenseMonitor() {
	useEffect(
		() => () => {
			window.scrollTo(0, 0);
			useWebGlStore.setState({ isLoaded: true });
		},
		[],
	);
	return null;
}

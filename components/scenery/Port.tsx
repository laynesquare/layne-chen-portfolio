import { memo, Suspense, useEffect, useRef } from 'react';
import { Preload, Environment, Lightformer } from '@react-three/drei';

import { Vector3 } from 'three';

import Ripple from '@/components/scenery/Ripple';
import Banner from '@/components/scenery/Banner';
import Model from '@/components/scenery/Model';
import { useWebGlStore } from '@/store';

export default memo(function Port() {
	const lightDirRef = useRef(new Vector3(0, 0, 0));
	return (
		<>
			{/* <OrbitControls /> */}
			<Suspense fallback={<SuspenseMonitor />}>
				<Ripple>
					<Banner />
					<Model />
					<Environment
						// files='/scenery/textures/empty_warehouse.jpg'
						resolution={64}
						preset='warehouse'>
						<Lightformer
							color='#FFFFF0'
							// intensity={10}
							intensity={3}
							position={[10, 5, 0]}
							scale={[10, 50, 1]}
							target={lightDirRef.current}
							form='rect'
						/>
					</Environment>
				</Ripple>
			</Suspense>
		</>
	);
});

/**
 * use useEffect's clean-up callback to detect whether progress is 100 and 3D component is fully loaded,
 * since even if progress is 100, the 3D components still take a little time to load.
 */
function SuspenseMonitor() {
	useEffect(() => () => useWebGlStore.setState({ isLoaded: true }), []);
	return null;
}

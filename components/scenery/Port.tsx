// react
import { memo, Suspense, useEffect, useRef } from 'react';
import { Environment, Lightformer } from '@react-three/drei';

// three
import { Vector3 } from 'three';

// components
import Ripple from '@/components/scenery/Ripple';
import Banner from '@/components/scenery/Banner';
import Model from '@/components/scenery/Model';

// store
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
						files='/scenery/textures/empty_warehouse.jpg'
						resolution={128}>
						<Lightformer
							color='#FAE9D5'
							intensity={3}
							position={[5, 5, 10]}
							scale={[15, 50, 1]}
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
 * use useEffect's clean-up callback to detect whether progress is 100 and 3D components are fully loaded,
 * since even if progress is 100, the 3D components still take a little time to load.
 */
function SuspenseMonitor() {
	useEffect(() => () => useWebGlStore.setState({ isLoaded: true }), []);
	return null;
}

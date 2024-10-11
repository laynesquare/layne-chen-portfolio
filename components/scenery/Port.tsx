import { Suspense, useEffect, useLayoutEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Preload, Environment, Lightformer } from '@react-three/drei';

import { Vector2, BackSide, Vector3, Color } from 'three';

import Ripple from '@/components/scenery/Ripple';
import Banner from '@/components/scenery/Banner';
import Model from '@/components/scenery/Model';

export default function Port() {
	const lightDirRef = useRef(new Vector3(0, 0, 0));
	return (
		<>
			{/* <OrbitControls /> */}
			<Suspense fallback={null}>
				<Precompile />
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
}

function Precompile() {
	const { gl, scene, camera } = useThree();
	useLayoutEffect(() => void gl.compile(scene, camera), []);
	return null;
}

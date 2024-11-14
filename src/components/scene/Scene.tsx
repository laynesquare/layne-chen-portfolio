'use client';

import { Suspense, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';

// three
import { Canvas } from '@react-three/fiber';
import { Preload, Environment, Lightformer } from '@react-three/drei';
import { Vector3 } from 'three';

// store
import { useWebGlStore } from '@/store';

// component
import { SuspenseMonitor, Ripple, Billboard } from '@/components';

const Disclose = dynamic(() => import('./Disclose'), { ssr: false });
const Torso = dynamic(() => import('./Torso'), { ssr: false });
const Containers = dynamic(() => import('./Containers'), { ssr: false });
const Texts = dynamic(() => import('./Texts'), { ssr: false });
const Ball = dynamic(() => import('./Ball'), { ssr: false });
const BallMask = dynamic(() => import('./BallMask'), { ssr: false });

interface SceneProps {
	wrapperRef: React.RefObject<HTMLElement>;
}

export default function Scene({ wrapperRef }: SceneProps) {
	const canvasRef = useRef(null);
	const lightDir = useMemo(() => new Vector3(0, 0, 0), []);

	return (
		<>
			<Disclose canvasRef={canvasRef} />
			<Canvas
				ref={canvasRef}
				shadows={false}
				gl={{
					antialias: false,
					alpha: false,
					stencil: false,
					depth: false,
					powerPreference: 'high-performance',
					premultipliedAlpha: false,
					preserveDrawingBuffer: false,
					precision: 'lowp',
				}}
				linear
				onPointerMissed={() => useWebGlStore.setState({ isBallPress: false })}
				className='bg-neutral'
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100dvw',
					height: '100dvh',
					transform: 'translate3d(0,0,0)',
				}}
				dpr={[1, 1.5]}
				camera={{ position: [0, 0, 8], fov: 30 }}
				flat={true}
				eventSource={wrapperRef.current || undefined}>
				{/* <OrbitControls /> */}
				<Suspense fallback={<SuspenseMonitor />}>
					{/* ripple scene: off-screen */}
					<Ripple />
					<Billboard>
						{/* billboard scene: off-screen */}
						<Torso />
						<Containers />
						<Texts />
						<Ball />
						<BallMask />
						<Environment
							files='/scene/textures/empty_warehouse.hdr'
							resolution={16}>
							<Lightformer
								color='#FAE9D5'
								intensity={3}
								position={[8, 8, 8]}
								scale={[10, 50, 1]}
								target={lightDir}
								form='rect'
							/>
						</Environment>
					</Billboard>
				</Suspense>
				<Preload all={true} />
			</Canvas>
		</>
	);
}

'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import {
	View,
	useProgress,
	Html,
	ScrollControls,
	useScroll,
	OrbitControls,
	Text,
	Preload,
	MeshTransmissionMaterial,
	Text3D,
	Environment,
	Lightformer,
	Scroll,
	Sparkles,
} from '@react-three/drei';
import {
	EffectComposer,
	Bloom,
	ChromaticAberration,
	Noise,
	ToneMapping,
	Scanline,
	GodRays,
	LensFlare,
	N8AO,
} from '@react-three/postprocessing';
import { KernelSize, Resolution, BlendFunction } from 'postprocessing';
import { Vector2, BackSide, Vector3 } from 'three';

// Import custom components
import {
	Floor,
	Cage,
	Particles,
	Model,
	Loader,
	Camera,
	Laser,
	Ray,
	Hero,
	Identity,
	Ripple,
	Banner,
} from '@/components';

// Import types
import { SceneProps } from '@/types';

import { suspend } from 'suspend-react';

import { ReactLenis, useLenis } from '@studio-freight/react-lenis';

export default function Scene({ wrapperRef }: SceneProps) {
	const scroll = useScroll();

	// Example of scrolling to 50% of the scroll height
	// useEffect(() => {
	// 	scroll.el.scrollTop = 100;
	// }, []);

	return (
		<Canvas
			gl={{
				antialias: true,
				alpha: false,
				stencil: true,
				depth: true,
				powerPreference: 'high-performance',
			}}
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100dvw',
				height: '100dvh',
			}}
			camera={{ position: [0, 0, 3.5] }}
			eventSource={wrapperRef?.current}>
			{/* <OrbitControls /> */}

			<Suspense>
				<ScrollControls
					enabled={true}
					damping={0.1}
					pages={2}>
					<Ripple>
						<Banner />
						<Model />

						{/* <Camera /> */}
						<Environment preset='warehouse'>
							<Lightformer
								intensity={4}
								position={[10, 5, 0]}
								scale={[10, 50, 1]}
								onUpdate={self => self.lookAt(0, 0, 0)}
							/>
						</Environment>

						{/* <Scroll></Scroll> */}
						<Preload />
					</Ripple>
				</ScrollControls>
			</Suspense>
		</Canvas>
	);
}

{
	/* <Sparkles
count={50}
scale={10}
size={0.5}
speed={0.1}
/> */
}
'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import {
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
import { Floor, Cage, Particles, Model, Loader, Camera, Laser, Ray, Hero } from '@/components';

// Import types
import { SceneProps } from '@/types';

import { BallCollider, Physics, RigidBody } from '@react-three/rapier';

import { suspend } from 'suspend-react';

export default function Scene({ wrapperRef }: SceneProps) {
	return (
		<Canvas
			gl={{
				antialias: true,
				alpha: true,
				stencil: false,
				depth: true,
				powerPreference: 'high-performance',
			}}
			style={{
				position: 'sticky',
				top: 0,
			}}
			camera={{ fov: 100 }}
			eventSource={wrapperRef?.current}>
			{/* <OrbitControls /> */}

			<Suspense>
				<Model />
				<Camera />
				<Environment preset='warehouse'>
					<Lightformer
						intensity={5}
						position={[10, 5, 0]}
						scale={[10, 50, 1]}
						onUpdate={self => self.lookAt(0, 0, 0)}
					/>
				</Environment>
				<Preload />
			</Suspense>
		</Canvas>
	);
}

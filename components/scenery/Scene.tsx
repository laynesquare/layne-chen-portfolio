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
	OrthographicCamera,
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
	FXAA,
} from '@react-three/postprocessing';
import { KernelSize, Resolution, BlendFunction } from 'postprocessing';
import { Vector2, BackSide, Vector3 } from 'three';

import Ripple from '@/components/scenery/Ripple';
import Banner from '@/components/scenery/Banner';
import Model from '@/components/scenery/Model';

// Import types
import { SceneProps } from '@/types';

import { suspend } from 'suspend-react';

import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import dynamic from 'next/dynamic';

const Port = dynamic(() => import('@/components/scenery/Port'), { ssr: false });

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
				stencil: false,
				depth: false,
				powerPreference: 'high-performance',
				// pixelRatio: Math.min(2, window.devicePixelRatio),
			}}
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100lvw',
				height: '100lvh',
			}}
			dpr={[1.1, 1.1]}
			camera={{ position: [0, 0, 3.5] }}
			resize={{ debounce: 100 }}
			flat={true}
			eventSource={wrapperRef?.current}>
			{/* <OrthographicCamera
				makeDefault
				position={[0, 0, 3.5]}
				zoom={100}
			/> */}
			<Port />
		</Canvas>
	);
}

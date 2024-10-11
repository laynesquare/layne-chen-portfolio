'use client';

import { Suspense, use, useEffect, useRef } from 'react';
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
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useWebGlStore } from '@/store';

const Port = dynamic(() => import('@/components/scenery/Port'), { ssr: false });

gsap.registerPlugin(useGSAP);

export default function Scene({ wrapperRef }: SceneProps) {
	const canvasRef = useRef(null);

	return (
		<Canvas
			ref={canvasRef}
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
				pointerEvents: 'all',
			}}
			dpr={[1.1, 1.1]}
			camera={{ position: [0, 0, 8], fov: 30 }}
			resize={{ debounce: 100 }}
			flat={true}
			eventSource={wrapperRef?.current}>
			<Disclose canvasRef={canvasRef} />
			<Port />
			<Preload all />
		</Canvas>
	);
}

function Disclose({ canvasRef }) {
	const isLoaded = useWebGlStore(state => state.isLoaded);

	useGSAP(
		() => {
			if (isLoaded) {
				gsap.to(canvasRef.current, {
					// delay: 0,
					duration: 5,
					maskSize: '100rem',
					ease: 'power2.inOut',
				});
			} else {
				gsap.to(canvasRef.current, {
					duration: 0,
					WebkitMaskImage: "url('/frame/star.c9387850.svg')",
					maskImage: "url('/frame/star.c9387850.svg')",
					WebkitMaskRepeat: 'no-repeat',
					maskRepeat: 'no-repeat',
					WebkitMaskPosition: 'center center',
					maskPosition: 'center center',
					maskSize: '50rem',
				});
			}
		},
		{ dependencies: [isLoaded], scope: canvasRef },
	);

	return null;
}

'use client';

import { memo, Suspense, use, useEffect, useRef } from 'react';
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
	useGLTF,
	PerformanceMonitor,
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

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { usePlatformStore, useWebGlStore } from '@/store';

import Port from './Port';

gsap.registerPlugin(useGSAP);

export default memo(function Scene({ wrapperRef }: SceneProps) {
	const canvasRef = useRef(null);

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
				eventSource={wrapperRef?.current}>
				<Port />
				<Preload all={true} />
			</Canvas>
		</>
	);
});

interface DiscloseProps {
	canvasRef: React.RefObject<HTMLCanvasElement>;
}

function Disclose({ canvasRef }: DiscloseProps) {
	const isEntryAnimationDone = useWebGlStore(state => state.isEntryAnimationDone);

	useGSAP(
		() => {
			if (isEntryAnimationDone) {
				const tl = gsap.timeline({ delay: 0.25, smoothChildTiming: true });
				const canvasEl = canvasRef.current;
				const width = window.innerWidth;
				const maskFactor = width >= 1920 ? 1920 : width;
				const duration = (maskFactor / 1920) * 1.5 + 0.4;

				tl.to(canvasEl, {
					duration,
					maskSize: `500%`,
					ease: 'none',
				}).to(
					canvasEl,
					{
						delay: 1,
						duration: 0,
						webkitMaskImage: 'none',
						maskImage: 'none',
						ease: 'none',
					},
					'>',
				);
			}
		},
		{ dependencies: [isEntryAnimationDone], scope: canvasRef },
	);

	return null;
}

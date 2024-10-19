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
import { useWebGlStore } from '@/store';

import Port from './Port';

gsap.registerPlugin(useGSAP);

export default memo(function Scene({ wrapperRef }: SceneProps) {
	const canvasRef = useRef(null);

	return (
		<>
			<Disclose canvasRef={canvasRef} />
			<Canvas
				ref={canvasRef}
				gl={{
					antialias: true,
					alpha: false,
					stencil: false,
					depth: false,
					powerPreference: 'high-performance',
					premultipliedAlpha: false,
					preserveDrawingBuffer: false,
				}}
				linear
				className='bg-neutral'
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100lvw',
					height: '100lvh',
				}}
				dpr={[1, 1.5]}
				camera={{ position: [0, 0, 8], fov: 30 }}
				// resize={{ debounce: 5 }}
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
				const tl = gsap.timeline();
				tl.to(canvasRef.current, {
					duration: 1.5,
					maskSize: '500%',
					ease: 'none',
				}).to(
					canvasRef.current,
					{
						duration: 0,
						webkitMaskImage: 'none',
						maskImage: 'none',
					},
					'>',
				);
			}
		},
		{ dependencies: [isEntryAnimationDone], scope: canvasRef },
	);

	return null;
}

'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/frame/Hero';
import Scene from '@/components/scenery/Scene';
import Loader from '@/components/scenery/Loader';

import { useProgress } from '@react-three/drei';

import SmoothScrolling from '@/components/SmoothScroll';
import { ScrollScene } from '@14islands/r3f-scroll-rig';

import { useDomStore } from '@/store';

import { useWebGlStore } from '@/store';

// const Scene = dynamic(() => import('@/components/scenery/Scene'), { ssr: false });
function ProgressMonitor() {
	const progress = useProgress(state => state.progress);
	const loadedRegister = useWebGlStore(state => state.loadedRegister);

	useEffect(() => {
		if (progress === 100) {
			loadedRegister(true);
		}
	}, [progress]);

	return null;
}

export default function Home() {
	const wrapperRef = useRef(null);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			{/* <Loader /> */}
			<ProgressMonitor />

			<main ref={wrapperRef}>
				<Hero />
				<Scene wrapperRef={wrapperRef} />
			</main>
		</>
	);
}

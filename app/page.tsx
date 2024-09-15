'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/frame/Hero';
import Scene from '@/components/scenery/Scene';

import { useProgress } from '@react-three/drei';

import SmoothScrolling from '@/components/SmoothScroll';
import { ScrollScene } from '@14islands/r3f-scroll-rig';

import { useDomStore } from '@/store';

// const Scene = dynamic(() => import('@/components/scenery/Scene'), { ssr: false });

export default function Home() {
	const wrapperRef = useRef(null);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			{/* <Loader /> */}
			{/* <main
				className={`overall-ctn`}
				ref={wrapperRef}
				style={{
					transformOrigin: 'center',
					transformStyle: 'preserve-3d',
					transform: 'rotateX(10deg)',
					backgroundColor: 'red',
				}}>
				<Hero contentRef={contentRef} />
				<Scene wrapperRef={wrapperRef} />
			</main> */}

			<main ref={wrapperRef}>
				<Hero />
				<Scene wrapperRef={wrapperRef} />
			</main>
		</>
	);
}

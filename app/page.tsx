'use client';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Frame, Loader, Camera, Scene, Hero } from '@/components';
import { useProgress } from '@react-three/drei';

import SmoothScrolling from '@/components/SmoothScroll';

export default function Home() {
	const wrapperRef = useRef(null);
	const contentRef = useRef(null);

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

			<main
				className={``}
				ref={wrapperRef}
				style={{}}>
				{/* <SmoothScrolling> */}
				{/* <Hero contentRef={contentRef} /> */}
				<Scene wrapperRef={wrapperRef} />
				{/* </SmoothScrolling> */}
			</main>
		</>
	);
}

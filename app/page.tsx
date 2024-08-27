'use client';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Frame, Loader, Camera, Scene, Hero } from '@/components';
import { useProgress } from '@react-three/drei';

export default function Home() {
	const wrapperRef = useRef(null);
	const contentRef = useRef(null);

	return (
		<>
			{/* <Loader /> */}
			<main
				className={`overall-ctn`}
				ref={wrapperRef}>
				{/* <Hero contentRef={contentRef} /> */}
				<Scene wrapperRef={wrapperRef} />
			</main>
		</>
	);
}

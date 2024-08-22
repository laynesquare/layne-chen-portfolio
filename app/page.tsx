'use client';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Frame, Loader, Camera, Scene, Hero } from '@/components';
import { useProgress } from '@react-three/drei';

// const Scene = dynamic(() => import('@/components/scenery/Scene'), { ssr: false });

export default function Home() {
	const overallCtnRef = useRef(null);

	return (
		<>
			<Loader />
			<main
				className={`overall-ctn`}
				ref={overallCtnRef}>
				<Hero />
				<Scene overallCtnRef={overallCtnRef} />
			</main>
		</>
	);
}

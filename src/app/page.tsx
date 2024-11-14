'use client';
import { useRef } from 'react';

// component
import { PlatformMonitor, Cursor, Nav, OverlayNav, Body, Scene, Loader } from '@/components';

// gsap
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
	const wrapperRef = useRef<HTMLElement>(null);

	return (
		<>
			<Cursor />
			<Loader />
			<PlatformMonitor />
			<main
				ref={wrapperRef}
				className='isolate'>
				<Nav />
				<OverlayNav />
				<Body />
				<Scene wrapperRef={wrapperRef} />
			</main>
		</>
	);
}

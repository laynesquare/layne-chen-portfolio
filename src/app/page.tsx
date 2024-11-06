'use client';
import { useRef } from 'react';

// component
import { PlatformMonitor, Cursor, Nav, OverlayNav, Body, Scene, Loader } from '@/components';

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

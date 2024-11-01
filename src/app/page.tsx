'use client';
import { useRef } from 'react';

// component
import { PlatformMonitor, Cursor, Nav, Body, Scene, Loader } from '@/components';

export default function Home() {
	const wrapperRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<Cursor />
			<Loader />
			<PlatformMonitor />
			<main
				ref={wrapperRef}
				className='isolate'>
				<Nav />
				<Body />
				<Scene wrapperRef={wrapperRef} />
			</main>
		</>
	);
}

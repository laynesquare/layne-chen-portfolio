'use client';
import { useEffect, useRef } from 'react';

import Hero from '@/components/frame/Hero';
import Scene from '@/components/scenery/Scene';
import Loader from '@/components/scenery/Loader';

import { usePlatformStore } from '@/store';

export default function Home() {
	const wrapperRef = useRef(null);

	usePlatformMonitor();

	useEffect(() => window.scrollTo(0, 0), []);

	return (
		<>
			<Loader />
			<main ref={wrapperRef}>
				<Hero />
				<Scene wrapperRef={wrapperRef} />
			</main>
		</>
	);
}

function usePlatformMonitor() {
	function updateIsMobile() {
		const isMobile = window.innerWidth < 768;
		usePlatformStore.setState({ isMobile });
	}

	useEffect(() => {
		updateIsMobile();
		window.addEventListener('resize', updateIsMobile);
		return () => window.removeEventListener('resize', updateIsMobile);
	}, []);
}

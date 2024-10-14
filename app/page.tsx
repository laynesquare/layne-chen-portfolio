'use client';
import { useEffect, useRef } from 'react';

import Hero from '@/components/frame/Hero';
import Scene from '@/components/scenery/Scene';
import Loader from '@/components/scenery/Loader';

export default function Home() {
	const wrapperRef = useRef(null);

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

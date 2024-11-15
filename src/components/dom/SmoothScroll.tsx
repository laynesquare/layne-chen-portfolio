'use client';

import { useEffect, useRef } from 'react';

// store
import { useNavStore } from '@/store';

// lenis
import { ReactLenis } from '@studio-freight/react-lenis';

// type
import type { SmoothScrollingProps, LenisRef } from '@/types';

// gsap
import gsap from 'gsap';

function SmoothScrolling({ children }: SmoothScrollingProps) {
	const lenisRef = useRef<LenisRef>(null);

	function update(time: number) {
		lenisRef?.current?.lenis?.raf(time * 1000);
	}

	useEffect(() => {
		gsap.ticker.add(update);
		useNavStore.setState({ lenisRef });
		return () => gsap.ticker.remove(update);
	}, []);

	const lenisOptions = {
		lerp: 0.08,
		duration: 3,
		syncTouch: true,
		touchMultiplier: 0.6,
	};

	return (
		<ReactLenis
			root
			ref={lenisRef}
			options={lenisOptions}
			autoRaf={false}>
			{children}
		</ReactLenis>
	);
}

export default SmoothScrolling;

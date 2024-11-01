'use client';

import { useEffect, useRef, ReactNode, RefObject, LegacyRef } from 'react';
import { useNavStore } from '@/store';
import { ReactLenis, LenisContext } from '@studio-freight/react-lenis';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';

interface SmoothScrollingProps {
	children: ReactNode;
}

type LenisRef = {
	wrapper?: HTMLElement;
	content?: HTMLElement;
	lenis?: Lenis;
};

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

'use client';
import { useEffect, useRef, useState } from 'react';

import Hero from '@/components/frame/Hero';
import Scene from '@/components/scenery/Scene';
import Loader from '@/components/scenery/Loader';

import { useCursorStore, usePlatformStore, useWebGlStore } from '@/store';
import { opacity } from 'html2canvas/dist/types/css/property-descriptors/opacity';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Home() {
	const wrapperRef = useRef(null);

	useEffect(() => window.scrollTo(0, 0), []);

	return (
		<>
			<Cursor />
			<Loader />
			<PlatformMonitor />
			<main ref={wrapperRef}>
				<Hero />
				<Scene wrapperRef={wrapperRef} />
			</main>
		</>
	);
}

function Cursor() {
	const cursorRef = useRef(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, cursor: 'none' });
	const isEntryAnimationDone = useWebGlStore(state => state.isEntryAnimationDone);
	const isCustomCursor = useCursorStore(state => state.isCustomCursor);

	function updateMousePosition(e) {
		setMousePosition({ x: e.clientX, y: e.clientY, cursor: getComputedStyle(e.target).cursor });
	}

	useEffect(() => {
		window.addEventListener('mousemove', updateMousePosition);
		return () => window.removeEventListener('mousemove', updateMousePosition);
	}, []);

	useGSAP(
		() => {
			if (isCustomCursor) {
				const isPointer = mousePosition.cursor === 'pointer';
				gsap.to(cursorRef.current, {
					top: mousePosition.y,
					left: mousePosition.x,
					duration: 0.4,
					opacity: isEntryAnimationDone ? 1 : 0,
					width: isPointer ? '96px' : '16px',
					backdropFilter: isPointer ? `blur(0px) contrast(150%)` : `blur(96px) contrast(100%)`,
					ease: 'power1.out',
				});
			}
		},
		{ dependencies: [mousePosition.x, mousePosition.y, mousePosition.cursor, isCustomCursor], scope: cursorRef },
	);

	return (
		<div
			ref={cursorRef}
			className={`z-50 fixed bg-neutral rounded-full opacity-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 w-[16px] aspect-square mix-blend-difference ${
				isCustomCursor ? '' : 'hidden'
			}`}></div>
	);
}

function PlatformMonitor() {
	function updatePlatform() {
		const isMobile = window.innerWidth < 768;
		const userAgent = navigator.userAgent || navigator.vendor || window.opera;
		const mobileRegex = /android|iphone|ipad|ipod|blackberry|windows phone/i;
		const isCustomCursor = !mobileRegex.test(userAgent);
		useCursorStore.setState({ isCustomCursor });
		usePlatformStore.setState({ isMobile });
	}

	useEffect(() => {
		updatePlatform();
		window.addEventListener('resize', updatePlatform);
		return () => window.removeEventListener('resize', updatePlatform);
	}, []);

	return null;
}

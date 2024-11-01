'use client';
import { useEffect, useRef } from 'react';

// component
import { Hero, Scene, Loader } from '@/components';

// store
import { useCursorStore, usePlatformStore, useWebGlStore } from '@/store';

// gsap
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

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
				<Hero />
				<Scene wrapperRef={wrapperRef} />
			</main>
		</>
	);
}

function Cursor() {
	const cursorRef = useRef(null);
	const isCustomCursor = useCursorStore(state => state.isCustomCursor);

	return (
		<>
			<CursorAnim cursorRef={cursorRef} />
			<div
				ref={cursorRef}
				className={`z-50 fixed bg-neutral rounded-full opacity-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 w-[16px] aspect-square mix-blend-difference ${
					isCustomCursor ? '' : 'hidden'
				}`}></div>
		</>
	);
}

function CursorAnim({ cursorRef }) {
	const curr = useCursorStore(state => state.curr);
	const isEntryAnimationDone = useWebGlStore(state => state.isEntryAnimationDone);
	const isCustomCursor = useCursorStore(state => state.isCustomCursor);

	useGSAP(
		() => {
			if (isCustomCursor && cursorRef.current) {
				const isMorph = curr.cursor === 'pointer';
				gsap.to(cursorRef.current, {
					translateY: curr.y,
					translateX: curr.x,
					duration: 0.45,
					opacity: isEntryAnimationDone ? 1 : 0,
					width: isMorph ? 96 : 16,
					backdropFilter: isMorph ? `blur(0px) contrast(150%)` : `blur(36px) contrast(100%)`,
					ease: 'power1.out',
				});
			}
		},
		{ dependencies: [curr.x, curr.y, curr.cursor, isCustomCursor] },
	);

	return null;
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

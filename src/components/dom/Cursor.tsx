import { useRef } from 'react';

// store
import { useCursorStore, useWebGlStore } from '@/store';

// gsap
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Cursor() {
	const cursorRef = useRef(null);
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

	return (
		<div
			ref={cursorRef}
			className={`z-50 fixed bg-neutral rounded-full opacity-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 w-[16px] aspect-square mix-blend-difference ${
				isCustomCursor ? '' : 'hidden'
			}`}></div>
	);
}

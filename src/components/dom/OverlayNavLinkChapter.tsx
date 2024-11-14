import { useRef, useState } from 'react';

// component
import { OverlayNavDecor } from '@/components';

// store
import { useNavStore, usePlatformStore, useWebGlStore } from '@/store';

// type
import type { PointerEvent } from 'react';

// gsap
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface OverlayNavLinkChapterProps {
	chapter: string;
	label: string;
	width: string;
	justify: string;
	isDecor: boolean;
}

export default function OverlayNavLinkChapter({ chapter, label, width, justify, isDecor }: OverlayNavLinkChapterProps) {
	const [isHover, setIsHover] = useState(false);
	const isMobile = usePlatformStore(state => state.isMobile);
	const isLoaded = useWebGlStore(state => state.isLoaded);
	const ctnRef = useRef(null);

	useGSAP(
		() => {
			if (isHover) {
				gsap.to('[data-chapter-label]', {
					color: `var(--color-font-neutral)`,
					yPercent: -100,
					duration: 0.5,
					ease: 'bounce.out',
				});
				gsap.to('[data-chapter-label-clone]', {
					color: `var(--color-font-neutral)`,
					yPercent: 0,
					duration: 0.5,
					ease: 'bounce.out',
				});
				gsap.to('[data-chapter-sequence]', {
					color: `var(--color-font-neutral)`,
					duration: 0.5,
					ease: 'bounce.out',
				});
				gsap.to('[data-chapter-arrow]', {
					fill: `var(--color-font-neutral)`,
					duration: 0.5,
					ease: 'bounce.out',
				});
				gsap.to('[data-chapter-arrow-container]', {
					opacity: 1,
					marginRight: '3rem',
					duration: 0.5,
					ease: 'bounce.out',
				});
			} else {
				gsap.to('[data-chapter-label]', {
					color: `var(--color-font-neutral-contrast)`,
					yPercent: 0,
					duration: 0.5,
					ease: 'bounce.out',
				});
				gsap.to('[data-chapter-label-clone]', {
					color: `var(--color-font-neutral-contrast)`,
					yPercent: 100,
					duration: 0.5,
					ease: 'bounce.out',
				});
				gsap.to('[data-chapter-sequence]', {
					color: `var(--color-font-neutral-contrast)`,
					duration: 0.5,
					ease: 'bounce.out',
				});
				gsap.to('[data-chapter-arrow]', {
					fill: `var(--color-font-neutral-contrast)`,
					duration: 0.5,
					ease: 'bounce.out',
				});
				gsap.to('[data-chapter-arrow-container]', {
					marginRight: 'auto',
					opacity: 0,
					duration: 0.5,
					ease: 'bounce.out',
				});
			}
		},
		{ dependencies: [isHover, isLoaded], scope: ctnRef },
	);

	function handleClick(e: PointerEvent<HTMLAnchorElement>): void {
		e.preventDefault();
		const lenis = useNavStore.getState()?.lenisRef?.current?.lenis;
		if (lenis) {
			lenis.start();
			useNavStore.setState({ isOpen: false });
			lenis.scrollTo(`#${label}`);
		}
	}

	return (
		<>
			<div
				className={`bg-primary border border-primary flex-[1] flex items-center px-12 py-4 shadow-[0px_2px_0px_0px_var(--color-bg-primary)] w-full justify-end will-change-[width] ${width} ${justify}`}
				data-row={label}
				ref={ctnRef}>
				{isDecor && !isMobile && <OverlayNavDecor />}
				<span
					className='aspect-square md:w-[4rem] w-[8rem] will-change-[margin]'
					data-chapter-arrow-container>
					<svg
						className={`w-full h-full`}
						width='75'
						height='75'
						viewBox='0 0 75 75'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							data-chapter-arrow
							d='M5.76923 0L5.76923 11.5385L55.3269 11.5385L9.0049e-07 66.8654L8.13461 75L63.4615 19.6731L63.4615 69.2308H75L75 0L5.76923 0Z'
							fill='var(--color-font-neutral-contrast)'
						/>
					</svg>
				</span>

				<a
					role='button'
					href={`#${label}`}
					title={`Go to ${label} section`}
					className='relative flex items-baseline self-stretch overflow-hidden'
					onPointerEnter={() => setIsHover(true)}
					onPointerLeave={() => setIsHover(false)}
					onClick={handleClick}>
					<span
						data-chapter-label
						className='text-[max(12.5rem,36px)] md:text-[max(6rem,36px)] leading-none mr-8 h-full flex items-center will-change-transform'>
						{label}
					</span>
					<span
						data-chapter-sequence
						className='text-[max(2.25rem,14px)] leading-none h-full'>
						{`[${chapter}.]`}
					</span>
					<span
						data-chapter-label-clone
						className='text-[max(12.5rem,36px)] md:text-[max(6rem,36px)] leading-none absolute top-0 left-0 w-full h-full flex items-center pointer-events-none underline will-change-transform'>
						{label}
					</span>
				</a>
			</div>
		</>
	);
}

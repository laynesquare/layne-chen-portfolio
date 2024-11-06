import { useRef, useState } from 'react';

// component
import { OverlayNavLinkChapter, OverlayNavLinkBtn, OverlayNavDecor } from '@/components';

// store
import { useNavStore, useWebGlStore } from '@/store';

// gsap
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

export default function OverlayNav() {
	const [isOverlayCloseHover, setIsOverlayCloseHover] = useState(false);
	const isLoaded = useWebGlStore(state => state.isLoaded);
	const isOpen = useNavStore(state => state.isOpen);
	const overlayNavRef = useRef(null);

	useGSAP(
		() => {
			const tl = gsap.timeline();

			if (isOpen) {
				tl.to(overlayNavRef.current, { display: 'flex', pointerEvents: 'auto', duration: 0, ease: 'none' })
					.to(overlayNavRef.current, { opacity: 1, duration: 0.2, ease: 'sine.in' }, '>')
					.to('[data-row="action"]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' }, '<')
					.to('[data-row="home"]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' }, '<5%')
					.to('[data-row="about"]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' }, '<5%')
					.to('[data-row="skill"]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' }, '<5%')
					.to('[data-row="experience"]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' }, '<5%')
					.to('[data-row="project"]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' }, '<5%')
					.to('[data-row="contact"]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' }, '<5%')
					.to('[data-row="mobile-decor"]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' }, '<5%');
			} else {
				tl.to(overlayNavRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.2, ease: 'sine.in' })
					.to('[data-row="action"]', { x: '100%', duration: 1, ease: 'elastic.out(0.4, 0.5)' }, '<')
					.to('[data-row="home"]', { x: '100%', duration: 1, ease: 'elastic.out(0.4, 0.5)' }, '<5%')
					.to('[data-row="about"]', { x: '100%', duration: 1, ease: 'elastic.out(0.4, 0.5)' }, '<5%')
					.to('[data-row="skill"]', { x: '100%', duration: 1, ease: 'elastic.out(0.4, 0.5)' }, '<5%')
					.to('[data-row="experience"]', { x: '100%', duration: 1, ease: 'elastic.out(0.4, 0.5)' }, '<5%')
					.to('[data-row="project"]', { x: '100%', duration: 1, ease: 'elastic.out(0.4, 0.5)' }, '<5%')
					.to('[data-row="contact"]', { x: '100%', duration: 1, ease: 'elastic.out(0.4, 0.5)' }, '<5%')
					.to('[data-row="mobile-decor"]', { x: '100%', duration: 1, ease: 'elastic.out(0.4, 0.5)' }, '<5%')
					.to(overlayNavRef.current, { display: 'none', duration: 0, ease: 'none' }, '<');
			}
		},
		{ dependencies: [isOpen, isLoaded], scope: overlayNavRef },
	);

	useGSAP(
		() => {
			if (isOverlayCloseHover) {
				gsap.to('[data-close-up-bar]', {
					rotate: '225deg',
					duration: 0.2,
					ease: 'sine.in',
				});
				gsap.to('[data-close-btm-bar]', {
					rotate: '135deg',
					duration: 0.2,
					ease: 'sine.in',
				});
			}
			if (!isOverlayCloseHover) {
				gsap.to('[data-close-up-bar]', {
					rotate: '45deg',
					duration: 0.2,
					ease: 'sine.in',
				});
				gsap.to('[data-close-btm-bar]', {
					rotate: '-45deg',
					duration: 0.2,
					ease: 'sine.in',
				});
			}
		},
		{ dependencies: [isOverlayCloseHover], scope: overlayNavRef },
	);

	return (
		<nav
			className={`fixed z-30 top-0 left-0 h-dvh w-full font-boxing text-neutralContrast opacity-0 flex flex-col backdrop-blur-md backdrop-saturate-200 backdrop-hue-rotate-15 overflow-y-auto overflow-x-hidden`}
			data-lenis-prevent
			ref={overlayNavRef}>
			<div
				className={`bg-primary border border-primary text-4xl flex-[2.5] flex px-12 pt-12 pb-32 items-center gap-12 w-full justify-between flex-col md:w-[75rem] md:flex-row md:py-6 md:gap-20`}
				data-row={`action`}>
				<button
					className='px-[max(1.5rem,24px)] border border-neutralContrast h-full flex flex-col justify-center items-center origin-center aspect-[4.5] w-full md:aspect-square md:rounded-full md:w-auto'
					title='Close menu'
					onClick={() => {
						useNavStore.getState().lenisRef?.current?.lenis?.start();
						useNavStore.setState({ isOpen: false });
					}}
					onPointerEnter={() => setIsOverlayCloseHover(true)}
					onPointerLeave={() => setIsOverlayCloseHover(false)}>
					<div
						className={`w-[max(3rem,48px)] h-[2px] bg-neutralContrast origin-center translate-y-1/2`}
						data-close-up-bar></div>
					<div
						className={`w-[max(3rem,48px)] h-[2px] bg-neutralContrast origin-center -translate-y-1/2`}
						data-close-btm-bar></div>
				</button>
				<div className='flex items-center flex-wrap w-full gap-y-4 gap-x-8 md:gap-8'>
					<OverlayNavLinkBtn
						label={`github`}
						href={`https://github.com/laynesquare`}
					/>
					<OverlayNavLinkBtn
						label={`linkedin`}
						href={`https://www.linkedin.com/in/laynechensquare`}
					/>
					<div className='flex-[1_0_100%] block md:hidden'></div>
					<OverlayNavLinkBtn
						label={`resume`}
						href={`/dom/layne_res_all.pdf`}
					/>
					<OverlayNavLinkBtn
						label={`mail`}
						href={`mailto:laynechensquare@gmail.com`}
					/>
				</div>
			</div>

			<OverlayNavLinkChapter
				label={`home`}
				chapter={`00`}
				width={`md:w-[55rem]`}
				justify={`md:justify-end`}
				isDecor={false}
			/>

			<OverlayNavLinkChapter
				label={`about`}
				chapter={`01`}
				width={`md:w-[47.5rem]`}
				justify={`md:justify-end`}
				isDecor={false}
			/>

			<OverlayNavLinkChapter
				label={`skill`}
				chapter={`02`}
				width={`md:w-[42rem]`}
				justify={`md:justify-end`}
				isDecor={false}
			/>

			<OverlayNavLinkChapter
				label={`experience`}
				chapter={`03`}
				width={`md:w-[75rem]`}
				justify={`md:justify-end`}
				isDecor={false}
			/>

			<OverlayNavLinkChapter
				label={`project`}
				chapter={`04`}
				width={`md:w-[85rem]`}
				justify={`md:justify-end`}
				isDecor={false}
			/>

			<OverlayNavLinkChapter
				label={`contact`}
				chapter={`99`}
				width={`md:w-[95rem]`}
				justify={`md:justify-start`}
				isDecor
			/>

			<div
				className={`bg-primary border border-primary flex flex-[5] items-end p-12 pt-32 shadow-[0px_2px_0px_0px_var(--color-bg-primary)] w-full justify-between md:hidden`}
				data-row={`mobile-decor`}>
				<OverlayNavDecor />
				<OverlayNavDecor />
				<OverlayNavDecor />
				<OverlayNavDecor />
			</div>
		</nav>
	);
}

import { Html, useProgress } from '@react-three/drei';
import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Loader() {
	const { progress, item } = useProgress();
	const loaderRef = useRef(null);

	useGSAP(
		() => {
			if (progress === 100) {
				gsap.to(loaderRef.current, {
					delay: 2,
					opacity: 0,
					duration: 0.2,
					ease: 'power2.inOut',
				});
			}
		},
		{ dependencies: [progress], scope: loaderRef },
	);

	useGSAP(
		() => {
			const tl = gsap.timeline();

			// if (isOpen) {
			// 	gsap.to(overlayNavRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.2, ease: 'sine.in' });
			// 	tl.to('[data-row="action"]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' })
			// 		.to('[data-row="home"]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' }, '<5%')
			// 		.to('[data-row="about"]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' }, '<5%')
			// 		.to('[data-row="skill"]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' }, '<5%')
			// 		.to('[data-row="experience"]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' }, '<5%')
			// 		.to('[data-row="project"]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' }, '<5%')
			// 		.to('[data-row="contact"]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' }, '<5%');
			// }

			// if (progress === 100) {
			// 	gsap.to(loaderRef.current, {
			// 		delay: 2,
			// 		opacity: 0,
			// 		duration: 0.2,
			// 		ease: 'power2.inOut',
			// 	});
			// }
		},
		// { dependencies: [progress], scope: loaderRef },
	);

	return (
		<div
			ref={loaderRef}
			className={`z-[100] fixed top-0 left-0 w-lvw h-lvh bg-red-800 bg-primary text-neutral font-boxing leading-none pointer-events-none`}>
			<Indicator
				progress={progress}
				item={item}
			/>
		</div>
	);
}

function truncate(str, maxLength) {
	return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
}

function Indicator({ progress, item }) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return null;

	return (
		<div
			className='h-full w-full whitespace-pre-line relative'
			style={{
				transform: `translate(-6rem, -5.75rem)`,
			}}>
			<p
				className='text-2xl text-right absolute flex justify-center items-center h-full w-full'
				style={{
					transform: `rotateX(-45deg) rotateY(-45deg) rotateZ(0deg) translate3d(9.375rem, -6.25rem, -8.125rem)`,
				}}>
				{truncate(item, 40)}
			</p>
			<p
				className='text-right text-[11.75rem] absolute flex justify-center items-center h-full w-full'
				style={{
					transform: `rotateX(45deg) rotateY(0deg) rotateZ(45deg)`,
				}}>
				<span>{`LAYNE\nCHEN`}</span>
			</p>
			<p
				className='text-right text-[9.875rem] absolute flex justify-center items-center h-full w-full'
				style={{
					transform: `rotateX(-45deg) rotateY(-45deg) rotateZ(0deg) translate3d(-12.5rem, 37.5rem, -8.125rem)`,
					color: `var(--color-bg-primary)`,
					WebkitTextStroke: `0.25rem var(--color-font-neutral)`,
				}}>
				<span>{`LOAD\nING`}</span>
			</p>
			<p
				className='text-right text-[9.875rem] absolute flex justify-center items-center h-full w-full text-neutralContrast'
				style={{
					transform: `rotateX(45deg) rotateY(-45deg) rotateZ(0deg) translate3d(25rem, 33.125rem, -8.125rem)`,
					opacity: 0.5,
				}}>
				<span>{`${progress.toFixed(0).padStart(3, '0')}%`}</span>
			</p>
		</div>
	);
}

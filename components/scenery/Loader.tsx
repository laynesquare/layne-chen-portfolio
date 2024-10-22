import { Html, useProgress } from '@react-three/drei';
import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { useWebGlStore } from '@/store';

gsap.registerPlugin(useGSAP);

export default function Loader() {
	const [item, progress] = useProgress(state => [state.item, state.progress]);
	const isLoaded = useWebGlStore(state => state.isLoaded);
	const loaderRef = useRef(null);

	useGSAP(
		() => {
			if (isLoaded) {
				const tl = gsap.timeline();
				tl.to('[data-intro-container]', {
					rotate: 180,
					scale: 20,
					duration: 0.65,
					ease: 'none',
				})
					.to(
						loaderRef.current,
						{
							duration: 0.3,
							opacity: 0,
							pointerEvents: 'none',
							ease: 'none',
						},
						'<',
					)
					.to(
						loaderRef.current,
						{
							display: 'none',
							duration: 0,
							ease: 'none',
							onComplete: () => useWebGlStore.setState({ isEntryAnimationDone: true }),
						},
						'>',
					);
			}
		},
		{ dependencies: [isLoaded] },
	);

	return (
		<>
			<div
				ref={loaderRef}
				className={`z-[100] fixed top-0 left-0 w-lvw h-lvh bg-primary text-neutral font-boxing leading-none`}>
				<div
					data-intro-container
					className='h-full w-full whitespace-pre-line relative'
					style={{ transform: `translate(-6rem, -6.5rem)` }}>
					<p
						data-intro-item
						className='text-2xl text-right absolute justify-center items-center h-full w-full hidden md:flex'
						style={{
							transform: `rotateX(-45deg) rotateY(-45deg) rotateZ(0deg) translate3d(9.375rem, -6.25rem, -8.125rem)`,
						}}>
						{truncate(item, 40)}
					</p>
					<p
						className='text-right text-[11.75rem] absolute flex justify-center items-center h-full w-full'
						data-intro-name
						style={{ transform: `rotateX(45deg) rotateY(0deg) rotateZ(45deg)` }}>
						<span>{`LAYNE\nCHEN`}</span>
					</p>
					<p
						data-intro-loading
						className='text-right text-[9.875rem] absolute flex justify-center items-center h-full w-full'
						style={{
							transform: `rotateX(-45deg) rotateY(-45deg) rotateZ(0deg) translate3d(-12.5rem, 37.5rem, -8.125rem)`,
							color: `var(--color-bg-primary)`,
							WebkitTextStroke: `0.25rem var(--color-font-neutral)`,
						}}>
						<span>{`LOAD\nING`}</span>
					</p>
					<p
						data-intro-progress
						className='text-right text-[9.875rem] absolute flex justify-center items-center h-full w-full text-neutralContrast'
						style={{
							transform: `translate3d(23rem, 18rem, 0rem) rotateX(45deg) rotateY(-45deg) rotateZ(0deg) skew(0,0) scale(1, 2.25)`,
							opacity: 0.5,
						}}>
						<span>{`${progress.toFixed(0).padStart(3, '0')}%`}</span>
					</p>
				</div>
			</div>
		</>
	);
}

function truncate(str, maxLength) {
	return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
}

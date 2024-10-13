import { Html, useProgress } from '@react-three/drei';
import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { useWebGlStore } from '@/store';

gsap.registerPlugin(useGSAP);

export default function Loader() {
	const progress = useProgress();
	const isLoaded = useWebGlStore(state => state.isLoaded);
	const loaderRef = useRef(null);

	useGSAP(
		() => {
			if (isLoaded) {
				const tl = gsap.timeline();
				tl.to(loaderRef.current, {
					rotate: 180,
					scale: 10,
					duration: 0.6,
					ease: 'none',
				}).to(
					loaderRef.current,
					{
						pointerEvents: 'none',
						opacity: 0,
						duration: 0.3,
						ease: 'none',
						onComplete: () => {
							useWebGlStore.setState({ isEntryAnimationDone: true });
						},
					},
					'<',
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
					style={{
						transform: `translate(-6rem, -6.5rem)`,
					}}>
					<p
						data-intro-item
						className='text-2xl text-right absolute flex justify-center items-center h-full w-full'
						style={{
							transform: `rotateX(-45deg) rotateY(-45deg) rotateZ(0deg) translate3d(9.375rem, -6.25rem, -8.125rem)`,
						}}>
						{truncate(progress.item, 40)}
					</p>
					<p
						className='text-right text-[11.75rem] absolute flex justify-center items-center h-full w-full'
						data-intro-name
						style={{
							transform: `rotateX(45deg) rotateY(0deg) rotateZ(45deg)`,
						}}>
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
							// scale: `1 2.25`,
							opacity: 0.5,
						}}>
						<span>{`${progress.progress.toFixed(0).padStart(3, '0')}%`}</span>
					</p>
				</div>
			</div>
		</>
	);
}

// {
// 	<>
// 		<div
// 			ref={loaderRef}
// 			className={`z-[100] fixed top-0 left-0 w-lvw h-lvh bg-primary text-neutral font-boxing leading-none`}>
// 			<div
// 				className='h-full w-full whitespace-pre-line relative'
// 				style={{
// 					transform: `translate(-6rem, -6.5rem)`,
// 				}}>
// 				<p
// 					data-intro-item
// 					className='text-2xl text-right absolute flex justify-center items-center h-full w-full'
// 					style={{
// 						transform: `rotateX(-45deg) rotateY(-45deg) rotateZ(0deg) translate3d(9.375rem, -6.25rem, -8.125rem)`,
// 					}}>
// 					{truncate(progress.item, 40)}
// 				</p>
// 				<p
// 					className='text-right text-[11.75rem] absolute flex justify-center items-center h-full w-full'
// 					data-intro-name
// 					style={{
// 						transform: `rotateX(45deg) rotateY(0deg) rotateZ(45deg)`,
// 					}}>
// 					<span>{`LAYNE\nCHEN`}</span>
// 				</p>
// 				<p
// 					data-intro-loading
// 					className='text-right text-[9.875rem] absolute flex justify-center items-center h-full w-full'
// 					style={{
// 						transform: `rotateX(-45deg) rotateY(-45deg) rotateZ(0deg) translate3d(-12.5rem, 37.5rem, -8.125rem)`,
// 						color: `var(--color-bg-primary)`,
// 						WebkitTextStroke: `0.25rem var(--color-font-neutral)`,
// 					}}>
// 					<span>{`LOAD\nING`}</span>
// 				</p>
// 				<p
// 					data-intro-progress
// 					className='text-right text-[9.875rem] absolute flex justify-center items-center h-full w-full text-neutralContrast'
// 					style={{
// 						transform: `rotateX(45deg) rotateY(-45deg) rotateZ(0deg) translate3d(25rem, 38rem, -8.125rem) scaleY(2.25)`,
// 						opacity: 0.5,
// 					}}>
// 					<span>{`${progress.progress.toFixed(0).padStart(3, '0')}%`}</span>
// 				</p>
// 			</div>
// 		</div>
// 	</>;
// }

function truncate(str, maxLength) {
	return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
}

{
	// 	<>
	// 		<div
	// 			ref={loaderRef}
	// 			className={`z-[100] fixed top-0 left-0 w-lvw h-lvh bg-primary text-neutral font-boxing leading-none`}>
	// 			<div
	// 				className='h-full w-full whitespace-pre-line relative'
	// 				style={{
	// 					transform: `translate(-6rem, -6.5rem)`,
	// 				}}>
	// 				<p
	// 					data-intro-item
	// 					className='text-2xl text-right absolute flex justify-center items-center h-full w-full'
	// 					style={{
	// 						transform: `rotateX(-45deg) rotateY(-45deg) rotateZ(0deg) translate3d(9.375rem, -6.25rem, -8.125rem)`,
	// 					}}>
	// 					{truncate(progress.item, 40)}
	// 				</p>
	// 				<p
	// 					className='text-right text-[11.75rem] absolute flex justify-center items-center h-full w-full'
	// 					data-intro-name
	// 					style={{
	// 						transform: `rotateX(45deg) rotateY(0deg) rotateZ(45deg)`,
	// 					}}>
	// 					<span>{`LAYNE\nCHEN`}</span>
	// 				</p>
	// 				<p
	// 					data-intro-loading
	// 					className='text-right text-[9.875rem] absolute flex justify-center items-center h-full w-full'
	// 					style={{
	// 						transform: `rotateX(-45deg) rotateY(-45deg) rotateZ(0deg) translate3d(-12.5rem, 37.5rem, -8.125rem)`,
	// 						color: `var(--color-bg-primary)`,
	// 						WebkitTextStroke: `0.25rem var(--color-font-neutral)`,
	// 					}}>
	// 					<span>{`LOAD\nING`}</span>
	// 				</p>
	// 				<p
	// 					data-intro-progress
	// 					className='text-right text-[9.875rem] absolute flex justify-center items-center h-full w-full text-neutralContrast'
	// 					style={{
	// 						transform: `rotateX(45deg) rotateY(-45deg) rotateZ(0deg) translate3d(25rem, 38rem, -8.125rem) scaleY(2.25)`,
	// 						opacity: 0.5,
	// 					}}>
	// 					<span>{`${progress.progress.toFixed(0).padStart(3, '0')}%`}</span>
	// 				</p>
	// 			</div>
	// 		</div>
	// 	</>;
}

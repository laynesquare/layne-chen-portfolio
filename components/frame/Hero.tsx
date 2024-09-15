import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Html, useProgress } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { VscMenu } from 'react-icons/vsc';
import { RiCloseLargeFill } from 'react-icons/ri';

import layneChen from '@/public/frame/layne_chen_clash.svg';
import frameTopLeftIdentity from '@/public/frame/frame-top-left-identity.png';
import { useDomStore } from '@/store';
import { useThree } from '@react-three/fiber';

// gsap.registerPlugin(useGSAP);

// z-index: 10 => 在球上面

export default function Hero({}) {
	const { progress, item } = useProgress();

	const contentRef = useRef(null);

	const textElStoreRegister = useDomStore(state => state.textElRegister);
	const torsoElStoreRegister = useDomStore(state => state.torsoElRegister);

	useGSAP(() => {
		if (progress === 100) {
			gsap.to(contentRef.current, {
				opacity: 1,
				duration: 1.5,
				ease: 'power2.inOut',
			});
		}
	}, [progress]);

	useEffect(() => {
		textElsRef.current.forEach(el => textElRegister(el));
	}, [textElRegister]);

	console.log('re render from hero');

	return (
		<>
			{/* <div className='absolute left-1/4 border-r border-stone-800 mix-blend-color-dodge pointer-events-none h-[800lvh] z-10'></div> */}
			{/* <div className='absolute left-1/2 border-r border-stone-800 mix-blend-color-dodge pointer-events-none h-[800lvh] z-10'></div> */}
			{/* <div className='absolute left-3/4 border-r border-stone-800 mix-blend-color-dodge pointer-events-none h-[800lvh] z-10'></div> */}
			<div
				className='absolute w-full top-0 left-0 font-clash font-semibold'
				ref={torsoElStoreRegister}>
				<section
					/* -------------------------------------------------------------------------- */
					/*                                 first page                                 */
					/* -------------------------------------------------------------------------- */
					className='h-lvh w-full relative flex pointer-events-none border-b-2 border-stone-800 z-10'>
					<header className='absolute z-10 flex flex-col leading-none top-[20%] left-1/2 -translate-x-1/2 text-[13.75rem]'>
						<h2 ref={textElStoreRegister}>{'Front-end'}</h2>
						<span className='pl-40'>
							<h1 ref={el => textElsRef.current.push(el)}>{'Developer'}</h1>
						</span>
					</div>

					<div className='absolute z-10 font-clash top-3/4 right-[76%] text-6xl font-semibold'>
						<span ref={el => textElsRef.current.push(el)}>{`[01.]`}</span>
					</div>

					<div>
						<h3>[`Craft with a blend of technical expertise and design sensibility`]</h3>
					</div>
				</section>
			</article>
		</>
	);
}

// function useRegister({ elRef }) {
// 	const register = useDomStore(state => state.register);

// 	useEffect(() => {
// 		register(elRef.current);
// 	}, []);
// 	return null;
// }

/* -------------------------------------------------------------------------- */
/*                                    menu                                    */
/* -------------------------------------------------------------------------- */

function Menu() {
	const [isOpen, setIsOpen] = useState(false);
	const [isHover, setIsHover] = useState(false);

	const btnRef = useRef(null);
	const btnUnderlayRef = useRef(null);
	const iconRef = useRef(null);
	const textRef = useRef(null);
	const navRef = useRef(null);
	const cornerRef = useRef(null);

	useGSAP(() => {
		gsap.to(btnRef.current, {
			backgroundColor: isOpen ? 'var(--color-secondary)' : 'transparent',
			padding: isOpen ? '0.75rem 1rem 0.75rem 1rem' : '0.75rem 1rem 0.75rem 1rem',
			border: isOpen ? '1px solid var(--color-white)' : '1px solid var(--color-font-neutral)',
			color: isOpen ? 'var(--color-font-neutral)' : 'var(--color-font-neutral)',
			ease: 'linear',
			duration: 0.1,
		});

		const tl = gsap.timeline();

		tl.to(btnUnderlayRef.current, {
			opacity: isOpen ? '1' : '0',
			width: isOpen ? '100%' : '0%',
			borderRadius: isOpen ? '1.5rem 1.5rem 0 0' : '0',
			padding: isOpen ? '0.5rem' : '0',
			ease: 'power1.in',
			duration: 0.15,
		}).to(
			navRef.current,
			{
				opacity: isOpen ? '1' : '0',
				width: isOpen ? '100%' : '0%',
				height: isOpen ? '100%' : '0%',
				borderRadius: isOpen ? '2rem 0 2rem 2rem' : '0',
				padding: isOpen ? '1rem 1.5rem 2.5rem 1.5rem' : '0',
				duration: 0.15,
				ease: 'power1.in',
			},
			'<',
		);

		gsap.to(cornerRef.current, {
			opacity: isOpen ? '1' : '0',
			right: isOpen ? '141' : '0',
			duration: isOpen ? 0.15 : 0.05,
			ease: 'power1.in',
		});

		gsap.fromTo(
			iconRef.current,
			{ opacity: 0, y: 10 },
			{ opacity: 1, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' },
		);

		gsap.fromTo(
			textRef.current,
			{ opacity: 0, y: 10 },
			{ opacity: 1, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' },
		);
	}, [isOpen]);

	useGSAP(() => {
		if (isHover) {
			gsap.fromTo(
				textRef.current,
				{ opacity: 0, x: 10 },
				{ opacity: 1, x: 0, duration: 1, ease: 'elastic.out(1, 0.5)' },
			);
			gsap.fromTo(
				iconRef.current,
				{ opacity: 0, x: 10 },
				{ opacity: 1, x: 0, duration: 1, ease: 'elastic.out(1, 0.5)' },
			);
		}
	}, [isHover]);

	return (
		<div className='top-6 right-6 absolute flex justify-end flex-col items-end z-10 font-krona'>
			<div className='relative'>
				<button
					ref={btnRef}
					className='flex items-center gap-2 leading-none rounded-full w-max mx-4 mt-4 mb-4'
					onClick={() => setIsOpen(!isOpen)}
					onMouseOver={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}>
					<p
						ref={textRef}
						className='pt-[2px]'>
						{isOpen ? 'CLOSE' : 'MENU'}
					</p>
					<div ref={iconRef}>
						{isOpen ? <RiCloseLargeFill className='text-base' /> : <VscMenu className='text-base' />}
					</div>
				</button>

				<div
					className='menu-btn-underlay'
					ref={btnUnderlayRef}></div>
			</div>

			<div
				ref={navRef}
				className='bg-secondary w-full overflow-hidden'>
				<nav className='text-3xl'>
					<ul className='flex flex-col'>
						<li>
							<a
								className='py-4 pr-4 block border-b border-b-1-neutral'
								href=''>
								About
							</a>
						</li>
						<li>
							<a
								className='py-4 pr-4 block border-b border-b-1-neutral'
								href=''>
								Skills
							</a>
						</li>
						<li>
							<a
								className='py-4 pr-4 block border-b border-b-1-neutral'
								href=''>
								Experience
							</a>
						</li>
						<li>
							<a
								className='py-4 pr-4 block border-b border-b-1-neutral'
								href=''>
								Projects
							</a>
						</li>
						<li>
							<a
								className='py-4 pr-4 block border-b border-b-1-neutral'
								href=''>
								Contact
							</a>
						</li>
					</ul>
				</nav>
			</div>

			<svg
				ref={cornerRef}
				className='top-[36px] absolute pointer-events-none'
				style={{ transform: 'rotate(-180deg)' }}
				width='32'
				height='32'
				viewBox='0 0 32 32'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<g clip-path='url(#clip0_310_2)'>
					<path
						d='M30 0H0V30C0 13.431 13.431 0 30 0Z'
						fill='var(--color-secondary)'></path>
				</g>
				<defs>
					<clipPath id='clip0_310_2'>
						<rect
							width='30'
							height='30'
							fill='white'></rect>
					</clipPath>
				</defs>
			</svg>
		</div>
	);
}

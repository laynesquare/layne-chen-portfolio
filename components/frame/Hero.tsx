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
	const torsoRef = useRef(null);

	const textElStoreRegister = useDomStore(state => state.textElRegister);
	const torsoElStoreRegister = useDomStore(state => state.torsoElRegister);

	useGSAP(() => {
		if (progress === 100) {
			gsap.to(torsoRef.current, {
				opacity: 1,
				duration: 1.5,
				ease: 'power2.inOut',
			});
		}
	}, [progress]);

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
							<h2 ref={textElStoreRegister}>{'Developer'}</h2>
						</span>
					</header>

					<span
						className='absolute z-10 top-[65%] right-[76%] text-6xl'
						ref={textElStoreRegister}>{`[01.]`}</span>

					<h3
						className='absolute z-10 left-[26%] top-[65%] text-2xl whitespace-pre-line'
						ref={
							textElStoreRegister
						}>{`Craft with a blend\nof technical\nexpertise and\nesign sensibility`}</h3>

					<p
						className='absolute z-10 right-[51%] top-[65%] text-2xl whitespace-pre-line text-right'
						ref={textElStoreRegister}>{`Click the\nball to\nglow up`}</p>

					<h2
						className='absolute z-10 right-[26%] top-[65%] text-4xl whitespace-pre-line text-right'
						ref={textElStoreRegister}>{`Based in Taipei,\nTaiwan`}</h2>

					<p
						className='absolute z-10 right-[51%] top-[80%] text-base whitespace-pre-line text-right'
						ref={textElStoreRegister}>{`scroll\nto\nexplore`}</p>
				</section>
				<section
					/* -------------------------------------------------------------------------- */
					/*                                 second page                                 */
					/* -------------------------------------------------------------------------- */
					className='h-lvh w-full relative flex border-b-2 border-stone-800 z-10'>
					<header>
						<h2
							ref={textElStoreRegister}
							className='absolute z-10 bottom-[5%] right-[51%] text-[13.75rem]'>{`about`}</h2>
					</header>

					<h3
						ref={textElStoreRegister}
						className='absolute z-10 left-[15%] top-[5%] text-xl whitespace-pre-line'>
						{`Proficient in TypeScript/JavaScript,\nReact, Angular, Node.js, and MongoDB.\nSkilled in SSG/SSR, RESTful APIs, and UX\ndesign, with a focus on performance and\naesthetics.`}
					</h3>

					<span
						className='absolute z-10 top-[5%] left-[51%] text-6xl'
						ref={textElStoreRegister}>{`[02.]`}</span>

					<span
						data-flip
						className='absolute z-10 bottom-[30%] right-[51%] text-6xl scale-x-[-1]'
						ref={textElStoreRegister}>{`[02.]`}</span>
				</section>
				<section
					/* -------------------------------------------------------------------------- */
					/*                                 third page                                 */
					/* -------------------------------------------------------------------------- */
					className='h-lvh w-full relative flex border-b-2 border-stone-800 z-10 pointer-events-none'>
					<header>
						<h2
							ref={textElStoreRegister}
							className='absolute z-10 bottom-[60%] left-[26%] text-[13.75rem]'>{`skill`}</h2>
					</header>

					<div>
						<span
							className='absolute z-10 bottom-[68%] left-[51%] text-6xl'
							ref={textElStoreRegister}>{`[03.]`}</span>
					</div>

					<div className='absolute z-10 flex top-[50%] left-[26%] gap-14'>
						<div>
							<h4
								ref={textElStoreRegister}
								className='text-3xl mb-4'>
								Language
							</h4>
							<ul className='text-xl'>
								<li ref={textElStoreRegister}>{`Typescript (Javascript)`}</li>
								<li ref={textElStoreRegister}>{`HTML`}</li>
								<li ref={textElStoreRegister}>{`CSS/Sass`}</li>
							</ul>
						</div>
						<div>
							<h4
								ref={textElStoreRegister}
								className='text-3xl mb-4'>
								Frontend
							</h4>
							<ul className='text-xl'>
								<li ref={textElStoreRegister}>{`React`}</li>
								<li ref={textElStoreRegister}>{`React Router`}</li>
								<li ref={textElStoreRegister}>{`React Redux`}</li>
								<li ref={textElStoreRegister}>{`Next.js`}</li>
								<li ref={textElStoreRegister}>{`Angular`}</li>
								<li ref={textElStoreRegister}>{`Angular Universal`}</li>
								<li ref={textElStoreRegister}>{`RxJS`}</li>
								<li ref={textElStoreRegister}>{`Karma/Jasmine`}</li>
								<li ref={textElStoreRegister}>{`Bootstrap`}</li>
								<li ref={textElStoreRegister}>{`WebGL`}</li>
								<li ref={textElStoreRegister}>{`Three.js`}</li>
								<li ref={textElStoreRegister}>{`GSAP`}</li>
							</ul>
						</div>
						<div>
							<h4
								ref={textElStoreRegister}
								className='text-3xl mb-4'>
								Backend
							</h4>
							<ul className='text-xl'>
								<li ref={textElStoreRegister}>{`Node.js`}</li>
								<li ref={textElStoreRegister}>{`Express`}</li>
								<li ref={textElStoreRegister}>{`Mongoose`}</li>
								<li ref={textElStoreRegister}>{`MongoDB`}</li>
								<li ref={textElStoreRegister}>{`RESTful API`}</li>
							</ul>
						</div>
						<div>
							<h4
								ref={textElStoreRegister}
								className='text-3xl mb-4'>
								Tools & Platforms
							</h4>
							<ul className='text-xl'>
								<li ref={textElStoreRegister}>{`Git (Sourcetree)`}</li>
								<li ref={textElStoreRegister}>{`GitLab`}</li>
								<li ref={textElStoreRegister}>{`Github`}</li>
								<li ref={textElStoreRegister}>{`Webpack`}</li>
							</ul>
						</div>

						<div>
							<h4
								ref={textElStoreRegister}
								className='text-3xl mb-4'>
								Design
							</h4>
							<ul className='text-xl'>
								<li ref={textElStoreRegister}>{`Figma`}</li>
								<li ref={textElStoreRegister}>{`Photoshop`}</li>
								<li ref={textElStoreRegister}>{`Illustrator`}</li>
							</ul>
						</div>
					</div>
				</section>

				<section
					/* -------------------------------------------------------------------------- */
					/*                                 third page                                 */
					/* -------------------------------------------------------------------------- */
					className='h-lvh w-full relative flex border-b-2 border-stone-800 z-10 pointer-events-none'>
					<header>
						<h2
							ref={textElStoreRegister}
							className='absolute z-10 top-[5%] left-[51%] text-[13.75rem] leading-[80%] whitespace-pre-line text-right'>{`experie\nnce`}</h2>
					</header>

					<span
						className='absolute z-10 bottom-[52.5%] right-[10%] text-6xl'
						ref={textElStoreRegister}>{`[04.]`}</span>

					<h4
						className='absolute z-10 text-6xl top-[30%] right-[51%]'
						ref={textElStoreRegister}>
						{`Frontend Developer`}
					</h4>

					<h5 className='absolute z-10 top-[40%] right-[51%] text-right text-3xl whitespace-pre-line'>
						<span
							ref={
								textElStoreRegister
							}>{`KUNYOU Technology Co., LTD.  |  Full-time\nJun 2023 - Present  |  1yr 1mos\nTaipei, Taipei City, Taiwan  |  On-site`}</span>
					</h5>

					<ul className='text-xl absolute z-10 left-[51%] bottom-[20%] leading-[150%] whitespace-pre-line'>
						<li
							ref={
								textElStoreRegister
							}>{`- Facilitate the official website's SEO and achieve 100 in the Lighthouse index with Angular\n    Universal's SSG tech`}</li>
						<li
							ref={
								textElStoreRegister
							}>{`- Use Karma/Jasmine to implement Unit Test and achieve 98% code coverage`}</li>
						<li
							ref={
								textElStoreRegister
							}>{`- Acquire AA level of web accessibility standard in developing public sectors projects`}</li>
						<li
							ref={
								textElStoreRegister
							}>{`- Use RxJS to execute asynchronous requests and fulfill API integration`}</li>
						<li
							ref={
								textElStoreRegister
							}>{`- Utilize UI framework PrimeNG and data-visualizing package ECharts to materialize UI/UX\n    drafts and RWD`}</li>
					</ul>
				</section>

				<section
					/* -------------------------------------------------------------------------- */
					/*                                 third page                                 */
					/* -------------------------------------------------------------------------- */
					/* -------------------------------------------------------------------------- */
					/* -------------------------------------------------------------------------- */
					/* -------------------------------------------------------------------------- */
					className='w-full max-w-[1920px] relative flex border-b-2 border-stone-800 z-10 flex-col gap-32 py-9 px-20 m-auto'>
					<header className='text-[13.75rem] leading-none flex gap-14 items-baseline'>
						<h2 ref={textElStoreRegister}>{`project`}</h2>
						<span
							className='text-6xl'
							ref={textElStoreRegister}>{`[05.]`}</span>
					</header>

					<figure className='flex gap-10 flex-1'>
						<div className='flex-1'>
							<Image
								src='/scenery/textures/waternormals.jpg'
								alt='Description of the image'
								width='0'
								height='0'
								sizes='100vw'
								className='w-full aspect-[16/10] object-cover h-full'
							/>
						</div>

						<figcaption className='flex flex-col flex-1 gap-11 justify-center'>
							<div className='flex justify-center gap-11 items-end'>
								<h4 className='flex-1 text-6xl whitespace-pre-line text-right'>
									<span ref={textElStoreRegister}>{`Layne Chen\nportfolio ‘24`}</span>
								</h4>
								<h5
									ref={textElStoreRegister}
									className='flex-1 text-4xl'>{`overview`}</h5>
							</div>

							<div className={`flex gap-11`}>
								<div className='flex-1 text-right'>
									<h5 className='text-3xl mb-9'>
										<span ref={textElStoreRegister}>{`# frontend`}</span>
									</h5>
									<ul className='text-xl'>
										<li>
											<span ref={textElStoreRegister}> {`Javascript`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`HTML`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`CSS`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`Next.js`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`Zustand`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`Tailwind`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`Three.js`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`GSAP`}</span>
										</li>
									</ul>
									<div className='flex gap-8 justify-end text-4xl mt-12'>
										<button>
											<span ref={textElStoreRegister}>{`[ demo ]`}</span>
										</button>
										<button>
											<span ref={textElStoreRegister}> {`[ code ]`}</span>
										</button>
									</div>
								</div>
								<p
									ref={textElStoreRegister}
									className='flex-1 text-wrap text-xl whitespace-pre-line'>
									{`Showcases my work and expertise as a front-tend developer and 3D enthusiast. Built using cutting-edge web technologies, the portfolio leverages the power of WebGL, Three.js, and GSAP, ensuring optimal performance, responsiveness, and immersive user experiences with custom shaders.\n\nIntegrates Static Site Generation (SSG) with Next.js, allowing for lightning-fast load times while improving crawlability for better SEO.`}
								</p>
							</div>
						</figcaption>
					</figure>

					<div
						className='border-b-2 border-stone-800 w-full'
						/* -------------------------------------------------------------------------- */
						/* -------------------------------------------------------------------------- */
						/* -------------------------------------------------------------------------- */
					></div>

					<figure className='flex gap-10 flex-1'>
						<div className='flex-1'>
							<Image
								src='/scenery/textures/waternormals.jpg'
								alt='Description of the image'
								width='0'
								height='0'
								sizes='100vw'
								className='w-full aspect-[16/10] object-cover h-full'
							/>
						</div>

						<figcaption className='flex flex-col flex-1 gap-11 justify-center'>
							<div className='flex justify-center gap-11 items-end'>
								<h4 className='flex-1 text-6xl whitespace-pre-line text-right'>
									<span ref={textElStoreRegister}>{`Share your\nmemories`}</span>
								</h4>
								<h5
									ref={textElStoreRegister}
									className='flex-1 text-4xl'>{`overview`}</h5>
							</div>

							<div className={`flex gap-11`}>
								<div className='flex-1 text-right'>
									<h5 className='text-3xl mb-9'>
										<span ref={textElStoreRegister}>{`# Full stack`}</span>
									</h5>
									<ul className='text-xl'>
										<li>
											<span ref={textElStoreRegister}> {`Javascript`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`HTML`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`CSS`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`React (hooks)`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`React Redux`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`Material UI`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`Node.js`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`Express`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`Axios`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`Render`}</span>
										</li>
									</ul>
									<div className='flex gap-8 justify-end text-4xl mt-12'>
										<button>
											<span ref={textElStoreRegister}>{`[ demo ]`}</span>
										</button>
										<button>
											<span ref={textElStoreRegister}> {`[ code ]`}</span>
										</button>
									</div>
								</div>
								<p
									ref={textElStoreRegister}
									className='flex-1 text-wrap text-xl whitespace-pre-line'>
									{`Create a platform where people could share treasured memories in their lives with anyone out there throughout the globe. Each user can register a whole new account to enable full functionality coming with the application, or just simply log in via Google Oauth 2.0 to enjoy the full access.\n\nWith the account, you can create, delete, edit your posts, and bookmark, comment on, or give a thumbs-up to other users' posts. Each post delivers Youtube video recommendations based on respective content. You can venture around further if any posts pique your interest.`}
								</p>
							</div>
						</figcaption>
					</figure>

					<div
						className='border-b-2 border-stone-800 w-full'
						/* -------------------------------------------------------------------------- */
						/* -------------------------------------------------------------------------- */
						/* -------------------------------------------------------------------------- */
					></div>

					<figure className='flex gap-10 flex-1'>
						<div className='flex-1'>
							<Image
								src='/scenery/textures/waternormals.jpg'
								alt='Description of the image'
								width='0'
								height='0'
								sizes='100vw'
								className='w-full aspect-[16/10] object-cover h-full'
							/>
						</div>

						<figcaption className='flex flex-col flex-1 gap-11 justify-center'>
							<div className='flex justify-center gap-11 items-end'>
								<h4 className='flex-1 text-6xl whitespace-pre-line text-right'>
									<span ref={textElStoreRegister}>{`Learn English\nwith\nDictionary`}</span>
								</h4>
								<h5
									ref={textElStoreRegister}
									className='flex-1 text-4xl'>{`overview`}</h5>
							</div>

							<div className={`flex gap-11`}>
								<div className='flex-1 text-right'>
									<h5 className='text-3xl mb-9'>
										<span ref={textElStoreRegister}>{`# Frontend`}</span>
									</h5>
									<ul className='text-xl'>
										<li>
											<span ref={textElStoreRegister}> {`Javascript`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`HTML`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`CSS`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`React (hooks)`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`React Redux`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`Material UI`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`Node.js`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`Express`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`Axios`}</span>
										</li>
										<li>
											<span ref={textElStoreRegister}>{`Render`}</span>
										</li>
									</ul>
									<div className='flex gap-8 justify-end text-4xl mt-12'>
										<button>
											<span ref={textElStoreRegister}>{`[ demo ]`}</span>
										</button>
										<button>
											<span ref={textElStoreRegister}> {`[ code ]`}</span>
										</button>
									</div>
								</div>
								<p
									ref={textElStoreRegister}
									className='flex-1 text-wrap text-xl whitespace-pre-line'>
									{`Solve the inconvenience of encountering unknown words upon reading an English passage and having to look up elsewhere.\n\nRead multiple professional-written passages fetched via New York Times API with a juxtaposed dictionary to facilitate English learning. Co-located design of text and relevant keyword tags. You can explore more in a topic-oriented way.\n\nResponsive dictionary panel design that delivers an app-like reading experience even if you are on the go.`}
								</p>
							</div>
						</figcaption>
					</figure>
				</section>
			</div>
		</>
	);
}

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

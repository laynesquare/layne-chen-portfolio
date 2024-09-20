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

gsap.registerPlugin(useGSAP);

// z-index: 10 => 在球上面

export default function Hero({}) {
	const { progress, item } = useProgress();
	const torsoRef = useRef(null);

	const [isVisible, setIsVisible] = useState(false);

	const textElStoreRegister = useDomStore(state => state.textElRegister);
	const torsoElStoreRegister = useDomStore(state => state.torsoElRegister);
	const containerElStoreRegister = useDomStore(state => state.containerElRegister);

	// useGSAP(() => {
	// 	if (progress === 100 && someRef.current) {
	// 		gsap.fromTo(
	// 			someRef.current,
	// 			{ opacity: 0, scale: 0.5, color: 'red', transform: 'none' },
	// 			{ opacity: 1, scale: 1, color: 'green', duration: 5, transform: 'none', ease: 'elastic.out(1, 0.5)' },
	// 		);
	// 	}
	// }, [progress]);

	// function register(el) {
	// 	if (el) {
	// 		torsoRef.current = el;
	// 		torsoElStoreRegister(el);
	// 	}
	// }

	// function register2(el) {
	// 	if (el) {
	// 		textElStoreRegister(el);
	// 		someRef.current = el;
	// 	}
	// }

	return (
		<>
			{/* <div className='absolute left-1/4 border-r border-stone-800 mix-blend-color-dodge h-full z-10'></div> */}
			{/* <div className='absolute left-1/2 border-r border-stone-800 mix-blend-color-dodge h-full z-10'></div> */}
			{/* <div className='absolute left-3/4 border-r border-stone-800 mix-blend-color-dodge h-full z-10'></div> */}
			<article
				className={`absolute w-full top-0 left-0 font-boxing pointer-events-none z-10 ${
					isVisible ? 'opacity-100' : 'opacity-0'
				}`}
				ref={torsoElStoreRegister}
				onClick={() => setIsVisible(pre => !pre)}>
				{/* -------------------------------------------------------------------------- */
				/*                                first page                                 */
				/* -------------------------------------------------------------------------- */}
				<section className='h-lvh w-full relative flex flex-col overflow-hidden'>
					<div className='text-xl flex flex-1 justify-between items-center px-12'>
						<h2
							data-font-family='boxing'
							ref={textElStoreRegister}>
							{'Front-end Developer'}
						</h2>
						<h2
							data-font-family='boxing'
							ref={textElStoreRegister}
							className='text-right whitespace-pre-line leading-[1.5]'>
							{'Based in Taipei,\nTaiwan'}
						</h2>
					</div>
					<header>
						<h1 className='text-center scale-y-[2] origin-bottom translate-y-11 text-[13.5rem] leading-none'>
							<span
								data-font-family='boxing'
								data-scale-y='2'
								ref={textElStoreRegister}>
								{'LAYNE CHEN'}
							</span>
						</h1>
					</header>
				</section>

				<div className='p-[3rem_3rem] flex flex-col gap-12'>
					{/* -------------------------------------------------------------------------- */
					/*                                 second page                                 */
					/* -------------------------------------------------------------------------- */}

					<section className='flex gap-x-12 gap-y-6 flex-wrap'>
						{/* -------------------------------------------------------------------------- */
						/*                                    upper                                   */
						/* -------------------------------------------------------------------------- */}
						<div
							className='flex-[0.3] text-6xl flex border border-[--color-font-neutral] h-72 rounded-[9rem_9rem_9rem_0rem]'
							ref={containerElStoreRegister}>
							<span
								className='m-auto'
								data-font-family='boxing'
								ref={textElStoreRegister}>
								{'[02.]'}
							</span>
						</div>
						<header
							className='flex-[1] text-[13.75rem] border border-[--color-font-neutral] h-72 flex rounded-[9rem_9rem_0rem_9rem]'
							ref={containerElStoreRegister}>
							<h2
								className='m-auto leading-none'
								data-font-family='boxing'
								ref={textElStoreRegister}>
								{'about'}
							</h2>
						</header>

						<div className='flex-[1_0_100%]'></div>

						{/* -------------------------------------------------------------------------- */
						/*                                    btm                                      */
						/* -------------------------------------------------------------------------- */}

						<div
							className='border border-[--color-font-neutral] rounded-[0rem_0rem_0rem_9rem] h-[39rem] flex flex-[1] px-20'
							ref={containerElStoreRegister}>
							<h2
								data-font-family='satoshi'
								className='m-auto text-4xl font-satoshi leading-[1.5] whitespace-pre-line'
								ref={textElStoreRegister}>
								{`Proficient in TypeScript/JavaScript, React, Angular, Node.js, and MongoDB. Skilled in SSG/SSR, RESTful APIs, and UX design, with a focus on performance and aesthetics.`}
							</h2>
						</div>

						<div
							className='h-[39rem] flex-[1] border border-[--color-font-neutral rounded-[0rem_0rem_9rem_0rem]'
							ref={containerElStoreRegister}>
							{'ball'}
						</div>
					</section>

					{/* -------------------------------------------------------------------------- */
					/*                                 third page                                 */
					/* -------------------------------------------------------------------------- */}

					<section className='flex gap-x-12 gap-y-6 flex-wrap'>
						{/* -------------------------------------------------------------------------- */
						/*                                    upper                                   */
						/* -------------------------------------------------------------------------- */}
						<header
							className='flex-[1] text-[13.75rem] border border-[--color-font-neutral] h-72 flex rounded-[9rem_9rem_9rem_0rem]'
							ref={containerElStoreRegister}>
							<h2
								className='m-auto leading-none'
								data-font-family='boxing'
								ref={textElStoreRegister}>
								{'skill'}
							</h2>
						</header>

						<div
							className='flex-[0.3] text-6xl flex border border-[--color-font-neutral] h-72 rounded-[9rem_9rem_0rem_9rem]'
							ref={containerElStoreRegister}>
							<span
								data-font-family='boxing'
								className='m-auto'
								ref={textElStoreRegister}>
								{'[03.]'}
							</span>
						</div>

						<div className='flex-[1_0_100%]'></div>

						{/* -------------------------------------------------------------------------- */
						/*                                    btm                                      */
						/* -------------------------------------------------------------------------- */}

						{/* -------------------------------------------------------------------------- */
						/*                                  btm left                                  */
						/* -------------------------------------------------------------------------- */}

						<div
							className='border border-[--color-font-neutral] rounded-[0rem_0rem_0rem_9rem] h-[60rem] flex flex-[1]'
							ref={containerElStoreRegister}>
							ball
						</div>

						{/* -------------------------------------------------------------------------- */
						/*                                  btm right                                  */
						/* -------------------------------------------------------------------------- */}
						<div className='h-[60rem] flex-[1] flex gap-12'>
							{/* -------------------------------------------------------------------------- */
							/*                                 btm 1st col                                */
							/* -------------------------------------------------------------------------- */}
							<div className='flex flex-col gap-12 w-full'>
								{/* -------------------------------------------------------------------------- */
								/*                                btm language                                */
								/* -------------------------------------------------------------------------- */}
								<div
									className='border border-[--color-font-neutral] h-72 flex-1 flex flex-col'
									ref={containerElStoreRegister}>
									<div className='m-auto text-center'>
										<h3
											className='text-4xl mb-6'
											data-font-family='boxing'
											ref={textElStoreRegister}>{`Languages`}</h3>
										<ul className='font-satoshi text-xl leading-[1.5]'>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`Typescript (Javascript)`}</span>
											</li>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>
													{`HTML`}
												</span>
											</li>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`CSS/Sass`}</span>
											</li>
										</ul>
									</div>
								</div>
								{/* -------------------------------------------------------------------------- */
								/*                                btm Backend                                */
								/* -------------------------------------------------------------------------- */}
								<div
									className='border border-[--color-font-neutral] h-72 flex flex-1 flex-col'
									ref={containerElStoreRegister}>
									<div className='m-auto text-center'>
										<h3
											className='text-4xl mb-6'
											data-font-family='boxing'
											ref={textElStoreRegister}>{`Backend`}</h3>
										<ul className='font-satoshi text-xl leading-[1.5]'>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`Node.js`}</span>
											</li>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>
													{`Express`}
												</span>
											</li>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`Mongoose`}</span>
											</li>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`MongoDB`}</span>
											</li>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`RESTful API`}</span>
											</li>
										</ul>
									</div>
								</div>
								{/* -------------------------------------------------------------------------- */
								/*                             btm Tools & Platforms                          */
								/* -------------------------------------------------------------------------- */}

								<div
									className='border border-[--color-font-neutral] h-72 flex flex-1 flex-col'
									ref={containerElStoreRegister}>
									<div className='m-auto text-center'>
										<h3
											className='text-4xl mb-6 whitespace-pre-line'
											data-font-family='boxing'
											ref={textElStoreRegister}>{`Tools &\nPlatforms`}</h3>
										<ul className='font-satoshi text-xl leading-[1.5]'>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`Git (Sourcetree)`}</span>
											</li>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>
													{`GitLab`}
												</span>
											</li>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`Webpack`}</span>
											</li>
										</ul>
									</div>
								</div>
							</div>

							{/* -------------------------------------------------------------------------- */
							/*                                 btm 2nd col                                */
							/* -------------------------------------------------------------------------- */}
							<div className='flex flex-col gap-12 w-full'>
								{/* -------------------------------------------------------------------------- */
								/*                                btm frontend                                */
								/* -------------------------------------------------------------------------- */}
								<div
									className='border border-[--color-font-neutral] h-[39rem] flex flex-1 flex-col'
									ref={containerElStoreRegister}>
									<div className='m-auto text-center'>
										<h3
											className='text-4xl mb-6 whitespace-pre-line'
											data-font-family='boxing'
											ref={textElStoreRegister}>{`Frontend`}</h3>
										<ul className='font-satoshi text-xl leading-[1.5]'>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`React Router`}</span>
											</li>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>
													{`React Redux`}
												</span>
											</li>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`Next.js`}</span>
											</li>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`Angular`}</span>
											</li>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`Angular Universal`}</span>
											</li>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`RxJS`}</span>
											</li>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`Karma/Jasmine`}</span>
											</li>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`Tailwind CSS`}</span>
											</li>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`Bootstrap`}</span>
											</li>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`WebGL`}</span>
											</li>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`Three.js`}</span>
											</li>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`GSAP`}</span>
											</li>
										</ul>
									</div>
								</div>

								{/* -------------------------------------------------------------------------- */
								/*                                btm Design                                   */
								/* -------------------------------------------------------------------------- */}
								<div
									className='border border-[--color-font-neutral] rounded-[0rem_0rem_9rem_0rem] h-72 flex flex-col'
									ref={containerElStoreRegister}>
									<div className='m-auto text-center'>
										<h3
											className='text-4xl mb-6 whitespace-pre-line'
											data-font-family='boxing'
											ref={textElStoreRegister}>{`Design`}</h3>
										<ul className='font-satoshi text-xl leading-[1.5]'>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`Figma`}</span>
											</li>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>
													{`Illustrator`}
												</span>
											</li>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`Photoshop`}</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* -------------------------------------------------------------------------- */
					/*                                 fourth page                                 */
					/* -------------------------------------------------------------------------- */}

					<section className='flex gap-x-12 gap-y-6 flex-wrap'>
						{/* -------------------------------------------------------------------------- */
						/*                                    upper 1st                                */
						/* -------------------------------------------------------------------------- */}
						<header
							className='flex-[1] text-[13.75rem] border border-[--color-font-neutral] h-72 flex rounded-[9rem_9rem_0rem_0rem]'
							ref={containerElStoreRegister}>
							<h2
								className='m-auto leading-none'
								data-font-family='boxing'
								ref={textElStoreRegister}>
								{'experience'}
							</h2>
						</header>

						<div className='flex-[1_0_100%]'></div>

						{/* -------------------------------------------------------------------------- */
						/*                                    upper 2nd                                */
						/* -------------------------------------------------------------------------- */}

						<div
							className='flex-[0.3] text-6xl flex border border-[--color-font-neutral] h-72 rounded-[0rem_9rem_9rem_9rem]'
							ref={containerElStoreRegister}>
							<span
								className='m-auto'
								data-font-family='boxing'
								ref={textElStoreRegister}>
								{'[04.]'}
							</span>
						</div>
						<div
							className='flex-[1] text-7xl border border-[--color-font-neutral] h-72 flex'
							ref={containerElStoreRegister}>
							<h3
								className='m-auto leading-none'
								data-font-family='boxing'
								ref={textElStoreRegister}>
								{'Frontend Developer'}
							</h3>
						</div>

						<div className='flex-[1_0_100%]'></div>

						{/* -------------------------------------------------------------------------- */
						/*                                    btm left                                */
						/* -------------------------------------------------------------------------- */}

						<div
							className='border border-[--color-font-neutral] rounded-[0rem_0rem_0rem_9rem] h-[60rem] flex flex-[0.3]'
							ref={containerElStoreRegister}>
							ball
						</div>

						{/* -------------------------------------------------------------------------- */
						/*                                    btm right                                */
						/* -------------------------------------------------------------------------- */}

						<div className='flex-[1] text-7xl h-[60rem] flex gap-x-12 gap-y-6 flex-wrap'>
							{/* -------------------------------------------------------------------------- */
							/*                                btm right 1st row - title                    */
							/* -------------------------------------------------------------------------- */}
							<div
								className='border border-[--color-font-neutral] h-72 flex-1 flex flex-col'
								ref={containerElStoreRegister}>
								<div className='m-auto text-center'>
									<ul className='font-satoshi text-3xl leading-[1.5]'>
										<li>
											<span
												data-font-family='satoshi'
												ref={
													textElStoreRegister
												}>{`KUNYOU Technology Co., LTD., Full-time`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>
												{`Jun 2023 - Present, 1yr 1mos`}
											</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={
													textElStoreRegister
												}>{`Taipei, Taipei City, Taiwan, On-site`}</span>
										</li>
									</ul>
								</div>
							</div>

							<div className='flex-[1_0_100%]'></div>

							{/* -------------------------------------------------------------------------- */
							/*                                btm 2nd row - listed des                   */
							/* -------------------------------------------------------------------------- */}
							<div
								className='border border-[--color-font-neutral] h-72 flex-1 flex flex-col'
								ref={containerElStoreRegister}>
								<div className='m-auto text-center px-6'>
									<p
										className='text-xl font-satoshi leading-[1.5]'
										data-font-family='satoshi'
										ref={
											textElStoreRegister
										}>{`Facilitate the official website's SEO and achieve 100 in the Lighthouse index with Angular Universal's SSG tech`}</p>
								</div>
							</div>
							<div
								className='border border-[--color-font-neutral] h-72 flex-1 flex flex-col'
								ref={containerElStoreRegister}>
								<div className='m-auto text-center px-6 leading-[1.5]'>
									<p
										className='text-xl font-satoshi'
										data-font-family='satoshi'
										ref={
											textElStoreRegister
										}>{`Utilize UI framework PrimeNG and data-visualizing package ECharts to materialize UI/UX drafts and RWD`}</p>
								</div>
							</div>
							<div
								className='border border-[--color-font-neutral] h-72 flex-1 flex flex-col'
								ref={containerElStoreRegister}>
								<div className='m-auto text-center px-6 leading-[1.5]'>
									<p
										className='text-xl font-satoshi'
										data-font-family='satoshi'
										ref={
											textElStoreRegister
										}>{`Use RxJS to execute asynchronous requests and fulfill API integration`}</p>
								</div>
							</div>

							<div className='flex-[1_0_100%]'></div>

							{/* -------------------------------------------------------------------------- */
							/*                                btm 3nd row - listed des                   */
							/* -------------------------------------------------------------------------- */}
							<div
								className='border border-[--color-font-neutral] h-72 flex-1 flex flex-col'
								ref={containerElStoreRegister}>
								<div className='m-auto text-center px-6 leading-[1.5]'>
									<p
										className='text-xl font-satoshi'
										data-font-family='satoshi'
										ref={
											textElStoreRegister
										}>{`Use Karma/Jasmine to implement Unit Test and achieve 98% code coverage`}</p>
								</div>
							</div>
							<div
								className='border border-[--color-font-neutral] h-72 flex-1 flex flex-col'
								ref={containerElStoreRegister}>
								<div className='m-auto text-center px-6 leading-[1.5]'>
									<p
										className='text-xl font-satoshi'
										data-font-family='satoshi'
										ref={
											textElStoreRegister
										}>{`Acquire AA level of web accessibility standard in developing public sectors projects`}</p>
								</div>
							</div>
							<div
								className='border border-[--color-font-neutral] h-72 flex-1 flex flex-col rounded-[0rem_0rem_9rem_0rem]'
								ref={containerElStoreRegister}>
								<div className='m-auto text-center px-6'>{`square`}</div>
							</div>
						</div>
					</section>

					{/* -------------------------------------------------------------------------- */
					/*                                 fifth page                                 */
					/* -------------------------------------------------------------------------- */}
					<section className='flex gap-x-12 gap-y-6 flex-wrap'>
						{/* -------------------------------------------------------------------------- */
						/*                                    upper                                   */
						/* -------------------------------------------------------------------------- */}
						<header
							className='flex-[1] text-[13.75rem] border border-[--color-font-neutral] h-72 flex rounded-[9rem_9rem_9rem_9rem]'
							ref={containerElStoreRegister}>
							<h2
								className='m-auto leading-none'
								data-font-family='boxing'
								ref={textElStoreRegister}>
								{'project'}
							</h2>
						</header>

						<div
							className='flex-[0.3] text-6xl flex border border-[--color-font-neutral] h-72 rounded-[9rem_9rem_9rem_9rem]'
							ref={containerElStoreRegister}>
							<span
								data-font-family='boxing'
								className='m-auto'
								ref={textElStoreRegister}>
								{'[05.]'}
							</span>
						</div>

						<div className='flex-[1_0_100%]'></div>

						{/* -------------------------------------------------------------------------- */
						/*                                    content - port                           */
						/* -------------------------------------------------------------------------- */}

						{/* -------------------------------------------------------------------------- */
						/*                                    1st row left                              */
						/* -------------------------------------------------------------------------- */}

						<div
							className='border border-[--color-font-neutral] rounded-[0rem_0rem_0rem_0rem] h-[60rem] flex flex-[3] px-20'
							ref={containerElStoreRegister}
							data-parallax='home.webp'>
							<h2
								data-font-family='satoshi'
								className='m-auto text-4xl font-satoshi leading-[1.5] whitespace-pre-line'
								ref={textElStoreRegister}>
								<Image
									alt=''
									className='frame-left-item-icon'
								/>
							</h2>
						</div>

						{/* -------------------------------------------------------------------------- */
						/*                                    1st row right                            */
						/* -------------------------------------------------------------------------- */}

						<div className='flex flex-[1] flex-col gap-12'>
							<div
								className='border border-[--color-font-neutral] h-72 flex flex-col'
								ref={containerElStoreRegister}>
								<h3 className='m-auto text-center px-6'>
									<span
										className='text-5xl'
										data-font-family='boxing'
										ref={textElStoreRegister}>
										{`Layne Chen Portfolio ‘24`}
									</span>
								</h3>
							</div>

							<div
								className='border border-[--color-font-neutral] h-[39rem] flex flex-col'
								ref={containerElStoreRegister}>
								<div className='m-auto text-center'>
									<h3
										className='text-4xl mb-6'
										data-font-family='boxing'
										ref={textElStoreRegister}>{`# frontend`}</h3>
									<ul className='font-satoshi text-xl leading-[1.5]'>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`Typescript`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>
												{`HTML`}
											</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`CSS`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`Next.js`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`Tailwind CSS`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`Three.js`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`GSAP`}</span>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div className='flex-[1_0_100%]'></div>

						{/* -------------------------------------------------------------------------- */
						/*                                    2st row left                            */
						/* -------------------------------------------------------------------------- */}

						<div
							className='flex flex-[2] gap-12'
							ref={containerElStoreRegister}>
							<div className='border border-[--color-font-neutral] h-72 flex px-12 gap-12'>
								<h3 className='m-auto text-center'>
									<span
										className='text-4xl'
										data-font-family='boxing'
										ref={textElStoreRegister}>
										{`overview`}
									</span>
								</h3>

								<p
									className='m-auto text-xl font-satoshi whitespace-pre-line'
									data-font-family='satoshi'
									ref={textElStoreRegister}>
									{`Showcases my work and expertise as a fron tend developer and 3D enthusiast. Built using cutting-edge web technologies, the portfolio leverages the power of WebGL, Three.js, and GSAP, ensuring optimal performance, responsiveness, and immersive user experiences with custom shaders.\n\nIntegrates Static Site Generation (SSG) with Next.js, allowing for lightning-fast load times while improving crawlability for better SEO.`}
								</p>
							</div>
						</div>

						{/* -------------------------------------------------------------------------- */
						/*                                    2st row right                            */
						/* -------------------------------------------------------------------------- */}

						<div
							className='border border-[--color-font-neutral] h-72 flex flex-[1] items-center justify-center gap-12 text-4xl'
							ref={containerElStoreRegister}>
							<a
								ref={textElStoreRegister}
								data-font-family='boxing'>{`[ demo ]`}</a>
							<a
								ref={textElStoreRegister}
								data-font-family='boxing'>{`[ code ]`}</a>
						</div>

						<div className='flex-[1_0_100%]'></div>

						{/* -------------------------------------------------------------------------- */
						/*                                    content - share                         */
						/* -------------------------------------------------------------------------- */}

						{/* -------------------------------------------------------------------------- */
						/*                                    1st row left                              */
						/* -------------------------------------------------------------------------- */}

						<div
							className='border border-[--color-font-neutral] rounded-[0rem_0rem_0rem_0rem] h-[60rem] flex flex-[3] px-20'
							ref={containerElStoreRegister}
							data-parallax='home.webp'>
							<h2
								data-font-family='satoshi'
								className='m-auto text-4xl font-satoshi leading-[1.5] whitespace-pre-line'
								ref={textElStoreRegister}>
								<Image
									alt=''
									className='frame-left-item-icon'
								/>
							</h2>
						</div>

						{/* -------------------------------------------------------------------------- */
						/*                                    1st row right                            */
						/* -------------------------------------------------------------------------- */}

						<div className='flex flex-[1] flex-col gap-12'>
							<div
								className='border border-[--color-font-neutral] h-72 flex flex-col'
								ref={containerElStoreRegister}>
								<h3 className='m-auto text-center px-6'>
									<span
										className='text-5xl'
										data-font-family='boxing'
										ref={textElStoreRegister}>
										{`Share Your Memories`}
									</span>
								</h3>
							</div>

							<div
								className='border border-[--color-font-neutral] h-[39rem] flex flex-col'
								ref={containerElStoreRegister}>
								<div className='m-auto text-center'>
									<h3
										className='text-4xl mb-6'
										data-font-family='boxing'
										ref={textElStoreRegister}>{`# full stack`}</h3>
									<ul className='font-satoshi text-xl leading-[1.5]'>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`Javascript`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>
												{`HTML`}
											</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`CSS`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`React (hooks)`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`React Router`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`React Redux`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`Material UI`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`Node.js`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`Express`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`Mongoose`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`MongoDB`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`RESTful API`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`Axios`}</span>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div className='flex-[1_0_100%]'></div>

						{/* -------------------------------------------------------------------------- */
						/*                                    2st row left                            */
						/* -------------------------------------------------------------------------- */}

						<div
							className='flex flex-[2] gap-12'
							ref={containerElStoreRegister}>
							<div className='border border-[--color-font-neutral] h-72 flex px-12 gap-12'>
								<h3 className='m-auto text-center'>
									<span
										className='text-4xl'
										data-font-family='boxing'
										ref={textElStoreRegister}>
										{`overview`}
									</span>
								</h3>

								<p
									className='m-auto text-xl font-satoshi whitespace-pre-line'
									data-font-family='satoshi'
									ref={textElStoreRegister}>
									{`Create a platform where people could share treasured memories with anyone throughout the globe. Each user can register a whole new account to enable full functionality coming with the application, or just simply log in via Google Oauth 2.0 to enjoy the full access.\n\nYou can create, delete, edit your posts, and bookmark, comment on, or give a thumbs-up to other users' posts. Each post delivers Youtube video recommendations based on respective content. You can venture around further if any posts pique your interest.`}
								</p>
							</div>
						</div>

						{/* -------------------------------------------------------------------------- */
						/*                                    2st row right                            */
						/* -------------------------------------------------------------------------- */}

						<div
							className='border border-[--color-font-neutral] h-72 flex flex-[1] items-center justify-center gap-12 text-4xl'
							ref={containerElStoreRegister}>
							<a
								ref={textElStoreRegister}
								data-font-family='boxing'>{`[ demo ]`}</a>
							<a
								ref={textElStoreRegister}
								data-font-family='boxing'>{`[ code ]`}</a>
						</div>

						<div className='flex-[1_0_100%]'></div>

						{/* -------------------------------------------------------------------------- */
						/*                                    content - eng                           */
						/* -------------------------------------------------------------------------- */}
						{/* -------------------------------------------------------------------------- */
						/*                                    1st row left                              */
						/* -------------------------------------------------------------------------- */}
						<div
							className='border border-[--color-font-neutral] rounded-[0rem_0rem_0rem_0rem] h-[60rem] flex flex-[3] px-20'
							ref={containerElStoreRegister}
							data-parallax='home.webp'>
							<h2
								data-font-family='satoshi'
								className='m-auto text-4xl font-satoshi leading-[1.5] whitespace-pre-line'
								ref={textElStoreRegister}>
								<Image
									alt=''
									className='frame-left-item-icon'
								/>
							</h2>
						</div>

						{/* -------------------------------------------------------------------------- */
						/*                                    1st row right                             */
						/* -------------------------------------------------------------------------- */}

						<div className='flex flex-[1] flex-col gap-12'>
							<div
								className='border border-[--color-font-neutral] h-72 flex flex-col'
								ref={containerElStoreRegister}>
								<h3 className='m-auto text-center px-6'>
									<span
										className='text-5xl'
										data-font-family='boxing'
										ref={textElStoreRegister}>
										{`Learn English with Dictionary`}
									</span>
								</h3>
							</div>

							<div
								className='border border-[--color-font-neutral] h-[39rem] flex flex-col'
								ref={containerElStoreRegister}>
								<div className='m-auto text-center'>
									<h3
										className='text-4xl mb-6'
										data-font-family='boxing'
										ref={textElStoreRegister}>{`# frontend`}</h3>
									<ul className='font-satoshi text-xl leading-[1.5]'>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`Javascript`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>
												{`HTML`}
											</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`CSS`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`React (hooks)`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`React Redux`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`Material UI`}</span>
										</li>
										{/* <li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`Node.js`}</span>
										</li>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`Express`}</span>
										</li> */}
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`Axios`}</span>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div className='flex-[1_0_100%]'></div>

						{/* -------------------------------------------------------------------------- */
						/*                                    2st row left                            */
						/* -------------------------------------------------------------------------- */}

						<div
							className='flex flex-[2] gap-12'
							ref={containerElStoreRegister}>
							<div className='border border-[--color-font-neutral] h-72 flex px-12 gap-12'>
								<h3 className='m-auto text-center'>
									<span
										className='text-4xl'
										data-font-family='boxing'
										ref={textElStoreRegister}>
										{`overview`}
									</span>
								</h3>

								<p
									className='m-auto text-xl font-satoshi whitespace-pre-line'
									data-font-family='satoshi'
									ref={textElStoreRegister}>
									{`Solve the inconvenience of encountering unknown words upon reading an English passage and having to look up elsewhere. Read multiple professional-written passages fetched via New York Times API with a juxtaposed dictionary to facilitate English learning. Co-located design of text and relevant keyword tags. You can explore more in a topic-oriented way.`}
								</p>
							</div>
						</div>

						{/* -------------------------------------------------------------------------- */
						/*                                    2st row right                            */
						/* -------------------------------------------------------------------------- */}

						<div
							className='border border-[--color-font-neutral] h-72 flex flex-[1] items-center justify-center gap-12 text-4xl'
							ref={containerElStoreRegister}>
							<a
								ref={textElStoreRegister}
								data-font-family='boxing'>{`[ demo ]`}</a>
							<a
								ref={textElStoreRegister}
								data-font-family='boxing'>{`[ code ]`}</a>
						</div>
					</section>
				</div>

				<footer className='h-lvh w-full relative flex flex-col overflow-hidden'>
					<div className='flex flex-col px-12 pt-6'>
						<h3
							data-font-family='boxing'
							ref={textElStoreRegister}
							className='whitespace-pre-line text-7xl mb-6'>
							{`Let's connect.`}
						</h3>
						<h4
							data-font-family='boxing'
							ref={textElStoreRegister}
							className='whitespace-pre-line text-3xl'>{`Open for new challenges\nand collaborations.`}</h4>
					</div>
					<div className='text-xl flex flex-1 justify-between items-end px-12 -translate-y-36 leading-none'>
						<nav className='flex flex-col gap-6'>
							<a
								data-font-family='boxing'
								ref={textElStoreRegister}
								href=''>{`[ github ]`}</a>
							<a
								data-font-family='boxing'
								ref={textElStoreRegister}
								href=''>{`[ linkedin ]`}</a>
							<a
								data-font-family='boxing'
								ref={textElStoreRegister}
								href=''>{`[ resume ]`}</a>
							<a
								data-font-family='boxing'
								ref={textElStoreRegister}
								href=''>{`[ laynechensquare@gmail.com ]`}</a>
						</nav>
						<button
							data-font-family='boxing'
							ref={textElStoreRegister}
							className='text-right'>
							{'[ Back to top ]'}
						</button>
					</div>
					<header>
						<h1 className='text-center scale-y-[2] origin-bottom translate-y-11 text-[12.625rem] leading-none'>
							<span
								data-font-family='boxing'
								data-scale-y='2'
								ref={textElStoreRegister}>
								{'GET IN TOUCH'}
							</span>
						</h1>
					</header>
				</footer>
			</article>
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
				className='top-[36px] absolute'
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

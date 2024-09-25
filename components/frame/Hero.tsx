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

export default function Hero({}) {
	const { progress, item } = useProgress();
	const torsoRef = useRef(null);

	const [isVisible, setIsVisible] = useState(true);

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
			<Menu />

			<article
				className={`w-full top-0 left-0 font-boxing z-10 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
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
						<h1 className='text-center scale-y-[2] origin-bottom text-[13.5rem] leading-none translate-y-11'>
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
							className='flex-[0.3] text-6xl flex border border-neutral h-72 rounded-[9rem_9rem_9rem_0rem]'
							ref={containerElStoreRegister}>
							<span
								className='m-auto'
								data-font-family='boxing'
								ref={textElStoreRegister}>
								{'[02.]'}
							</span>
						</div>
						<header
							className='flex-[1] text-[13.75rem] border border-neutral h-72 flex rounded-[9rem_9rem_0rem_9rem]'
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
							className='border border-neutral rounded-[0rem_0rem_0rem_9rem] h-[39rem] flex flex-[1] px-20'
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
							className='flex-[1] text-[13.75rem] border border-neutral h-72 flex rounded-[9rem_9rem_9rem_0rem]'
							ref={containerElStoreRegister}>
							<h2
								className='m-auto leading-none'
								data-font-family='boxing'
								ref={textElStoreRegister}>
								{'skill'}
							</h2>
						</header>

						<div
							className='flex-[0.3] text-6xl flex border border-neutral h-72 rounded-[9rem_9rem_0rem_9rem]'
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
							className='border border-neutral rounded-[0rem_0rem_0rem_9rem] h-[60rem] flex flex-[1]'
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
									className='border border-neutral h-72 flex-1 flex flex-col'
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
									className='border border-neutral h-72 flex flex-1 flex-col'
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
									className='border border-neutral h-72 flex flex-1 flex-col'
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
									className='border border-neutral h-[39rem] flex flex-1 flex-col'
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
									className='border border-neutral rounded-[0rem_0rem_9rem_0rem] h-72 flex flex-col'
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
							className='flex-[1] text-[13.75rem] border border-neutral h-72 flex rounded-[9rem_9rem_0rem_0rem]'
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
							className='flex-[0.3] text-6xl flex border border-neutral h-72 rounded-[0rem_9rem_9rem_9rem]'
							ref={containerElStoreRegister}>
							<span
								className='m-auto'
								data-font-family='boxing'
								ref={textElStoreRegister}>
								{'[04.]'}
							</span>
						</div>
						<div
							className='flex-[1] text-7xl border border-neutral h-72 flex'
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
							className='border border-neutral rounded-[0rem_0rem_0rem_9rem] h-[60rem] flex flex-[0.3]'
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
								className='border border-neutral h-72 flex-1 flex flex-col'
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
								className='border border-neutral h-72 flex-1 flex flex-col'
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
								className='border border-neutral h-72 flex-1 flex flex-col'
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
								className='border border-neutral h-72 flex-1 flex flex-col'
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
								className='border border-neutral h-72 flex-1 flex flex-col'
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
								className='border border-neutral h-72 flex-1 flex flex-col'
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
								className='border border-neutral h-72 flex-1 flex flex-col rounded-[0rem_0rem_9rem_0rem]'
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
							className='flex-[1] text-[13.75rem] border border-neutral h-72 flex rounded-[9rem_9rem_9rem_9rem]'
							ref={containerElStoreRegister}>
							<h2
								className='m-auto leading-none'
								data-font-family='boxing'
								ref={textElStoreRegister}>
								{'project'}
							</h2>
						</header>

						<div
							className='flex-[0.3] text-6xl flex border border-neutral h-72 rounded-[9rem_9rem_9rem_9rem]'
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
							className='border border-neutral rounded-[0rem_0rem_0rem_0rem] h-[60rem] flex flex-[3] px-20'
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
								className='border border-neutral h-72 flex flex-col'
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
								className='border border-neutral h-[39rem] flex flex-col'
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
							<div className='border border-neutral h-72 flex px-12 gap-12'>
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
							className='border border-neutral h-72 flex flex-[1] items-center justify-center gap-12 text-4xl text-highlight'
							ref={containerElStoreRegister}>
							<a
								ref={textElStoreRegister}
								data-font-family='boxing'
								data-font-highlight>{`[ demo ]`}</a>
							<a
								ref={textElStoreRegister}
								data-font-highlight
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
							className='border border-neutral rounded-[0rem_0rem_0rem_0rem] h-[60rem] flex flex-[3] px-20'
							ref={containerElStoreRegister}
							data-parallax='previewShareYourMemories'>
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
								className='border border-neutral h-72 flex flex-col'
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
								className='border border-neutral h-[39rem] flex flex-col'
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
							<div className='border border-neutral h-72 flex px-12 gap-12'>
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
							className='border border-neutral h-72 flex flex-[1] items-center justify-center gap-12 text-4xl'
							ref={containerElStoreRegister}>
							<a
								ref={textElStoreRegister}
								data-font-highlight
								data-font-family='boxing'>{`[ demo ]`}</a>
							<a
								ref={textElStoreRegister}
								data-font-highlight
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
							className='border border-neutral rounded-[0rem_0rem_0rem_0rem] h-[60rem] flex flex-[3] px-20'
							ref={containerElStoreRegister}
							data-parallax='previewLearnEnglishDictionary'>
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
								className='border border-neutral h-72 flex flex-col'
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
								className='border border-neutral h-[39rem] flex flex-col'
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
							<div className='border border-neutral h-72 flex px-12 gap-12'>
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
							className='border border-neutral h-72 flex flex-[1] items-center justify-center gap-12 text-4xl'
							ref={containerElStoreRegister}>
							<a
								ref={textElStoreRegister}
								data-font-highlight
								data-font-family='boxing'>{`[ demo ]`}</a>
							<a
								ref={textElStoreRegister}
								data-font-highlight
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
								data-font-highlight
								href=''>{`[ github ]`}</a>
							<a
								data-font-family='boxing'
								ref={textElStoreRegister}
								data-font-highlight
								href=''>{`[ linkedin ]`}</a>
							<a
								data-font-family='boxing'
								ref={textElStoreRegister}
								data-font-highlight
								href=''>{`[ resume ]`}</a>
							<a
								data-font-family='boxing'
								ref={textElStoreRegister}
								data-font-highlight
								href=''>{`[ laynechensquare@gmail.com ]`}</a>
						</nav>
						<button
							data-font-family='boxing'
							ref={textElStoreRegister}
							data-font-highlight
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

function clamp(val, min, max) {
	return Math.min(Math.max(val, min), max);
}

function mapRange(value, start1, stop1, start2, stop2) {
	return clamp(start2 + ((value - start1) * (stop2 - start2)) / (stop1 - start1), 0, 100);
}

function Menu() {
	const [isOpen, setIsOpen] = useState(false);
	const [isOverlayCloseHover, setIsOverlayCloseHover] = useState(false);
	const overlayNavRef = useRef(null);

	useGSAP(
		() => {
			const tl = gsap.timeline();

			if (isOpen) {
				gsap.to(overlayNavRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.2, ease: 'sine.in' });
				tl.to('[data-action-row]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' })
					.to('[data-home-row]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' }, '<5%')
					.to('[data-about-row]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' }, '<5%')
					.to('[data-skill-row]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' }, '<5%')
					.to('[data-experience-row]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' }, '<5%')
					.to('[data-project-row]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' }, '<5%')
					.to('[data-contact-row]', { x: 0, duration: 1, ease: 'elastic.out(0.75, 0.5)' }, '<5%');
			}
			if (!isOpen) {
				gsap.to(overlayNavRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.2, ease: 'sine.in' });
				tl.to('[data-action-row]', { x: '100%', duration: 1, ease: 'elastic.out(0.4, 0.5)' })
					.to('[data-home-row]', { x: '100%', duration: 1, ease: 'elastic.out(0.4, 0.5)' }, '<5%')
					.to('[data-about-row]', { x: '100%', duration: 1, ease: 'elastic.out(0.4, 0.5)' }, '<5%')
					.to('[data-skill-row]', { x: '100%', duration: 1, ease: 'elastic.out(0.4, 0.5)' }, '<5%')
					.to('[data-experience-row]', { x: '100%', duration: 1, ease: 'elastic.out(0.4, 0.5)' }, '<5%')
					.to('[data-project-row]', { x: '100%', duration: 1, ease: 'elastic.out(0.4, 0.5)' }, '<5%')
					.to('[data-contact-row]', { x: '100%', duration: 1, ease: 'elastic.out(0.4, 0.5)' }, '<5%');
			}
		},
		{ dependencies: [isOpen], scope: overlayNavRef },
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

	console.log('re render');

	return (
		<>
			<nav
				className='flex gap-6 py-2 pl-12 pr-2 rounded-full items-center top-6 fixed text-sm z-20 max-w-[60rem] m-auto leading-none font-boxing backdrop-blur-lg backdrop-saturate-[250%] backdrop-hue-rotate-[9deg] border border-[#ffffff15] left-1/2 -translate-x-1/2'
				style={{ textShadow: `0 0 1px black` }}>
				<a
					href=''
					className=''>{`layne chen`}</a>

				<div className={`border-r border-neutral h-7`}></div>

				<p className='flex-1 text-center'>{`portfolio#2024`}</p>

				<div className={`border-r border-neutral h-7`}></div>

				<div className='flex gap-4'>
					<a href=''>{`[ github ]`}</a>
					<a href=''>{`[ linkedin ]`}</a>
					<a href=''>{`[ resume ]`}</a>
					<a href=''>{`[ mail ]`}</a>
				</div>

				<button
					className='rounded-full aspect-square border border-neutral flex flex-col gap-0.5 justify-center p-2'
					onClick={() => setIsOpen(!isOpen)}>
					<div className='bg-neutral w-5 h-0.5'></div>
					<div className='bg-neutral w-5 h-0.5'></div>
					<div className='bg-neutral w-5 h-0.5'></div>
				</button>
			</nav>

			<nav
				className={`fixed z-30 top-0 right-0 flex flex-col h-lvh w-full items-end font-boxing text-neutralContrast opacity-0`}
				ref={overlayNavRef}>
				<div
					className='bg-primary text-4xl flex-[1] w-[max-content] flex px-12 py-4 items-center gap-20'
					data-action-row>
					<button
						className='px-6 rounded-full border border-neutralContrast aspect-square h-[min-content] flex flex-col justify-center items-center origin-center'
						onClick={() => setIsOpen(!isOpen)}
						onPointerEnter={() => setIsOverlayCloseHover(true)}
						onPointerLeave={() => setIsOverlayCloseHover(false)}>
						<div
							className={`w-[3rem] h-[2px] bg-neutralContrast origin-center translate-y-1/2`}
							data-close-up-bar></div>
						<div
							className={`w-[3rem] h-[2px] bg-neutralContrast origin-center -translate-y-1/2`}
							data-close-btm-bar></div>
					</button>
					<div className='flex gap-8 items-center'>
						<OverlayNavLinkButton label={`github`} />
						<OverlayNavLinkButton label={`linkedin`} />
						<OverlayNavLinkButton label={`resume`} />
						<OverlayNavLinkButton label={`mail`} />
					</div>
				</div>
				<div
					className='bg-primary flex-[1] w-[55rem] flex items-center justify-end px-12 py-4'
					data-home-row>
					<a href=''>
						<span className='text-[6rem] leading-none mr-8'>{`home`}</span>
						<span className='text-4xl'>{`[00.]`}</span>
					</a>
				</div>
				<div
					className='bg-primary flex-[1] w-[47.5rem] flex items-center justify-end px-12 py-4'
					data-about-row>
					<a href=''>
						<span className='text-[6.5rem] leading-none mr-8'>{`about`}</span>
						<span className='text-4xl'>{`[01.]`}</span>
					</a>
				</div>
				<div
					className='bg-primary flex-[1] w-[42rem] flex items-center justify-end px-12 py-4'
					data-skill-row>
					<a href=''>
						<span className='text-[6rem] leading-none mr-8'>{`skill`}</span>
						<span className='text-4xl'>{`[02.]`}</span>
					</a>
				</div>
				<div
					className='bg-primary flex-[1] w-[75rem] flex items-center justify-end px-12 py-4'
					data-experience-row>
					<a href=''>
						<span className='text-[6rem] leading-none mr-8'>{`experience`}</span>
						<span className='text-4xl'>{`[03.]`}</span>
					</a>
				</div>
				<div
					className='bg-primary flex-[1] w-[85rem] flex items-center justify-end px-12 py-4'
					data-project-row>
					<a href=''>
						<span className='text-[6rem] leading-none mr-8'>{`project`}</span>
						<span className='text-4xl'>{`[04.]`}</span>
					</a>
				</div>
				<div
					className='bg-primary flex-[1] w-[95rem] flex items-center px-12 py-4 justify-between gap-72'
					data-contact-row>
					<div className='flex gap-8 flex-wrap'>
						<div className='w-6 aspect-square rounded-full bg-[#00000050]'></div>
						<div className='w-6 aspect-square rounded-full bg-[#00000050]'></div>
						<div className='w-6 aspect-square rounded-full bg-[#00000050]'></div>
						<div className='w-6 aspect-square rounded-full bg-[#00000050]'></div>
						<div className='w-6 aspect-square rounded-full bg-[#00000050]'></div>
						<div className='w-6 aspect-square rounded-full bg-[#00000050]'></div>
						<div className='w-6 aspect-square rounded-full bg-[#00000050]'></div>
						<div className='w-6 aspect-square rounded-full bg-[#00000050]'></div>
						<div className='w-6 aspect-square rounded-full bg-[#00000050]'></div>
						<div className='w-6 aspect-square rounded-full bg-[#00000050]'></div>
						<div className='w-6 aspect-square rounded-full bg-[#00000050]'></div>
						<div className='w-6 aspect-square rounded-full bg-[#00000050]'></div>
						<div className='w-6 aspect-square rounded-full bg-[#00000050]'></div>
						<div className='w-6 aspect-square rounded-full bg-[#00000050]'></div>
						<div className='w-6 aspect-square rounded-full bg-[#00000050]'></div>
						<div className='w-6 aspect-square rounded-full bg-[#00000050]'></div>
						<div className='w-6 aspect-square rounded-full bg-[#00000050]'></div>
						<div className='w-6 aspect-square rounded-full bg-[#00000050]'></div>
						<div className='w-6 aspect-square rounded-full bg-[#00000050]'></div>
						<div className='w-6 aspect-square rounded-full bg-[#00000050]'></div>
					</div>
					<a href=''>
						<span className='text-[6rem] leading-none mr-8'>{`contact`}</span>
						<span className='text-4xl'>{`[99.]`}</span>
					</a>
				</div>
			</nav>
		</>
	);
}

function OverlayNavLinkButton({ label }) {
	const [isHover, setIsHover] = useState(false);
	const pointerRef = useRef({ xPercent: 0, yPercent: 0 });
	const buttonRef = useRef(null);
	const labelRef = useRef(null);
	const flairRef = useRef(null);

	function handlePointerEnter(e) {
		const { clientX, clientY } = e;
		const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
		const originX = clientX - left;
		const originY = clientY - top;
		const mapOriginX = mapRange(originX, 0, width, 0, 100);
		const mapOriginY = mapRange(originY, 0, height, 0, 100);

		pointerRef.current = {
			xPercent: mapOriginX,
			yPercent: mapOriginY,
		};

		setIsHover(true);
	}

	useGSAP(
		() => {
			const tl = gsap.timeline();

			const ease = 'sine.in';

			const { xPercent, yPercent } = pointerRef.current;

			const configPositioningCircle = {
				xPercent,
				yPercent,
				duration: 0,
			};
			const configScale = {
				scale: isHover ? 1 : 0,
				duration: 0.25,
				ease,
			};

			const configDisplace = {
				y: isHover ? '0.1rem' : 0,
				boxShadow: isHover
					? `0px 0.275rem 0px 0px var(--color-abysmal)`
					: `0px 0.375rem 0px 0px var(--color-abysmal)`,
				duration: 0.25,
				ease,
			};

			if (isHover) {
				tl.to(flairRef.current, configPositioningCircle)
					.to(flairRef.current, configScale)
					.to(buttonRef.current, configDisplace, '<');
			} else {
				tl.to(flairRef.current, configScale).to(buttonRef.current, configDisplace, '<');
			}
		},
		{ dependencies: [isHover], scope: buttonRef },
	);

	return (
		<>
			<a
				ref={buttonRef}
				onPointerEnter={e => handlePointerEnter(e)}
				onPointerLeave={() => setIsHover(false)}
				className='px-9 py-3.5 text-2xl rounded-full border border-neutralContrast bg-neutral h-[min-content] relative overflow-hidden cursor-pointer'>
				<span
					ref={flairRef}
					className={`absolute top-0 left-0 bottom-0 right-0 pointer-events-none scale-0 origin-top-left 
					before:content-[''] before:absolute before:top-0 before:bottom-0 before:right-0 before:left-0 before:w-[200%] before:aspect-square 
					before:bg-[#e8fe25] before:border-2 before:border-neutralContrast before:rounded-full 
					before:-translate-x-1/2 before:-translate-y-1/2 before:pointer-events-none`}></span>
				<span
					ref={labelRef}
					className='relative block'>
					{label}
				</span>
			</a>
		</>
	);
}

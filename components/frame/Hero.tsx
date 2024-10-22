import React, { useEffect, useRef, useState, MouseEvent } from 'react';
import Image from 'next/image';
import { Html, useProgress } from '@react-three/drei';

import { useDomStore, useNavStore, usePlatformStore } from '@/store';
import { useThree } from '@react-three/fiber';

import previewShareYourMemories from '@/public/frame/project-preview-share-your-memories.webp';
import previewLearnEnglishDictionary from '@/public/frame/project-preview-learn-english-dictionary.webp';
import previewLayneChenPortfolio from '@/public/frame/project-preview-layne-chen-portfolio-2024.webp';

// import resumePdf from '@/public/frame/layne_res_all.pdf';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Hero({}) {
	const [isVisible, setIsVisible] = useState(true);

	const textElStoreRegister = useDomStore(state => state?.textElRegister);
	const torsoElStoreRegister = useDomStore(state => state?.torsoElRegister);
	const containerElStoreRegister = useDomStore(state => state?.containerElRegister);
	const anchorElStoreRegister = useDomStore(state => state?.anchorElRegister);

	return (
		<>
			{/* <div className='absolute left-1/4 border-r border-stone-800 mix-blend-color-dodge h-full z-10'></div> */}
			{/* <div className='absolute left-1/2 border-r border-stone-800 mix-blend-color-dodge h-full z-10'></div> */}
			{/* <div className='absolute left-3/4 border-r border-stone-800 mix-blend-color-dodge h-full z-10'></div> */}
			<Menu />

			<article
				className={`w-full relative z-10 font-boxing opacity-0 pointer-events-none`}
				ref={torsoElStoreRegister}>
				{/* -------------------------------------------------------------------------- */
				/*                                first page                                 */
				/* -------------------------------------------------------------------------- */}
				<section
					className='h-lvh w-full relative flex flex-col overflow-hidden'
					id='home'>
					<div className='flex flex-[1] justify-between items-center px-12 gap-60'>
						<h2 className='text-xl leading-[1.25]'>
							<span
								data-font-family='boxing'
								ref={textElStoreRegister}>
								{'Front-end Developer'}
							</span>
						</h2>
						<h2 className='text-right whitespace-pre-line leading-[1.25]'>
							<span
								data-font-family='boxing'
								ref={textElStoreRegister}>
								{'Based in Taipei,\nTaiwan'}
							</span>
						</h2>
					</div>
					<header>
						<h1 className='text-center scale-y-[2] origin-bottom text-[13.4rem] leading-none translate-y-11'>
							<span
								data-font-family='boxing'
								data-scale-y='2'
								ref={textElStoreRegister}>
								{'LAYNE CHEN'}
							</span>
						</h1>
					</header>
				</section>

				<div className='p-[6rem_3rem] flex flex-col gap-12'>
					{/* -------------------------------------------------------------------------- */
					/*                                 second page                                 */
					/* -------------------------------------------------------------------------- */}

					<section
						className='flex flex-wrap gap-x-12 gap-y-6'
						id='about'>
						{/* -------------------------------------------------------------------------- */
						/*                                    upper                                   */
						/* -------------------------------------------------------------------------- */}
						<div
							className='flex-[0.3] flex border border-neutral min-h-72 rounded-[12rem_12rem_12rem_0rem] p-20'
							ref={containerElStoreRegister}>
							<h2 className='m-auto text-6xl'>
								<span
									data-font-family='boxing'
									ref={textElStoreRegister}>
									{'[02.]'}
								</span>
							</h2>
						</div>
						<header
							className='flex-[1] text-[13.75rem] border border-neutral min-h-72 flex rounded-[12rem_12rem_0rem_12rem] p-20'
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
							className='border border-neutral min-h-[39rem] flex flex-[1] p-20 rounded-[0rem_0rem_0rem_0rem] md:rounded-[0rem_0rem_0rem_9rem]'
							ref={containerElStoreRegister}>
							<h3 className='m-auto text-4xl font-satoshi leading-[1.5] whitespace-pre-line'>
								<span
									data-font-family='satoshi'
									ref={textElStoreRegister}>
									{`Proficient in TypeScript/JavaScript, React, Angular, Node.js, and MongoDB. Skilled in SSG/SSR, RESTful APIs, and UX design, with a focus on performance and aesthetics.`}
								</span>
							</h3>
						</div>

						<div className='flex-[1_0_100%] block md:hidden'></div>

						<div
							className='flex-[1] border border-[--color-font-neutral] min-h-[120rem] rounded-[0rem_0rem_9rem_9rem] p-20 md:rounded-[0rem_0rem_9rem_0rem] md:min-h-[39rem]'
							ref={el => {
								containerElStoreRegister(el);
								anchorElStoreRegister(el);
							}}
							data-anchor='ABOUT'></div>
					</section>

					{/* -------------------------------------------------------------------------- */
					/*                                 third page                                 */
					/* -------------------------------------------------------------------------- */}

					<section
						className='flex gap-x-12 gap-y-6 flex-wrap'
						id='skill'>
						{/* -------------------------------------------------------------------------- */
						/*                                    upper                                   */
						/* -------------------------------------------------------------------------- */}
						<header
							className='flex-[1] text-[13.75rem] border border-neutral min-h-72 flex rounded-[12rem_12rem_12rem_0rem] p-20'
							ref={containerElStoreRegister}>
							<h2
								className='m-auto leading-none'
								data-font-family='boxing'
								ref={textElStoreRegister}>
								{'skill'}
							</h2>
						</header>

						<div
							className='flex-[0.3] flex border border-neutral min-h-72 rounded-[12rem_12rem_0rem_12rem] p-20'
							ref={containerElStoreRegister}>
							<h2 className='m-auto text-6xl'>
								<span
									data-font-family='boxing'
									ref={textElStoreRegister}>
									{'[03.]'}
								</span>
							</h2>
						</div>

						<div className='flex-[1_0_100%]'></div>

						{/* -------------------------------------------------------------------------- */
						/*                                    btm                                      */
						/* -------------------------------------------------------------------------- */}

						{/* -------------------------------------------------------------------------- */
						/*                                  btm left                                  */
						/* -------------------------------------------------------------------------- */}

						<div
							className='border border-neutral min-h-[60rem] flex flex-[1] rounded-[0rem_0rem_0rem_9rem]'
							ref={el => {
								containerElStoreRegister(el);
								anchorElStoreRegister(el);
							}}
							data-anchor='SKILL'></div>

						{/* -------------------------------------------------------------------------- */
						/*                                  btm right                                  */
						/* -------------------------------------------------------------------------- */}
						<div className='min-h-[60rem] flex-[0.3] flex gap-12'>
							{/* -------------------------------------------------------------------------- */
							/*                                 btm 1st col                                */
							/* -------------------------------------------------------------------------- */}
							<div className='flex flex-col gap-12 flex-[1] whitespace-nowrap'>
								{/* -------------------------------------------------------------------------- */
								/*                                btm language                                */
								/* -------------------------------------------------------------------------- */}
								<div
									className='border border-neutral flex-[1] flex p-20'
									ref={containerElStoreRegister}>
									<div className='m-auto text-center'>
										<h3 className='text-4xl mb-6 leading-[1.5]'>
											<span
												data-font-family='boxing'
												ref={textElStoreRegister}>
												{`Languages`}
											</span>
										</h3>
										<ul className='font-satoshi text-xl leading-[1.5]'>
											<li>
												<span
													data-font-family='satoshi'
													ref={textElStoreRegister}>{`TypeScript (JavaScript)`}</span>
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
								/*                                btm frontend                                */
								/* -------------------------------------------------------------------------- */}

								<div
									className='border border-neutral flex flex-[1] p-20'
									ref={containerElStoreRegister}>
									<div className='m-auto text-center'>
										<h3 className='text-4xl mb-6 leading-[1.5]'>
											<span
												data-font-family='boxing'
												ref={textElStoreRegister}>
												{`Frontend`}
											</span>
										</h3>
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
								/*                                btm Backend                                */
								/* -------------------------------------------------------------------------- */}
								<div
									className='border border-neutral flex flex-[1] p-20'
									ref={containerElStoreRegister}>
									<div className='m-auto text-center'>
										<h3 className='text-4xl mb-6 leading-[1.5]'>
											<span
												data-font-family='boxing'
												ref={textElStoreRegister}>
												{`Backend`}
											</span>
										</h3>
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
									className='border border-neutral flex flex-[1] p-20'
									ref={containerElStoreRegister}>
									<div className='m-auto text-center'>
										<h3 className='text-4xl mb-6 leading-[1.5] whitespace-pre-line'>
											<span
												data-font-family='boxing'
												ref={textElStoreRegister}>
												{`Tools &\nPlatforms`}
											</span>
										</h3>
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

								{/* -------------------------------------------------------------------------- */
								/*                                btm Design                                   */
								/* -------------------------------------------------------------------------- */}
								<div
									className='border border-neutral rounded-[0rem_0rem_9rem_0rem] flex p-20'
									ref={containerElStoreRegister}>
									<div className='m-auto text-center'>
										<h3 className='text-4xl mb-6 leading-[1.5]'>
											<span
												data-font-family='boxing'
												ref={textElStoreRegister}>
												{`Design`}
											</span>
										</h3>
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

					<section
						className='flex gap-x-12 gap-y-6 flex-wrap'
						id='experience'>
						{/* -------------------------------------------------------------------------- */
						/*                                    upper 1st                                */
						/* -------------------------------------------------------------------------- */}
						<header
							className='flex-[1] text-[13.75rem] border border-neutral min-h-72 flex rounded-[12rem_12rem_0rem_0rem] p-20'
							ref={containerElStoreRegister}>
							<h2 className='m-auto leading-none'>
								<span
									data-font-family='boxing'
									ref={textElStoreRegister}>
									{'experience'}
								</span>
							</h2>
						</header>

						<div className='flex-[1_0_100%]'></div>

						{/* -------------------------------------------------------------------------- */
						/*                                    upper 2nd                                */
						/* -------------------------------------------------------------------------- */}

						<div
							className='flex-[0.3] flex border border-neutral min-h-96 rounded-[0rem_12rem_12rem_12rem] p-20'
							ref={containerElStoreRegister}>
							<h2 className='m-auto text-6xl'>
								<span
									data-font-family='boxing'
									ref={textElStoreRegister}>
									{'[04.]'}
								</span>
							</h2>
						</div>
						<div
							className='flex-[1] text-7xl border border-neutral min-h-96 flex p-20 rounded-[12rem_0rem_0rem_12rem]'
							ref={containerElStoreRegister}>
							<h3 className='m-auto leading-none text-center'>
								<span
									data-font-family='boxing'
									ref={textElStoreRegister}>
									{'Frontend Developer'}
								</span>
							</h3>
						</div>

						<div className='flex-[1_0_100%]'></div>

						{/* -------------------------------------------------------------------------- */
						/*                                    btm left                                */
						/* -------------------------------------------------------------------------- */}

						<div
							className='border border-neutral min-h-[60rem] flex flex-[1] rounded-[0rem_0rem_0rem_0rem] md:flex-[0.3] md:rounded-[0rem_0rem_0rem_9rem] p-[3.25rem]'
							ref={el => {
								containerElStoreRegister(el);
								anchorElStoreRegister(el);
							}}
							data-anchor='EXPERIENCE'
							data-anchor-mirror></div>

						<div className='block flex-[1_0_100%] md:hidden'></div>

						{/* -------------------------------------------------------------------------- */
						/*                                    btm right                                */
						/* -------------------------------------------------------------------------- */}

						<div className='flex-[1] text-7xl min-h-[60rem] flex gap-12 flex-wrap'>
							{/* -------------------------------------------------------------------------- */
							/*                                btm right 1st row - title                    */
							/* -------------------------------------------------------------------------- */}
							<div
								className='border border-neutral min-h-72 flex-[1_1_100%] flex p-20'
								ref={containerElStoreRegister}>
								<div className='m-auto text-center'>
									<ul className='font-satoshi text-3xl leading-[1.5]'>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>
												{`KUNYOU Technology Co., LTD., Full-time`}
											</span>
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
												ref={textElStoreRegister}>
												{`Taipei, Taipei City, Taiwan, On-site`}
											</span>
										</li>
									</ul>
								</div>
							</div>

							{/* -------------------------------------------------------------------------- */
							/*                                btm 2nd row - listed des                   */
							/* -------------------------------------------------------------------------- */}
							<div
								className='border border-neutral min-h-72 flex flex-[1_30%] p-20 min-w-[180px]'
								ref={containerElStoreRegister}>
								<div className='m-auto text-center'>
									<p className='text-xl font-satoshi leading-[1.5]'>
										<span
											data-font-family='satoshi'
											ref={textElStoreRegister}>
											{`Facilitate the official website's SEO and achieve 100 in the Lighthouse index with Angular Universal's SSG tech`}
										</span>
									</p>
								</div>
							</div>
							<div
								className='border border-neutral min-h-72 flex-[1_30%] flex min-w-[180px] p-20'
								ref={containerElStoreRegister}>
								<div className='m-auto text-center'>
									<p className='text-xl font-satoshi leading-[1.5]'>
										<span
											data-font-family='satoshi'
											ref={textElStoreRegister}>
											{`Utilize UI framework PrimeNG and data-visualizing package ECharts to materialize UI/UX drafts and RWD`}
										</span>
									</p>
								</div>
							</div>
							<div
								className='border border-neutral min-h-72 flex-[1_30%] flex min-w-[180px] p-20'
								ref={containerElStoreRegister}>
								<div className='m-auto text-center'>
									<p className='text-xl font-satoshi leading-[1.5]'>
										<span
											data-font-family='satoshi'
											ref={textElStoreRegister}>
											{`Use RxJS to execute asynchronous requests and fulfill API integration`}
										</span>
									</p>
								</div>
							</div>

							{/* -------------------------------------------------------------------------- */
							/*                                btm 3nd row - listed des                   */
							/* -------------------------------------------------------------------------- */}
							<div
								className='border border-neutral min-h-72 flex-[1_30%] flex min-w-[180px] p-20'
								ref={containerElStoreRegister}>
								<div className='m-auto text-center'>
									<p className='text-xl font-satoshi leading-[1.5]'>
										<span
											data-font-family='satoshi'
											ref={textElStoreRegister}>
											{`Use Karma/Jasmine to implement Unit Test and achieve 98% code coverage`}
										</span>
									</p>
								</div>
							</div>
							<div
								className='border border-neutral min-h-72 flex-[1_30%] flex min-w-[180px] p-20'
								ref={containerElStoreRegister}>
								<div className='m-auto text-center'>
									<p className='text-xl font-satoshi leading-[1.5]'>
										<span
											data-font-family='satoshi'
											ref={textElStoreRegister}>
											{`Acquire AA level of web accessibility standard in developing public sectors projects`}
										</span>
									</p>
								</div>
							</div>
							<div
								className='border border-neutral min-h-[120rem] flex-[1_100%] flex min-w-[180px] rounded-[0rem_0rem_9rem_9rem] p-20 md:rounded-[0rem_0rem_9rem_0rem] md:min-h-72'
								ref={el => {
									containerElStoreRegister(el);
									anchorElStoreRegister(el);
								}}
								data-anchor='EXPERIENCE'
								data-anchor-mirror>
								<div className='m-auto text-center'></div>
							</div>
						</div>
					</section>

					{/* -------------------------------------------------------------------------- */
					/*                                 fifth page                                 */
					/* -------------------------------------------------------------------------- */}
					<section
						className='flex gap-x-12 gap-y-6 flex-wrap'
						id='project'>
						{/* -------------------------------------------------------------------------- */
						/*                                    upper                                   */
						/* -------------------------------------------------------------------------- */}
						<header
							className='flex-[1] text-[13.75rem] border border-neutral min-h-72 flex rounded-[12rem_12rem_12rem_12rem] p-20'
							ref={containerElStoreRegister}>
							<h2
								className='m-auto leading-none'
								data-font-family='boxing'
								ref={textElStoreRegister}>
								{'project'}
							</h2>
						</header>
						<div
							className='flex-[0.3] flex border border-neutral min-h-72 rounded-[12rem_12rem_12rem_12rem] p-20'
							ref={containerElStoreRegister}>
							<h2 className='m-auto text-6xl'>
								<span
									data-font-family='boxing'
									ref={textElStoreRegister}>
									{'[05.]'}
								</span>
							</h2>
						</div>
						<div className='flex-[1_0_100%]'></div>
						{/* -------------------------------------------------------------------------- */
						/*                                    content - port                           */
						/* -------------------------------------------------------------------------- */}
						{/* -------------------------------------------------------------------------- */
						/*                                    1st row left                              */
						/* -------------------------------------------------------------------------- */}
						<figure
							className='border border-neutral rounded-[0rem_0rem_0rem_0rem] min-h-[60rem] flex flex-[3]'
							ref={el => {
								containerElStoreRegister(el);
								anchorElStoreRegister(el);
							}}
							data-parallax='previewLayneChenPortfolio'
							data-anchor='PROJECT'>
							<Image
								src={previewLayneChenPortfolio}
								alt="Portfolio website header of Layne Chen, featuring a dynamic gold abstract 3D object in the center. A wavy green background covers the page. The name 'LAYNE CHEN' is displayed in large, bold, cream-colored text at the bottom. Navigation links such as 'GitHub', 'LinkedIn', and 'Resume' are positioned at the top alongside a hamburger menu. The text 'Front-end Developer' appears on the left, while 'Based in Taipei, Taiwan' is on the right."
								className='frame-left-item-icon h-full w-full object-cover'
							/>
						</figure>

						<div className='block flex-[1_0_100%] md:hidden'></div>

						{/* -------------------------------------------------------------------------- */
						/*                                    1st row right                            */
						/* -------------------------------------------------------------------------- */}
						<div className='flex flex-[1] gap-12 flex-wrap md:flex-col'>
							<div
								className='border border-neutral min-h-72 flex flex-[1] flex-col p-20 min-w-[180px]'
								ref={containerElStoreRegister}>
								<h3 className='m-auto text-center text-5xl'>
									<span
										data-font-family='boxing'
										ref={textElStoreRegister}>
										{`Layne Chen Portfolio ‘24`}
									</span>
								</h3>
							</div>

							<div
								className='border border-neutral min-h-[39rem] flex flex-[1] flex-col p-20 min-w-[180px]'
								ref={containerElStoreRegister}>
								<div className='m-auto text-center'>
									<h3 className='text-4xl mb-6 leading-[1.5]'>
										<span
											data-font-family='boxing'
											ref={textElStoreRegister}>{`# frontend`}</span>
									</h3>
									<ul className='font-satoshi text-xl leading-[1.5]'>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`TypeScript`}</span>
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
							className='flex flex-[2]'
							ref={containerElStoreRegister}>
							<div className='border border-neutral min-h-72 flex p-20 gap-14 flex-col md:flex-row'>
								<h3 className='m-auto text-center text-4xl leading-[1.25]'>
									<span
										data-font-family='boxing'
										ref={textElStoreRegister}>
										{`overview`}
									</span>
								</h3>

								<p className='m-auto text-xl font-satoshi whitespace-pre-line leading-[1.5]'>
									<span
										data-font-family='satoshi'
										ref={textElStoreRegister}>
										{`Showcases my work and expertise as a front-end developer and 3D enthusiast. Built using cutting-edge web technologies, the portfolio leverages the power of WebGL, Three.js, and GSAP, ensuring optimal performance, responsiveness, and immersive user experiences with custom shaders.\n\nIntegrates Static Site Generation (SSG) with Next.js, allowing for fast load times while improving crawlability for better SEO.`}
									</span>
								</p>
							</div>
						</div>
						{/* -------------------------------------------------------------------------- */
						/*                                    2st row right                            */
						/* -------------------------------------------------------------------------- */}

						<div className='block flex-[1_0_100%] md:hidden'></div>

						<div
							className='border border-neutral min-h-72 flex flex-[1] items-center justify-center text-4xl text-highlight p-20 rounded-[0rem_0rem_9rem_9rem] md:rounded-[0rem_0rem_0rem_0rem] leading-[1] gap-40 md:gap-12'
							ref={containerElStoreRegister}>
							<a
								className='pointer-events-auto'
								href='https://github.com/laynesquare/layne-chen-portfolio'
								target='_blank'
								title='Go to Layne Chen Portfolio ‘24 demo page'>
								<span
									data-font-family='boxing'
									data-font-highlight='button'
									ref={textElStoreRegister}>
									{`[ demo ]`}
								</span>
							</a>
							<a
								className='pointer-events-auto'
								href='https://github.com/laynesquare/layne-chen-portfolio'
								target='_blank'
								title='Go to Layne Chen Portfolio ‘24 source code page'>
								<span
									data-font-highlight='button'
									data-font-family='boxing'
									ref={textElStoreRegister}>
									{`[ code ]`}
								</span>
							</a>
						</div>
						<div className='flex-[1_0_100%]'></div>
						{/* -------------------------------------------------------------------------- */
						/*                                    content - share                         */
						/* -------------------------------------------------------------------------- */}
						{/* -------------------------------------------------------------------------- */
						/*                                    1st row left                              */
						/* -------------------------------------------------------------------------- */}
						<figure
							className='border border-neutral rounded-[0rem_0rem_0rem_0rem] min-h-[60rem] flex flex-[3]'
							ref={el => {
								containerElStoreRegister(el);
								anchorElStoreRegister(el);
							}}
							data-parallax='previewShareYourMemories'
							data-anchor='PROJECT'>
							<Image
								src={previewShareYourMemories}
								alt=''
								className='frame-left-item-icon h-full w-full object-cover'
							/>
						</figure>
						{/* -------------------------------------------------------------------------- */
						/*                                    1st row right                            */
						/* -------------------------------------------------------------------------- */}

						<div className='block flex-[1_0_100%] md:hidden'></div>

						<div className='flex flex-[1] gap-12 flex-row flex-wrap md:flex-col'>
							<div
								className='border border-neutral min-h-72 flex flex-col p-20 flex-[1] min-w-[180px]'
								ref={containerElStoreRegister}>
								<h3 className='m-auto text-center text-5xl'>
									<span
										data-font-family='boxing'
										ref={textElStoreRegister}>
										{`Share Your Memories`}
									</span>
								</h3>
							</div>

							<div
								className='border border-neutral min-h-[39rem] flex flex-col p-20 flex-[1] md:flex-auto min-w-[180px]'
								ref={containerElStoreRegister}>
								<div className='m-auto text-center'>
									<h3 className='text-4xl mb-6 leading-[1.5]'>
										<span
											data-font-family='boxing'
											ref={textElStoreRegister}>{`# full stack`}</span>
									</h3>
									<ul className='font-satoshi text-xl leading-[1.5]'>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`JavaScript`}</span>
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
							className='flex flex-[2]'
							ref={containerElStoreRegister}>
							<div className='border border-neutral min-h-72 flex p-20 gap-14 flex-col md:flex-row'>
								<h3 className='m-auto text-center text-4xl leading-[1.25]'>
									<span
										data-font-family='boxing'
										ref={textElStoreRegister}>
										{`overview`}
									</span>
								</h3>

								<p className='m-auto text-xl font-satoshi whitespace-pre-line leading-[1.5]'>
									<span
										data-font-family='satoshi'
										ref={textElStoreRegister}>
										{`Create a platform where people could share treasured memories with anyone throughout the globe. Each user can register a whole new account to enable full functionality coming with the application, or just simply log in via Google Oauth 2.0 to enjoy the full access.\n\nYou can create, delete, edit your posts, and bookmark, comment on, or give a thumbs-up to other users' posts. Each post delivers Youtube video recommendations based on respective content. You can venture around further if any posts pique your interest.`}
									</span>
								</p>
							</div>
						</div>

						<div className='block flex-[1_0_100%] md:hidden'></div>

						{/* -------------------------------------------------------------------------- */
						/*                                    2st row right                            */
						/* -------------------------------------------------------------------------- */}
						<div
							className='border border-neutral min-h-72 flex flex-[1] items-center justify-center text-4xl text-highlight p-20 rounded-[0rem_0rem_9rem_9rem] md:rounded-[0rem_0rem_0rem_0rem] leading-[1] gap-40 md:gap-12'
							ref={containerElStoreRegister}>
							<a
								className='pointer-events-auto'
								href='https://laynesquare.github.io/share_your_memories'
								target='_blank'
								title='Go to Share Your Memories demo page'>
								<span
									data-font-highlight='button'
									data-font-family='boxing'
									ref={textElStoreRegister}>{`[ demo ]`}</span>
							</a>
							<a
								className='pointer-events-auto'
								href='https://github.com/laynesquare/share_your_memories'
								target='_blank'
								title='Go to Share Your Memories source code page'>
								<span
									data-font-highlight='button'
									data-font-family='boxing'
									ref={textElStoreRegister}>{`[ code ]`}</span>
							</a>
						</div>
						<div className='flex-[1_0_100%]'></div>
						{/* -------------------------------------------------------------------------- */
						/*                                    content - eng                           */
						/* -------------------------------------------------------------------------- */}
						{/* -------------------------------------------------------------------------- */
						/*                                    1st row left                              */
						/* -------------------------------------------------------------------------- */}
						<figure
							className='border border-neutral rounded-[0rem_0rem_0rem_0rem] min-h-[60rem] flex flex-[3]'
							ref={el => {
								containerElStoreRegister(el);
								anchorElStoreRegister(el);
							}}
							data-parallax='previewLearnEnglishDictionary'
							data-anchor='PROJECT'>
							<Image
								src={previewLearnEnglishDictionary}
								alt=''
								className='frame-left-item-icon h-full w-full object-cover'
							/>
						</figure>

						<div className='block flex-[1_0_100%] md:hidden'></div>

						{/* -------------------------------------------------------------------------- */
						/*                                    1st row right                             */
						/* -------------------------------------------------------------------------- */}
						<div className='flex flex-[1] gap-12 flex-row flex-wrap md:flex-col'>
							<div
								className='border border-neutral min-h-72 flex p-20 flex-col flex-[1] min-w-[180px]'
								ref={containerElStoreRegister}>
								<h3 className='m-auto text-center text-5xl'>
									<span
										data-font-family='boxing'
										ref={textElStoreRegister}>
										{`Learn English with Dictionary`}
									</span>
								</h3>
							</div>

							<div
								className='border border-neutral min-h-[39rem] flex flex-col p-20 flex-[1] min-w-[180px]'
								ref={containerElStoreRegister}>
								<div className='m-auto text-center'>
									<h3 className='text-4xl mb-6 leading-[1.5]'>
										<span
											data-font-family='boxing'
											ref={textElStoreRegister}>{`# frontend`}</span>
									</h3>
									<ul className='font-satoshi text-xl leading-[1.5]'>
										<li>
											<span
												data-font-family='satoshi'
												ref={textElStoreRegister}>{`JavaScript`}</span>
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
							className='border border-neutral min-h-72 px-12 gap-14 p-20 flex flex-[2] flex-col rounded-[0rem_0rem_0rem_0rem] md:flex-row md:rounded-[0rem_0rem_0rem_9rem]'
							ref={containerElStoreRegister}>
							<h3 className='m-auto text-center text-4xl leading-[1.25]'>
								<span
									data-font-family='boxing'
									ref={textElStoreRegister}>
									{`overview`}
								</span>
							</h3>

							<p className='m-auto text-xl font-satoshi whitespace-pre-line leading-[1.5]'>
								<span
									data-font-family='satoshi'
									ref={textElStoreRegister}>
									{`Solve the inconvenience of encountering unknown words upon reading an English passage and having to look up elsewhere.\n\nRead multiple professional-written passages fetched via New York Times API with a juxtaposed dictionary to facilitate English learning.\n\nCo-located design of text and relevant keyword tags. You can explore more in a topic-oriented way.`}
								</span>
							</p>
						</div>

						<div className='block flex-[1_0_100%] md:hidden'></div>

						{/* -------------------------------------------------------------------------- */
						/*                                    2st row right                            */
						/* -------------------------------------------------------------------------- */}
						<div
							className='border border-neutral min-h-72 flex flex-[1] items-center justify-center text-4xl text-highlight p-20 rounded-[0rem_0rem_9rem_9rem] md:rounded-[0rem_0rem_9rem_0rem] leading-[1] gap-40 md:gap-12'
							ref={el => containerElStoreRegister(el)}>
							<a
								className='pointer-events-auto'
								href='https://laynesquare.github.io/learn_english_with_dictionary'
								target='_blank'
								title='Go to Learn English with Dictionary demo page'>
								<span
									data-font-highlight
									data-font-family='boxing'
									ref={textElStoreRegister}>{`[ demo ]`}</span>
							</a>
							<a
								className='pointer-events-auto'
								href='https://github.com/laynesquare/learn_english_with_dictionary'
								target='_blank'
								title='Go to Learn English with Dictionary source code page'>
								<span
									data-font-highlight
									data-font-family='boxing'
									ref={textElStoreRegister}>
									{`[ code ]`}
								</span>
							</a>
						</div>
					</section>
				</div>

				<footer
					className='h-lvh w-full relative flex flex-col overflow-hidden'
					id='contact'>
					<div className='flex flex-col px-12 pt-6'>
						<h3 className='whitespace-pre-line text-7xl mb-6'>
							<span
								data-font-family='boxing'
								ref={textElStoreRegister}>{`Let's connect.`}</span>
						</h3>
						<h4 className='whitespace-pre-line text-3xl leading-[1.25]'>
							<span
								data-font-family='boxing'
								ref={textElStoreRegister}>{`Open for new challenges\nand collaborations.`}</span>
						</h4>
					</div>
					<div className='text-xl flex flex-[1] -translate-y-36 leading-none text-highlight flex-col justify-end items-start px-12 pb-12 md:flex-row md:justify-between md:items-end md:pb-0'>
						<nav className='flex flex-col gap-12 md:gap-6'>
							<a
								className='pointer-events-auto'
								href='https://github.com/laynesquare'
								target='_blank'
								title='Go to Github'>
								<span
									ref={textElStoreRegister}
									data-font-family='boxing'
									data-font-highlight='button'>{`[ github ]`}</span>
							</a>
							<a
								className='pointer-events-auto'
								href='https://www.linkedin.com/in/laynechensquare'
								target='_blank'
								title='Go to Linkedin'>
								<span
									ref={textElStoreRegister}
									data-font-family='boxing'
									data-font-highlight='button'>{`[ linkedin ]`}</span>
							</a>
							<a
								className='pointer-events-auto'
								href='/frame/layne_res_all.pdf'
								target='_blank'
								title='Go to resume'>
								<span
									ref={textElStoreRegister}
									data-font-family='boxing'
									data-font-highlight='button'>
									{`[ resume ]`}
								</span>
							</a>
							<a
								className='pointer-events-auto'
								href='mailto:laynechensquare@gmail.com'
								title='Mail to laynechensquare@gmail.com'>
								<span
									ref={textElStoreRegister}
									data-font-family='boxing'
									data-font-highlight='button'>
									<DynamicText
										large={'[ laynechensquare@gmail.com ]'}
										small={'[ mail ]'}
									/>
								</span>
							</a>
						</nav>
						<nav>
							<button
								className='text-right mt-12 pointer-events-auto'
								title='Back to top'
								onClick={() => useNavStore.getState().lenisRef.current.lenis.scrollTo('#home')}>
								<span
									ref={textElStoreRegister}
									data-font-family='boxing'
									data-font-highlight='button'>
									{'[ Back to top ]'}
								</span>
							</button>
						</nav>
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

function DynamicText({ large, small }) {
	const isMobile = usePlatformStore(state => state.isMobile);
	return <>{isMobile ? small : large}</>;
}

/* -------------------------------------------------------------------------- */
/*                                    menu                                    */
/* -------------------------------------------------------------------------- */

function Menu() {
	return (
		<>
			<nav
				className='flex py-2 rounded-full items-center fixed text-lg z-30 min-w-max m-auto leading-none font-boxing backdrop-blur-lg backdrop-saturate-[250%] backdrop-hue-rotate-[9deg] border border-[#ffffff15] left-1/2 -translate-x-1/2 gap-[12px] top-[12px] pl-[16px] md:gap-6 md:top-6 md:pr-2 md:pl-12 min-h-16'
				style={{ textShadow: `0 0 0px black` }}>
				<button
					title='Go to home section'
					onClick={() => useNavStore.getState().lenisRef.current.lenis.scrollTo('#home')}
					className='w-max'>
					<span>{`layne chen`}</span>
				</button>

				<div className={`border-r border-neutral min-h-[14px] h-7 hidden md:block`}></div>

				<p className='flex-[1] text-center'>
					<span>
						<DynamicText
							large={`portfolio#2024`}
							small={'portfolio#24'}
						/>
					</span>
				</p>

				<div className={`border-r border-neutral min-h-[14px] h-7 hidden md:block`}></div>

				<div className={`gap-4 self-stretch hidden md:flex`}>
					<NavLinkBtn
						label={`github`}
						href={`https://github.com/laynesquare`}
					/>
					<NavLinkBtn
						label={`linkedin`}
						href={`https://www.linkedin.com/in/laynechensquare`}
					/>
					<NavLinkBtn
						label={`resume`}
						href={`/frame/layne_res_all.pdf`}
					/>
					<NavLinkBtn
						label={`mail`}
						href={`mailto:laynechensquare@gmail.com`}
					/>
				</div>

				<NavOpenBtn />
			</nav>

			<OverlayNav />
		</>
	);
}

function OverlayNav() {
	const overlayNavRef = useRef(null);
	const [isOverlayCloseHover, setIsOverlayCloseHover] = useState(false);
	const isOpen = useNavStore(state => state.isOpen);

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

	return (
		<nav
			className={`fixed z-30 top-0 left-0 h-lvh w-full font-boxing text-neutralContrast opacity-0 flex flex-col backdrop-blur-md backdrop-saturate-200 backdrop-hue-rotate-15 overflow-y-auto overflow-x-hidden`}
			data-lenis-prevent
			ref={overlayNavRef}>
			<div
				className={`bg-primary border border-primary text-4xl flex-[2.5] flex px-12 pt-12 pb-32 items-center gap-12 w-full justify-between flex-col md:w-[max-content] md:flex-row md:py-6 md:gap-20`}
				data-row={`action`}>
				<button
					className='px-[max(1.5rem,24px)] border border-neutralContrast h-full flex flex-col justify-center items-center origin-center aspect-[4.5] w-full md:aspect-square md:rounded-full md:w-auto'
					title='Close menu'
					onClick={() => {
						useNavStore.getState().lenisRef.current.lenis.start();
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
						href={`/frame/layne_res_all.pdf`}
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

function OverlayNavLinkBtn({ label, href }) {
	const [isHover, setIsHover] = useState(false);
	const pointerRef = useRef({ xPercent: 0, yPercent: 0 });
	const btnRef = useRef(null);
	const labelRef = useRef(null);
	const flairRef = useRef(null);

	function handlePointerEnter(e) {
		const { clientX, clientY } = e;
		const { left, top, width, height } = btnRef.current.getBoundingClientRect();
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
					.to(btnRef.current, configDisplace, '<');
			} else {
				tl.to(flairRef.current, configScale).to(btnRef.current, configDisplace, '<');
			}
		},
		{ dependencies: [isHover], scope: btnRef },
	);

	return (
		<>
			<a
				ref={btnRef}
				href={href}
				target='_blank'
				title={`Go to ${label.charAt(0).toUpperCase() + label.slice(1)}`}
				onPointerEnter={e => handlePointerEnter(e)}
				onPointerLeave={() => setIsHover(false)}
				className='px-[max(2.25rem,2.25rem)] py-[max(0.875rem,14px)] text-2xl border border-neutralContrast bg-neutral h-[min-content] relative overflow-hidden cursor-pointer min-w-[96px] text-center flex-[1] md:flex-auto md:rounded-full'>
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

function OverlayNavLinkChapter({ chapter, label, width, justify, isDecor }) {
	const [isHover, setIsHover] = useState(false);
	const isMobile = usePlatformStore(state => state.isMobile);
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
		{ dependencies: [isHover], scope: ctnRef },
	);

	function handleClick(e: MouseEvent<HTMLAnchorElement>): void {
		e.preventDefault();
		const { lenis } = useNavStore.getState().lenisRef.current;
		lenis.start();
		useNavStore.setState({ isOpen: false });
		lenis.scrollTo(`#${label}`);
	}

	return (
		<>
			<div
				className={`bg-primary border border-primary flex-[1] flex items-center px-12 py-4 shadow-[0px_2px_0px_0px_var(--color-bg-primary)] w-full justify-end ${width} ${justify}`}
				data-row={label}
				ref={ctnRef}>
				{isDecor && !isMobile && <OverlayNavDecor />}
				<span
					className='aspect-square md:w-[4rem] w-[8rem]'
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
						className='text-[max(12.5rem,36px)] md:text-[max(6rem,36px)] leading-none mr-8 h-full flex items-center'>
						{label}
					</span>
					<span
						data-chapter-sequence
						className='text-[max(2.25rem,14px)] leading-none h-full'>
						{`[${chapter}.]`}
					</span>
					<span
						data-chapter-label-clone
						className='text-[max(12.5rem,36px)] md:text-[max(6rem,36px)] leading-none absolute top-0 left-0 w-full h-full flex items-center pointer-events-none underline'>
						{label}
					</span>
				</a>
			</div>
		</>
	);
}

function OverlayNavDecor({}) {
	return (
		<div className={`gap-8 flex-wrap md:mr-auto flex max-w-[24rem] md:max-w-[34rem]`}>
			<div className='md:w-6 w-12 aspect-square  bg-[#00000050]'></div>
			<div className='md:w-6 w-12 aspect-square  bg-[#00000050]'></div>
			<div className='md:w-6 w-12 aspect-square  bg-[#00000050]'></div>
			<div className='md:w-6 w-12 aspect-square  bg-[#00000050]'></div>
			<div className='md:w-6 w-12 aspect-square  bg-[#00000050]'></div>
			<div className='md:w-6 w-12 aspect-square  bg-[#00000050]'></div>
			<div className='md:w-6 w-12 aspect-square  bg-[#00000050]'></div>
			<div className='md:w-6 w-12 aspect-square  bg-[#00000050]'></div>
			<div className='md:w-6 w-12 aspect-square  bg-[#00000050]'></div>
			<div className='md:w-6 w-12 aspect-square  bg-[#00000050]'></div>
			<div className='md:w-6 w-12 aspect-square  bg-[#00000050]'></div>
			<div className='md:w-6 w-12 aspect-square  bg-[#00000050]'></div>
			<div className='md:w-6 w-12 aspect-square  bg-[#00000050]'></div>
			<div className='md:w-6 w-12 aspect-square  bg-[#00000050]'></div>
			<div className='md:w-6 w-12 aspect-square  bg-[#00000050]'></div>
			<div className='md:w-6 w-12 aspect-square  bg-[#00000050]'></div>
			<div className='md:w-6 w-12 aspect-square  bg-[#00000050]'></div>
			<div className='md:w-6 w-12 aspect-square  bg-[#00000050]'></div>
			<div className='md:w-6 w-12 aspect-square  bg-[#00000050]'></div>
			<div className='md:w-6 w-12 aspect-square  bg-[#00000050]'></div>
		</div>
	);
}

function NavLinkBtn({ label, href }) {
	const ctnRef = useRef(null);
	const [isHover, setIsHover] = useState(false);

	useGSAP(
		() => {
			if (isHover) {
				gsap.to('[data-nav-action]', {
					yPercent: -100,
					duration: 0.5,
					ease: 'bounce.out',
				});
				gsap.to('[data-nav-action-clone]', {
					yPercent: 0,
					duration: 0.5,
					ease: 'bounce.out',
				});
			} else {
				gsap.to('[data-nav-action]', {
					yPercent: 0,
					duration: 0.5,
					ease: 'bounce.out',
				});
				gsap.to('[data-nav-action-clone]', {
					yPercent: 100,
					duration: 0.5,
					ease: 'bounce.out',
				});
			}
		},
		{ dependencies: [isHover], scope: ctnRef },
	);
	return (
		<a
			className='relative leading-none overflow-hidden min-w-max'
			href={href}
			target='_blank'
			title={`Go to ${label.charAt(0).toUpperCase() + label.slice(1)}`}
			onPointerEnter={() => setIsHover(true)}
			onPointerLeave={() => setIsHover(false)}
			ref={ctnRef}>
			<span
				data-nav-action
				className={`h-full flex items-center`}>
				{`[ ${label} ]`}
			</span>
			<span
				data-nav-action-clone
				className='absolute top-0 left-0 h-full flex items-center'>
				{`[ ${label} ]`}{' '}
			</span>
		</a>
	);
}

function NavOpenBtn() {
	const [isHover, setIsHover] = useState(false);
	const ctnRef = useRef(null);
	useGSAP(
		() => {
			if (isHover) {
				gsap.to('[data-open-1st-bar]', {
					scaleX: 0.75,
					duration: 0.2,
					ease: 'sine.in',
				});
				gsap.to('[data-open-3st-bar]', {
					scaleX: 0.5,
					duration: 0.2,
					ease: 'sine.in',
				});
			} else {
				gsap.to('[data-open-1st-bar]', {
					scaleX: 1,
					duration: 0.2,
					ease: 'sine.in',
				});
				gsap.to('[data-open-3st-bar]', {
					scaleX: 1,
					duration: 0.2,
					ease: 'sine.in',
				});
			}
		},
		{ dependencies: [isHover], scope: ctnRef },
	);
	return (
		<button
			ref={ctnRef}
			title='Open menu'
			className='rounded-full aspect-square border border-neutral flex flex-col justify-center items-center p-[max(0.75rem,12px)] gap-[max(0.25rem,4px)]'
			onClick={() => {
				useNavStore.getState().lenisRef?.current?.lenis?.stop();
				useNavStore.setState({ isOpen: true });
			}}
			onPointerEnter={() => setIsHover(true)}
			onPointerLeave={() => setIsHover(false)}>
			<div
				data-open-1st-bar
				className='bg-neutral min-w-[20px] min-h-[2px] w-5 h-0.5 origin-left'></div>
			<div
				data-open-2st-bar
				className='bg-neutral min-w-[20px] min-h-[2px] w-5 h-0.5'></div>
			<div
				data-open-3st-bar
				className='bg-neutral min-w-[20px] min-h-[2px] w-5 h-0.5 origin-left'></div>
		</button>
	);
}

function clamp(val, min, max) {
	return Math.min(Math.max(val, min), max);
}

function mapRange(value, start1, stop1, start2, stop2) {
	return clamp(start2 + ((value - start1) * (stop2 - start2)) / (stop1 - start1), 0, 100);
}

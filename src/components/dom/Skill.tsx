// store
import { useDomStore } from '@/store';

// constant
import { CHAP } from '@/config/constants';

export default function Skill() {
	const setText = useDomStore(state => state?.setText);
	const setContainer = useDomStore(state => state?.setContainer);
	const setAnchor = useDomStore(state => state?.setAnchor);
	return (
		<>
			<section
				className='flex gap-x-12 gap-y-6 flex-wrap'
				id='skill'>
				{/* -------------------------------------------------------------------------- */
				/*                                    upper                                   */
				/* -------------------------------------------------------------------------- */}
				<header
					className='flex-[1] text-[13.75rem] border border-neutral min-h-72 flex rounded-[12rem_12rem_12rem_0rem] p-20'
					ref={setContainer}>
					<h2
						className='m-auto leading-none'
						data-font-family='BOXING'
						ref={setText}>
						{'skill'}
					</h2>
				</header>

				<div
					className='flex-[0.3] flex border border-neutral min-h-72 rounded-[12rem_12rem_0rem_12rem] p-20'
					ref={setContainer}>
					<h2 className='m-auto text-6xl'>
						<span
							data-font-family='BOXING'
							ref={setText}>
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
						setContainer(el);
						setAnchor(el);
					}}
					data-anchor={CHAP.SKILL}></div>

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
							ref={setContainer}>
							<div className='m-auto text-center'>
								<h3 className='text-4xl mb-6 leading-[1.5]'>
									<span
										data-font-family='BOXING'
										ref={setText}>
										{`Languages`}
									</span>
								</h3>
								<ul className='font-satoshi text-xl leading-[1.5]'>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`TypeScript (JavaScript)`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>
											{`HTML`}
										</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`CSS/Sass`}</span>
									</li>
								</ul>
							</div>
						</div>

						{/* -------------------------------------------------------------------------- */
						/*                                btm frontend                                */
						/* -------------------------------------------------------------------------- */}
						<div
							className='border border-neutral flex flex-[1] p-20'
							ref={setContainer}>
							<div className='m-auto text-center'>
								<h3 className='text-4xl mb-6 leading-[1.5]'>
									<span
										data-font-family='BOXING'
										ref={setText}>
										{`Frontend`}
									</span>
								</h3>
								<ul className='font-satoshi text-xl leading-[1.5]'>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`Next.js`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`React`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`React Router`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>
											{`React Redux`}
										</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`Angular`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`Angular Universal`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`Webpack`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`Zustand`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`RxJS`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`Karma/Jasmine`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`Tailwind CSS`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`Bootstrap`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`Material UI`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`PrimeNg`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`Three.js`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`GLSL`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`GSAP`}</span>
									</li>
								</ul>
							</div>
						</div>

						{/* -------------------------------------------------------------------------- */
						/*                                btm Backend                                */
						/* -------------------------------------------------------------------------- */}
						<div
							className='border border-neutral flex flex-[1] p-20'
							ref={setContainer}>
							<div className='m-auto text-center'>
								<h3 className='text-4xl mb-6 leading-[1.5]'>
									<span
										data-font-family='BOXING'
										ref={setText}>
										{`Backend`}
									</span>
								</h3>
								<ul className='font-satoshi text-xl leading-[1.5]'>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`Node.js`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>
											{`Express`}
										</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`Mongoose`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`MongoDB`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`RESTful API`}</span>
									</li>
								</ul>
							</div>
						</div>

						{/* -------------------------------------------------------------------------- */
						/*                                btm DevOps                                */
						/* -------------------------------------------------------------------------- */}
						<div
							className='border border-neutral flex flex-[1] p-20'
							ref={setContainer}>
							<div className='m-auto text-center'>
								<h3 className='text-4xl mb-6 leading-[1.5]'>
									<span
										data-font-family='BOXING'
										ref={setText}>
										{`DevOps`}
									</span>
								</h3>
								<ul className='font-satoshi text-xl leading-[1.5]'>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`Docker`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>
											{`AWS S3`}
										</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`AWS Route 53`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`AWS CloudFront`}</span>
									</li>
								</ul>
							</div>
						</div>

						{/* -------------------------------------------------------------------------- */
						/*                             btm Tools & Platforms                          */
						/* -------------------------------------------------------------------------- */}

						<div
							className='border border-neutral flex flex-[1] p-20'
							ref={setContainer}>
							<div className='m-auto text-center'>
								<h3 className='text-4xl mb-6 leading-[1.5] whitespace-pre-line'>
									<span
										data-font-family='BOXING'
										ref={setText}>
										{`Tools &\nPlatforms`}
									</span>
								</h3>
								<ul className='font-satoshi text-xl leading-[1.5]'>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`Git (Sourcetree)`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>
											{`GitLab`}
										</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`GitHub Actions`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`Google Search Console`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`Google Analytics`}</span>
									</li>
								</ul>
							</div>
						</div>

						{/* -------------------------------------------------------------------------- */
						/*                                btm Design                                   */
						/* -------------------------------------------------------------------------- */}
						<div
							className='border border-neutral rounded-[0rem_0rem_9rem_0rem] flex p-20'
							ref={setContainer}>
							<div className='m-auto text-center'>
								<h3 className='text-4xl mb-6 leading-[1.5]'>
									<span
										data-font-family='BOXING'
										ref={setText}>
										{`Design`}
									</span>
								</h3>
								<ul className='font-satoshi text-xl leading-[1.5]'>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`Figma`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>
											{`Illustrator`}
										</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={setText}>{`Photoshop`}</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

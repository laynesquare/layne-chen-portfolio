// store
import { useDomStore } from '@/store';

// constant
import { CHAP } from '@/config/constants';

export default function Skill() {
	const textElStoreRegister = useDomStore(state => state?.setText);
	const containerElStoreRegister = useDomStore(state => state?.setContainer);
	const anchorElStoreRegister = useDomStore(state => state?.setAnchor);
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
					ref={containerElStoreRegister}>
					<h2
						className='m-auto leading-none'
						data-font-family='BOXING'
						ref={textElStoreRegister}>
						{'skill'}
					</h2>
				</header>

				<div
					className='flex-[0.3] flex border border-neutral min-h-72 rounded-[12rem_12rem_0rem_12rem] p-20'
					ref={containerElStoreRegister}>
					<h2 className='m-auto text-6xl'>
						<span
							data-font-family='BOXING'
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
							ref={containerElStoreRegister}>
							<div className='m-auto text-center'>
								<h3 className='text-4xl mb-6 leading-[1.5]'>
									<span
										data-font-family='BOXING'
										ref={textElStoreRegister}>
										{`Languages`}
									</span>
								</h3>
								<ul className='font-satoshi text-xl leading-[1.5]'>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>{`TypeScript (JavaScript)`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>
											{`HTML`}
										</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
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
										data-font-family='BOXING'
										ref={textElStoreRegister}>
										{`Frontend`}
									</span>
								</h3>
								<ul className='font-satoshi text-xl leading-[1.5]'>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>{`Next.js`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>{`React Router`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>
											{`React Redux`}
										</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>{`Angular`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>{`Angular Universal`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>{`RxJS`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>{`Karma/Jasmine`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>{`Tailwind CSS`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>{`Bootstrap`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>{`WebGL`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>{`Three.js`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
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
										data-font-family='BOXING'
										ref={textElStoreRegister}>
										{`Backend`}
									</span>
								</h3>
								<ul className='font-satoshi text-xl leading-[1.5]'>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>{`Node.js`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>
											{`Express`}
										</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>{`Mongoose`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>{`MongoDB`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
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
										data-font-family='BOXING'
										ref={textElStoreRegister}>
										{`Tools &\nPlatforms`}
									</span>
								</h3>
								<ul className='font-satoshi text-xl leading-[1.5]'>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>{`Git (Sourcetree)`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>
											{`GitLab`}
										</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
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
										data-font-family='BOXING'
										ref={textElStoreRegister}>
										{`Design`}
									</span>
								</h3>
								<ul className='font-satoshi text-xl leading-[1.5]'>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>{`Figma`}</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>
											{`Illustrator`}
										</span>
									</li>
									<li>
										<span
											data-font-family='SATOSHI'
											ref={textElStoreRegister}>{`Photoshop`}</span>
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

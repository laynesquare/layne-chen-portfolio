// store
import { useDomStore } from '@/store';

export default function Skill() {
	const textElStoreRegister = useDomStore(state => state?.textElRegister);
	const containerElStoreRegister = useDomStore(state => state?.containerElRegister);
	const anchorElStoreRegister = useDomStore(state => state?.anchorElRegister);
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
											ref={textElStoreRegister}>{`Next.js`}</span>
									</li>
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
		</>
	);
}

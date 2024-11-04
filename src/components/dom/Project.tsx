import Image from 'next/image';

// store
import { useDomStore, useCursorStore } from '@/store';

// assets
import previewShareYourMemories from '/public/frame/project-preview-share-your-memories.webp';
import previewLearnEnglishDictionary from '/public/frame/project-preview-learn-english-dictionary.webp';
import previewLayneChenPortfolio from '/public/frame/project-preview-layne-chen-portfolio-2024.webp';

// constant
import { CHAP } from '@/config/constants';

export default function Project() {
	const textElStoreRegister = useDomStore(state => state?.setText);
	const containerElStoreRegister = useDomStore(state => state?.setContainer);
	const anchorElStoreRegister = useDomStore(state => state?.setAnchor);

	function toggleRipple(bool: boolean) {
		useCursorStore.setState({ isRippleZone: bool });
	}

	return (
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
					data-font-family='BOXING'
					ref={textElStoreRegister}>
					{'project'}
				</h2>
			</header>
			<div
				className='flex-[0.3] flex border border-neutral min-h-72 rounded-[12rem_12rem_12rem_12rem] p-20'
				ref={containerElStoreRegister}>
				<h2 className='m-auto text-6xl'>
					<span
						data-font-family='BOXING'
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
				data-anchor={CHAP.PROJECT}>
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
							data-font-family='BOXING'
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
								data-font-family='BOXING'
								ref={textElStoreRegister}>{`# frontend`}</span>
						</h3>
						<ul className='font-satoshi text-xl leading-[1.5]'>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={textElStoreRegister}>{`TypeScript`}</span>
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
									ref={textElStoreRegister}>{`CSS`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={textElStoreRegister}>{`Next.js`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={textElStoreRegister}>{`Tailwind CSS`}</span>
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
							data-font-family='BOXING'
							ref={textElStoreRegister}>
							{`overview`}
						</span>
					</h3>

					<p className='m-auto text-xl font-satoshi whitespace-pre-line leading-[1.5]'>
						<span
							data-font-family='SATOSHI'
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
				className='pointer-events-auto border border-neutral min-h-72 flex flex-[1] items-center justify-center text-4xl text-highlight p-20 rounded-[0rem_0rem_9rem_9rem] md:rounded-[0rem_0rem_0rem_0rem] leading-[1] gap-40 md:gap-12'
				ref={containerElStoreRegister}
				onPointerEnter={e => toggleRipple(false)}
				onPointerLeave={e => toggleRipple(true)}>
				<a
					href='https://github.com/laynesquare/layne-chen-portfolio'
					target='_blank'
					title='Go to Layne Chen Portfolio ‘24 demo page'>
					<span
						data-font-family='BOXING'
						data-font-highlight='button'
						ref={textElStoreRegister}>
						{`[ demo ]`}
					</span>
				</a>
				<a
					href='https://github.com/laynesquare/layne-chen-portfolio'
					target='_blank'
					title='Go to Layne Chen Portfolio ‘24 source code page'>
					<span
						data-font-highlight='button'
						data-font-family='BOXING'
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
				data-anchor={CHAP.PROJECT}>
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
							data-font-family='BOXING'
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
								data-font-family='BOXING'
								ref={textElStoreRegister}>{`# full stack`}</span>
						</h3>
						<ul className='font-satoshi text-xl leading-[1.5]'>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={textElStoreRegister}>{`JavaScript`}</span>
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
									ref={textElStoreRegister}>{`CSS`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={textElStoreRegister}>{`React (hooks)`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={textElStoreRegister}>{`React Router`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={textElStoreRegister}>{`React Redux`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={textElStoreRegister}>{`Material UI`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={textElStoreRegister}>{`Node.js`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={textElStoreRegister}>{`Express`}</span>
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
							<li>
								<span
									data-font-family='SATOSHI'
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
							data-font-family='BOXING'
							ref={textElStoreRegister}>
							{`overview`}
						</span>
					</h3>

					<p className='m-auto text-xl font-satoshi whitespace-pre-line leading-[1.5]'>
						<span
							data-font-family='SATOSHI'
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
				className='pointer-events-auto border border-neutral min-h-72 flex flex-[1] items-center justify-center text-4xl text-highlight p-20 rounded-[0rem_0rem_9rem_9rem] md:rounded-[0rem_0rem_0rem_0rem] leading-[1] gap-40 md:gap-12'
				ref={containerElStoreRegister}
				onPointerEnter={e => toggleRipple(false)}
				onPointerLeave={e => toggleRipple(true)}>
				<a
					href='https://laynesquare.github.io/share_your_memories'
					target='_blank'
					title='Go to Share Your Memories demo page'>
					<span
						data-font-highlight='button'
						data-font-family='BOXING'
						ref={textElStoreRegister}>{`[ demo ]`}</span>
				</a>
				<a
					href='https://github.com/laynesquare/share_your_memories'
					target='_blank'
					title='Go to Share Your Memories source code page'>
					<span
						data-font-highlight='button'
						data-font-family='BOXING'
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
				data-anchor={CHAP.PROJECT}>
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
							data-font-family='BOXING'
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
								data-font-family='BOXING'
								ref={textElStoreRegister}>{`# frontend`}</span>
						</h3>
						<ul className='font-satoshi text-xl leading-[1.5]'>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={textElStoreRegister}>{`JavaScript`}</span>
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
									ref={textElStoreRegister}>{`CSS`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={textElStoreRegister}>{`React (hooks)`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={textElStoreRegister}>{`React Redux`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={textElStoreRegister}>{`Material UI`}</span>
							</li>
							{/* <li>
											<span
												data-font-family='SATOSHI'
												ref={textElStoreRegister}>{`Node.js`}</span>
										</li>
										<li>
											<span
												data-font-family='SATOSHI'
												ref={textElStoreRegister}>{`Express`}</span>
										</li> */}
							<li>
								<span
									data-font-family='SATOSHI'
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
						data-font-family='BOXING'
						ref={textElStoreRegister}>
						{`overview`}
					</span>
				</h3>

				<p className='m-auto text-xl font-satoshi whitespace-pre-line leading-[1.5]'>
					<span
						data-font-family='SATOSHI'
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
				className='pointer-events-auto border border-neutral min-h-72 flex flex-[1] items-center justify-center text-4xl text-highlight p-20 rounded-[0rem_0rem_9rem_9rem] md:rounded-[0rem_0rem_9rem_0rem] leading-[1] gap-40 md:gap-12'
				ref={el => containerElStoreRegister(el)}
				onPointerEnter={e => toggleRipple(false)}
				onPointerLeave={e => toggleRipple(true)}>
				<a
					href='https://laynesquare.github.io/learn_english_with_dictionary'
					target='_blank'
					title='Go to Learn English with Dictionary demo page'>
					<span
						data-font-highlight
						data-font-family='BOXING'
						ref={textElStoreRegister}>{`[ demo ]`}</span>
				</a>
				<a
					href='https://github.com/laynesquare/learn_english_with_dictionary'
					target='_blank'
					title='Go to Learn English with Dictionary source code page'>
					<span
						data-font-highlight
						data-font-family='BOXING'
						ref={textElStoreRegister}>
						{`[ code ]`}
					</span>
				</a>
			</div>
		</section>
	);
}

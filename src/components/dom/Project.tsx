import Image from 'next/image';

// store
import { useDomStore, useCursorStore } from '@/store';

// assets
import previewShareYourMemories from '/public/dom/project-preview-share-your-memories.webp';
import previewLearnEnglishDictionary from '/public/dom/project-preview-learn-english-dictionary.webp';
import previewLayneChenPortfolio from '/public/dom/project-preview-layne-chen-portfolio-2024.webp';

// constant
import { CHAP } from '@/config/constants';

export default function Project() {
	const setText = useDomStore(state => state?.setText);
	const setContainer = useDomStore(state => state?.setContainer);
	const setAnchor = useDomStore(state => state?.setAnchor);

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
				ref={setContainer}>
				<h2
					className='m-auto leading-none'
					data-font-family='BOXING'
					ref={setText}>
					{'project'}
				</h2>
			</header>
			<div
				className='flex-[0.3] flex border border-neutral min-h-72 rounded-[12rem_12rem_12rem_12rem] p-20'
				ref={setContainer}>
				<h2 className='m-auto text-6xl'>
					<span
						data-font-family='BOXING'
						ref={setText}>
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
					setContainer(el);
					setAnchor(el);
				}}
				data-parallax='previewLayneChenPortfolio'
				data-anchor={CHAP.PROJECT}>
				<Image
					loading='lazy'
					src={previewLayneChenPortfolio}
					alt="Portfolio website header of Layne Chen, featuring a dynamic gold abstract 3D object in the center. A wavy green background covers the page. The name 'LAYNE CHEN' is displayed in large, bold, cream-colored text at the bottom. Navigation links such as 'GitHub', 'LinkedIn', and 'Resume' are positioned at the top alongside a hamburger menu. The text 'Front-end Developer' appears on the left, while 'Based in Taipei, Taiwan' is on the right."
					className='h-full w-full object-cover'
				/>
			</figure>

			<div className='block flex-[1_0_100%] md:hidden'></div>

			{/* -------------------------------------------------------------------------- */
			/*                                    1st row right                            */
			/* -------------------------------------------------------------------------- */}
			<div className='flex flex-[1] gap-12 flex-wrap md:flex-col'>
				<div
					className='border border-neutral min-h-72 flex flex-[1] flex-col p-20 min-w-[180px]'
					ref={setContainer}>
					<h3 className='m-auto text-center text-5xl'>
						<span
							data-font-family='BOXING'
							ref={setText}>
							{`Layne Chen Portfolio ‘24`}
						</span>
					</h3>
				</div>

				<div
					className='border border-neutral min-h-[39rem] flex flex-[1] flex-col p-20 min-w-[180px]'
					ref={setContainer}>
					<div className='m-auto text-center'>
						<h3 className='text-4xl mb-6 leading-[1.5]'>
							<span
								data-font-family='BOXING'
								ref={setText}>{`# frontend`}</span>
						</h3>
						<ul className='font-satoshi text-xl leading-[1.5]'>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={setText}>{`TypeScript`}</span>
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
									ref={setText}>{`CSS`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={setText}>{`Next.js`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={setText}>{`Tailwind CSS`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={setText}>{`Three.js`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={setText}>{`GSAP`}</span>
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
				ref={setContainer}>
				<div className='border border-neutral min-h-72 flex p-20 gap-14 flex-col md:flex-row'>
					<h3 className='m-auto text-center text-4xl leading-[1.25]'>
						<span
							data-font-family='BOXING'
							ref={setText}>
							{`overview`}
						</span>
					</h3>

					<p className='m-auto text-xl font-satoshi whitespace-pre-line leading-[1.5]'>
						<span
							data-font-family='SATOSHI'
							ref={setText}>
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
				ref={setContainer}
				onPointerEnter={e => toggleRipple(false)}
				onPointerLeave={e => toggleRipple(true)}>
				<a
					href={process.env.NEXT_PUBLIC_BASE_URL}
					target='_blank'
					title='Go to Layne Chen Portfolio ‘24 demo page'>
					<span
						data-font-family='BOXING'
						data-font-highlight='button'
						ref={setText}>
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
						ref={setText}>
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
					setContainer(el);
					setAnchor(el);
				}}
				data-parallax='previewShareYourMemories'
				data-anchor={CHAP.PROJECT}>
				<Image
					loading='lazy'
					src={previewShareYourMemories}
					alt={`Web interface displaying a music memory-sharing platform with a dark theme. The layout features a header with the title 'Share Your Memories' and includes options for searching, bookmarks, profile, and logout. The main section shows a grid of memory cards, each with an image, title, hashtags, description, and a like count. The right sidebar includes a form labeled 'Create a memory' with fields for title, message, and tags, along with submit and clear buttons. Pagination is visible below the grid of memory cards.`}
					className='h-full w-full object-cover'
				/>
			</figure>
			{/* -------------------------------------------------------------------------- */
			/*                                    1st row right                            */
			/* -------------------------------------------------------------------------- */}

			<div className='block flex-[1_0_100%] md:hidden'></div>

			<div className='flex flex-[1] gap-12 flex-row flex-wrap md:flex-col'>
				<div
					className='border border-neutral min-h-72 flex flex-col p-20 flex-[1] min-w-[180px]'
					ref={setContainer}>
					<h3 className='m-auto text-center text-5xl'>
						<span
							data-font-family='BOXING'
							ref={setText}>
							{`Share Your Memories`}
						</span>
					</h3>
				</div>

				<div
					className='border border-neutral min-h-[39rem] flex flex-col p-20 flex-[1] md:flex-auto min-w-[180px]'
					ref={setContainer}>
					<div className='m-auto text-center'>
						<h3 className='text-4xl mb-6 leading-[1.5]'>
							<span
								data-font-family='BOXING'
								ref={setText}>{`# full stack`}</span>
						</h3>
						<ul className='font-satoshi text-xl leading-[1.5]'>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={setText}>{`JavaScript`}</span>
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
									ref={setText}>{`CSS`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={setText}>{`React (hooks)`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={setText}>{`React Router`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={setText}>{`React Redux`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={setText}>{`Material UI`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={setText}>{`Node.js`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={setText}>{`Express`}</span>
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
							<li>
								<span
									data-font-family='SATOSHI'
									ref={setText}>{`Axios`}</span>
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
				ref={setContainer}>
				<div className='border border-neutral min-h-72 flex p-20 gap-14 flex-col md:flex-row'>
					<h3 className='m-auto text-center text-4xl leading-[1.25]'>
						<span
							data-font-family='BOXING'
							ref={setText}>
							{`overview`}
						</span>
					</h3>

					<p className='m-auto text-xl font-satoshi whitespace-pre-line leading-[1.5]'>
						<span
							data-font-family='SATOSHI'
							ref={setText}>
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
				ref={setContainer}
				onPointerEnter={e => toggleRipple(false)}
				onPointerLeave={e => toggleRipple(true)}>
				<a
					href='https://laynesquare.github.io/share_your_memories'
					target='_blank'
					title='Go to Share Your Memories demo page'>
					<span
						data-font-highlight='button'
						data-font-family='BOXING'
						ref={setText}>{`[ demo ]`}</span>
				</a>
				<a
					href='https://github.com/laynesquare/share_your_memories'
					target='_blank'
					title='Go to Share Your Memories source code page'>
					<span
						data-font-highlight='button'
						data-font-family='BOXING'
						ref={setText}>{`[ code ]`}</span>
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
					setContainer(el);
					setAnchor(el);
				}}
				data-parallax='previewLearnEnglishDictionary'
				data-anchor={CHAP.PROJECT}>
				<Image
					loading='lazy'
					src={previewLearnEnglishDictionary}
					alt={`Dark-themed web interface titled 'Learn English with Dictionary' designed to facilitate English learning. The page has a central search bar for entering keywords and an orange search button. A sidebar on the left has 'Home' and 'Result' options, with instructions in the center section under the heading 'Let's Get Started.' The instructions guide users on how to search for definitions, and an illustration of a person with raised fists is displayed. On the right, a panel displays the word 'none' with pronunciation and multiple definitions categorized as noun, adverb, and pronoun, each with examples.`}
					className='h-full w-full object-cover'
				/>
			</figure>

			<div className='block flex-[1_0_100%] md:hidden'></div>

			{/* -------------------------------------------------------------------------- */
			/*                                    1st row right                             */
			/* -------------------------------------------------------------------------- */}
			<div className='flex flex-[1] gap-12 flex-row flex-wrap md:flex-col'>
				<div
					className='border border-neutral min-h-72 flex p-20 flex-col flex-[1] min-w-[180px]'
					ref={setContainer}>
					<h3 className='m-auto text-center text-5xl'>
						<span
							data-font-family='BOXING'
							ref={setText}>
							{`Learn English with Dictionary`}
						</span>
					</h3>
				</div>

				<div
					className='border border-neutral min-h-[39rem] flex flex-col p-20 flex-[1] min-w-[180px]'
					ref={setContainer}>
					<div className='m-auto text-center'>
						<h3 className='text-4xl mb-6 leading-[1.5]'>
							<span
								data-font-family='BOXING'
								ref={setText}>{`# frontend`}</span>
						</h3>
						<ul className='font-satoshi text-xl leading-[1.5]'>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={setText}>{`JavaScript`}</span>
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
									ref={setText}>{`CSS`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={setText}>{`React (hooks)`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={setText}>{`React Redux`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={setText}>{`Material UI`}</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={setText}>{`Axios`}</span>
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
				ref={setContainer}>
				<h3 className='m-auto text-center text-4xl leading-[1.25]'>
					<span
						data-font-family='BOXING'
						ref={setText}>
						{`overview`}
					</span>
				</h3>

				<p className='m-auto text-xl font-satoshi whitespace-pre-line leading-[1.5]'>
					<span
						data-font-family='SATOSHI'
						ref={setText}>
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
				ref={el => setContainer(el)}
				onPointerEnter={e => toggleRipple(false)}
				onPointerLeave={e => toggleRipple(true)}>
				<a
					href='https://laynesquare.github.io/learn_english_with_dictionary'
					target='_blank'
					title='Go to Learn English with Dictionary demo page'>
					<span
						data-font-highlight
						data-font-family='BOXING'
						ref={setText}>{`[ demo ]`}</span>
				</a>
				<a
					href='https://github.com/laynesquare/learn_english_with_dictionary'
					target='_blank'
					title='Go to Learn English with Dictionary source code page'>
					<span
						data-font-highlight
						data-font-family='BOXING'
						ref={setText}>
						{`[ code ]`}
					</span>
				</a>
			</div>
		</section>
	);
}

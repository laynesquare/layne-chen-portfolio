// store
import { useDomStore } from '@/store';

// constant
import { CHAP } from '@/config/constants';

export default function Experience() {
	const setText = useDomStore(state => state?.setText);
	const setContainer = useDomStore(state => state?.setContainer);
	const setAnchor = useDomStore(state => state?.setAnchor);

	return (
		<section
			className='flex gap-x-12 gap-y-6 flex-wrap'
			id='experience'>
			{/* -------------------------------------------------------------------------- */
			/*                                    upper 1st                                */
			/* -------------------------------------------------------------------------- */}
			<header
				className='flex-[1] text-[13.75rem] border border-neutral min-h-72 flex rounded-[12rem_12rem_0rem_0rem] p-20'
				ref={setContainer}>
				<h2 className='m-auto leading-none'>
					<span
						data-font-family='BOXING'
						ref={setText}>
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
				ref={setContainer}>
				<h2 className='m-auto text-6xl'>
					<span
						data-font-family='BOXING'
						ref={setText}>
						{'[04.]'}
					</span>
				</h2>
			</div>
			<div
				className='flex-[1] text-7xl border border-neutral min-h-96 flex p-20 rounded-[12rem_0rem_0rem_12rem]'
				ref={setContainer}>
				<h3 className='m-auto leading-none text-center'>
					<span
						data-font-family='BOXING'
						ref={setText}>
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
					setContainer(el);
					setAnchor(el);
				}}
				data-anchor={CHAP.EXPERIENCE}
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
					ref={setContainer}>
					<div className='m-auto text-center'>
						<ul className='font-satoshi text-3xl leading-[1.5]'>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={setText}>
									{`KunYou Technology Co., LTD., Full-time`}
								</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={setText}>
									{`June 2023 - July 2024, 1yr 2mos`}
								</span>
							</li>
							<li>
								<span
									data-font-family='SATOSHI'
									ref={setText}>
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
					ref={setContainer}>
					<div className='m-auto text-center'>
						<p className='text-xl font-satoshi leading-[1.5]'>
							<span
								data-font-family='SATOSHI'
								ref={setText}>
								{`Facilitated the official website's SEO and achieved 100 in the Lighthouse index with Angular Universal's SSG tech`}
							</span>
						</p>
					</div>
				</div>
				<div
					className='border border-neutral min-h-72 flex-[1_30%] flex min-w-[180px] p-20'
					ref={setContainer}>
					<div className='m-auto text-center'>
						<p className='text-xl font-satoshi leading-[1.5]'>
							<span
								data-font-family='SATOSHI'
								ref={setText}>
								{`Utilized UI framework PrimeNG and data-visualizing package ECharts to materialize UI/UX drafts and RWD`}
							</span>
						</p>
					</div>
				</div>
				<div
					className='border border-neutral min-h-72 flex-[1_30%] flex min-w-[180px] p-20'
					ref={setContainer}>
					<div className='m-auto text-center'>
						<p className='text-xl font-satoshi leading-[1.5]'>
							<span
								data-font-family='SATOSHI'
								ref={setText}>
								{`Used RxJS to execute asynchronous requests and fulfilled API integration`}
							</span>
						</p>
					</div>
				</div>

				{/* -------------------------------------------------------------------------- */
				/*                                btm 3nd row - listed des                   */
				/* -------------------------------------------------------------------------- */}
				<div
					className='border border-neutral min-h-72 flex-[1_30%] flex min-w-[180px] p-20'
					ref={setContainer}>
					<div className='m-auto text-center'>
						<p className='text-xl font-satoshi leading-[1.5]'>
							<span
								data-font-family='SATOSHI'
								ref={setText}>
								{`Used Karma/Jasmine to implement Unit Test and achieve 98% code coverage`}
							</span>
						</p>
					</div>
				</div>
				<div
					className='border border-neutral min-h-72 flex-[1_30%] flex min-w-[180px] p-20'
					ref={setContainer}>
					<div className='m-auto text-center'>
						<p className='text-xl font-satoshi leading-[1.5]'>
							<span
								data-font-family='SATOSHI'
								ref={setText}>
								{`Acquired AA level of web accessibility standard in developing public sector projects`}
							</span>
						</p>
					</div>
				</div>
				<div
					className='border border-neutral min-h-[120rem] flex-[1_100%] flex min-w-[180px] rounded-[0rem_0rem_9rem_9rem] p-20 md:rounded-[0rem_0rem_9rem_0rem] md:min-h-72'
					ref={el => {
						setContainer(el);
						setAnchor(el);
					}}
					data-anchor={CHAP.EXPERIENCE}
					data-anchor-mirror>
					<div className='m-auto text-center'></div>
				</div>
			</div>
		</section>
	);
}

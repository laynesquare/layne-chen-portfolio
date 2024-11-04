// store
import { useDomStore } from '@/store';

// constant
import { CHAP } from '@/config/constants';

export default function About() {
	const textElStoreRegister = useDomStore(state => state?.setText);
	const containerElStoreRegister = useDomStore(state => state?.setContainer);
	const anchorElStoreRegister = useDomStore(state => state?.setAnchor);
	return (
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
						data-font-family='BOXING'
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
					data-font-family='BOXING'
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
						data-font-family='SATOSHI'
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
				data-anchor={CHAP.ABOUT}></div>
		</section>
	);
}

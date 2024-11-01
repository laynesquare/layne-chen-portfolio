// store
import { useDomStore } from '@/store';

export default function Hero() {
	const textElStoreRegister = useDomStore(state => state?.textElRegister);

	return (
		<section
			className='h-dvh w-full relative flex flex-col overflow-hidden'
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
	);
}

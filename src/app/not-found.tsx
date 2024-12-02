import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='h-full flex flex-col justify-center items-center font-boxing text-neutral text-center gap-[24px] p-[24px] leading-none overflow-hidden'>
			<h1 className='text-[100px] leading-[1.5] border-b border-neutral'>404</h1>
			<h2 className='text-[32px]'>Page Not Found</h2>
			<p className='text-[18px]'>Could not find the requested resource</p>
			<p className='text-[24px] leading-[2] whitespace-nowrap'>༼;´༎ຶ ۝ ༎ຶ༽</p>
			<Link
				title='Go back to the home page'
				className='text-[18px] text-highlight whitespace-nowrap'
				href='/'>
				[ Return Home ]
			</Link>
		</div>
	);
}

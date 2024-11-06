import { useRef, useState } from 'react';

// store
import { useNavStore } from '@/store';

// gsap
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

export default function NavOpenBtn() {
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

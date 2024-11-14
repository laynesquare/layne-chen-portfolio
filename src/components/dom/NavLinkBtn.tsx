import { useRef, useState } from 'react';

// store
import { useWebGlStore } from '@/store';

// gsap
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface NavLinkBtnProps {
	label: string;
	href: string;
}

export default function NavLinkBtn({ label, href }: NavLinkBtnProps) {
	const ctnRef = useRef(null);
	const [isHover, setIsHover] = useState(false);
	const isLoaded = useWebGlStore(state => state.isLoaded);

	useGSAP(
		() => {
			gsap.to('[data-nav-action]', {
				yPercent: isHover ? -100 : 0,
				duration: 0.5,
				ease: 'bounce.out',
			});
			gsap.to('[data-nav-action-clone]', {
				yPercent: isHover ? 0 : 100,
				duration: 0.5,
				ease: 'bounce.out',
			});
		},
		{ dependencies: [isHover, isLoaded], scope: ctnRef },
	);

	return (
		<a
			className='relative leading-none min-w-max overflow-hidden'
			href={href}
			target='_blank'
			title={`Go to ${label.charAt(0).toUpperCase() + label.slice(1)}`}
			onPointerEnter={() => setIsHover(true)}
			onPointerLeave={() => setIsHover(false)}
			ref={ctnRef}>
			<span
				data-nav-action
				className={`h-full flex items-center`}>
				{`[ ${label} ]`}
			</span>
			<span
				data-nav-action-clone
				className='absolute top-0 left-0 h-full flex items-center'>
				{`[ ${label} ]`}
			</span>
		</a>
	);
}

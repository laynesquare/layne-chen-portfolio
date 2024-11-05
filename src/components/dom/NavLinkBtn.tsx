import { useRef, useState } from 'react';

// gsap
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

interface NavLinkBtnProps {
	label: string;
	href: string;
}

export default function NavLinkBtn({ label, href }: NavLinkBtnProps) {
	const ctnRef = useRef(null);
	const [isHover, setIsHover] = useState(false);

	useGSAP(
		() => {
			if (isHover) {
				gsap.to('[data-nav-action]', {
					yPercent: -100,
					duration: 0.5,
					ease: 'bounce.out',
				});
				gsap.to('[data-nav-action-clone]', {
					yPercent: 0,
					duration: 0.5,
					ease: 'bounce.out',
				});
			} else {
				gsap.to('[data-nav-action]', {
					yPercent: 0,
					duration: 0.5,
					ease: 'bounce.out',
				});
				gsap.to('[data-nav-action-clone]', {
					yPercent: 100,
					duration: 0.5,
					ease: 'bounce.out',
				});
			}
		},
		{ dependencies: [isHover], scope: ctnRef },
	);
	return (
		<a
			className='relative leading-none overflow-hidden min-w-max'
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
				{`[ ${label} ]`}{' '}
			</span>
		</a>
	);
}

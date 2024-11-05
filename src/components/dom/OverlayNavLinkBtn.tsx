import { useRef, useState } from 'react';

// util
import { getMapRange } from '@/utils';

// gsap
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);

// type
import type { PointerEvent } from 'react';

interface NavLinkBtnProps {
	label: string;
	href: string;
}

export default function OverlayNavLinkBtn({ label, href }: NavLinkBtnProps) {
	const [isHover, setIsHover] = useState(false);
	const pointerRef = useRef({ xPercent: 0, yPercent: 0 });
	const btnRef = useRef<HTMLAnchorElement>(null);
	const labelRef = useRef(null);
	const flairRef = useRef(null);

	function handlePointerEnter(e: PointerEvent<HTMLAnchorElement>) {
		if (btnRef.current) {
			const { clientX, clientY } = e;
			const { left, top, width, height } = btnRef.current.getBoundingClientRect();
			const originX = clientX - left;
			const originY = clientY - top;
			const mapOriginX = getMapRange(originX, 0, width, 0, 100);
			const mapOriginY = getMapRange(originY, 0, height, 0, 100);

			pointerRef.current = {
				xPercent: mapOriginX,
				yPercent: mapOriginY,
			};

			setIsHover(true);
		}
	}

	useGSAP(
		() => {
			const tl = gsap.timeline();

			const ease = 'sine.in';

			const { xPercent, yPercent } = pointerRef.current;

			const configPositioningCircle = {
				xPercent,
				yPercent,
				duration: 0,
			};

			const configScale = {
				scale: isHover ? 1.1 : 0,
				duration: 0.25,
				ease,
			};

			const configDisplace = {
				y: isHover ? '0.1rem' : 0,
				boxShadow: isHover
					? `0px 0.275rem 0px 0px var(--color-abysmal)`
					: `0px 0.375rem 0px 0px var(--color-abysmal)`,
				duration: 0.25,
				ease,
			};

			if (isHover) {
				tl.to(flairRef.current, configPositioningCircle)
					.to(flairRef.current, configScale)
					.to(btnRef.current, configDisplace, '<');
			} else {
				tl.to(flairRef.current, configScale).to(btnRef.current, configDisplace, '<');
			}
		},
		{ dependencies: [isHover], scope: btnRef },
	);

	return (
		<>
			<a
				ref={btnRef}
				href={href}
				target='_blank'
				title={`Go to ${label.charAt(0).toUpperCase() + label.slice(1)}`}
				onPointerEnter={e => handlePointerEnter(e)}
				onPointerLeave={() => setIsHover(false)}
				className='px-[max(2.25rem,2.25rem)] py-[max(0.875rem,14px)] text-2xl border border-neutralContrast bg-neutral h-[min-content] relative overflow-hidden cursor-pointer min-w-[96px] text-center flex-[1] md:flex-auto'>
				<span
					ref={flairRef}
					className={`absolute top-0 left-0 bottom-0 right-0 pointer-events-none scale-0 origin-top-left will-change-transform 
					before:content-[''] before:absolute before:top-0 before:bottom-0 before:right-0 before:left-0 before:w-[200%] before:aspect-square 
					before:bg-[#e8fe25] before:border-2 before:border-neutralContrast before:rounded-full 
					before:-translate-x-1/2 before:-translate-y-1/2 before:pointer-events-none`}></span>
				<span
					ref={labelRef}
					className='relative block'>
					{label}
				</span>
			</a>
		</>
	);
}

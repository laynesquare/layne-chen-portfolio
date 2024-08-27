import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Html, useProgress } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { VscMenu } from 'react-icons/vsc';
import { RiCloseLargeFill } from 'react-icons/ri';

import layneChen from '@/public/frame/layne_chen_clash.svg';
import frameTopLeftIdentity from '@/public/frame/frame-top-left-identity.png';

gsap.registerPlugin(useGSAP);

// z-index: 10 => 在球上面

function Menu() {
	const [isOpen, setIsOpen] = useState(false);
	const [isHover, setIsHover] = useState(false);

	const btnRef = useRef(null);
	const btnUnderlayRef = useRef(null);
	const iconRef = useRef(null);
	const textRef = useRef(null);
	const navRef = useRef(null);
	const cornerRef = useRef(null);

	useGSAP(() => {
		gsap.to(btnRef.current, {
			backgroundColor: isOpen ? 'var(--color-secondary)' : 'transparent',
			padding: isOpen ? '0.75rem 1rem 0.75rem 1rem' : '0.75rem 1rem 0.75rem 1rem',
			border: isOpen ? '1px solid var(--color-white)' : '1px solid var(--color-font-neutral)',
			color: isOpen ? 'var(--color-font-neutral)' : 'var(--color-font-neutral)',
			ease: 'linear',
			duration: 0.1,
		});

		const tl = gsap.timeline();

		tl.to(btnUnderlayRef.current, {
			opacity: isOpen ? '1' : '0',
			width: isOpen ? '100%' : '0%',
			borderRadius: isOpen ? '1.5rem 1.5rem 0 0' : '0',
			padding: isOpen ? '0.5rem' : '0',
			ease: 'power1.in',
			duration: 0.15,
		}).to(
			navRef.current,
			{
				opacity: isOpen ? '1' : '0',
				width: isOpen ? '100%' : '0%',
				height: isOpen ? '100%' : '0%',
				borderRadius: isOpen ? '2rem 0 2rem 2rem' : '0',
				padding: isOpen ? '1rem 1.5rem 2.5rem 1.5rem' : '0',
				duration: 0.15,
				ease: 'power1.in',
			},
			'<',
		);

		gsap.to(cornerRef.current, {
			opacity: isOpen ? '1' : '0',
			right: isOpen ? '141' : '0',
			duration: isOpen ? 0.15 : 0.05,
			ease: 'power1.in',
		});

		gsap.fromTo(
			iconRef.current,
			{ opacity: 0, y: 10 },
			{ opacity: 1, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' },
		);

		gsap.fromTo(
			textRef.current,
			{ opacity: 0, y: 10 },
			{ opacity: 1, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' },
		);
	}, [isOpen]);

	useGSAP(() => {
		if (isHover) {
			gsap.fromTo(
				textRef.current,
				{ opacity: 0, x: 10 },
				{ opacity: 1, x: 0, duration: 1, ease: 'elastic.out(1, 0.5)' },
			);
			gsap.fromTo(
				iconRef.current,
				{ opacity: 0, x: 10 },
				{ opacity: 1, x: 0, duration: 1, ease: 'elastic.out(1, 0.5)' },
			);
		}
	}, [isHover]);

	return (
		<div className='top-6 right-6 absolute flex justify-end flex-col items-end z-10'>
			<div className='relative'>
				<button
					ref={btnRef}
					className='flex items-center gap-2 leading-none rounded-full w-max mx-4 mt-4 mb-4'
					onClick={() => setIsOpen(!isOpen)}
					onMouseOver={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}>
					<p
						ref={textRef}
						className='pt-[2px]'>
						{isOpen ? 'CLOSE' : 'MENU'}
					</p>
					<div ref={iconRef}>
						{isOpen ? <RiCloseLargeFill className='text-base' /> : <VscMenu className='text-base' />}
					</div>
				</button>

				<div
					className='menu-btn-underlay'
					ref={btnUnderlayRef}></div>
			</div>

			<div
				ref={navRef}
				className='bg-secondary w-full overflow-hidden'>
				<nav className='text-3xl'>
					<ul className='flex flex-col'>
						<li>
							<a
								className='py-4 pr-4 block border-b border-b-1-neutral'
								href=''>
								About
							</a>
						</li>
						<li>
							<a
								className='py-4 pr-4 block border-b border-b-1-neutral'
								href=''>
								Skills
							</a>
						</li>
						<li>
							<a
								className='py-4 pr-4 block border-b border-b-1-neutral'
								href=''>
								Experience
							</a>
						</li>
						<li>
							<a
								className='py-4 pr-4 block border-b border-b-1-neutral'
								href=''>
								Projects
							</a>
						</li>
						<li>
							<a
								className='py-4 pr-4 block border-b border-b-1-neutral'
								href=''>
								Contact
							</a>
						</li>
					</ul>
				</nav>
			</div>

			<svg
				ref={cornerRef}
				className='top-[36px] absolute pointer-events-none'
				style={{ transform: 'rotate(-180deg)' }}
				width='32'
				height='32'
				viewBox='0 0 32 32'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<g clip-path='url(#clip0_310_2)'>
					<path
						d='M30 0H0V30C0 13.431 13.431 0 30 0Z'
						fill='var(--color-secondary)'></path>
				</g>
				<defs>
					<clipPath id='clip0_310_2'>
						<rect
							width='30'
							height='30'
							fill='white'></rect>
					</clipPath>
				</defs>
			</svg>
		</div>
	);
}

export default function Hero({ contentRef }) {
	const { progress, item } = useProgress();

	useGSAP(() => {
		if (progress === 100) {
			gsap.to(contentRef.current, {
				opacity: 1,
				duration: 1.5,
				ease: 'power2.inOut',
			});
		}
	}, [progress]);

	return (
		<div
			id='smooth-content'
			className='absolute w-full top-0 left-0 opacity-0'
			ref={contentRef}>
			<div className='h-dvh w-dvw relative'>
				<Menu />

				<div className='top-10 left-10 absolute'>
					<Image
						src={frameTopLeftIdentity}
						alt='logo'
						className='w-12'
					/>
				</div>

				{/* <div className='bottom-10 left-10 absolute'>
					<h2 className='kronaOne.className text-4xl max-w-screen-lg leading-snug'>
						Engin€€ring High-Performance Web Experiences with Pre©ision and Expertise.
					</h2>
				</div> */}

				<div className='bottom-10 absolute w-dvw z-10 pointer-events-none bg-transparent mix-blend-difference'>
					<Image
						className='origin-bottom scale-y-[1.1]'
						style={{ width: '100%', height: '100%', padding: '0 3rem' }}
						src={layneChen}
						alt='Layne Chen'
					/>
				</div>
			</div>

			<h1 style={{ mixBlendMode: 'difference' }}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis in enim aliquid fugit error dignissimos
				nostrum numquam eius. Ea provident ducimus sit eaque delectus expedita doloremque architecto nisi
				deserunt recusandae rerum sunt reiciendis nemo debitis, ratione aperiam est nihil nesciunt commodi
				quidem. Ab, quas tempore? Obcaecati optio odio ut illum saepe, veniam quod omnis dolor illo libero
				voluptatibus aliquid iusto error laborum sapiente soluta eveniet laudantium consectetur labore incidunt
				quam temporibus! Illo est fugiat soluta laboriosam ex iusto at inventore a iste vel, id laborum odit
				error? Voluptatum labore tenetur mollitia numquam, fuga maiores saepe ad, maxime cupiditate culpa iste
				accusamus, eius nam a possimus quos facilis magnam laborum autem nihil similique id. Debitis totam
				aperiam, maiores nam repellendus architecto incidunt voluptas perferendis vitae soluta et
				necessitatibus? Quo obcaecati fuga magnam voluptas, aut aperiam velit nostrum harum pariatur? Magnam,
				ipsam odio animi dolorem deleniti molestias enim aut quod maxime dolor at sed illo dolores. Nulla, ea!
				Corrupti dolores eum voluptate tempora facere doloremque perferendis hic accusamus porro cupiditate,
				laborum soluta voluptatibus dicta exercitationem neque maxime aut alias qui, consectetur velit! Tempore
				laudantium reiciendis ipsam sit pariatur quas perferendis voluptates nihil. Sequi voluptatum enim porro
				provident mollitia commodi ipsam. Earum blanditiis iste sequi, quos error alias laboriosam eum aliquam
				corporis soluta repellendus praesentium aliquid nostrum eveniet laborum. Tempore cumque voluptatum iste,
				alias optio illum, quasi atque unde eos molestiae, tempora molestias maxime? Culpa, aliquam alias, amet
				officiis molestiae nostrum ad numquam impedit voluptates delectus, odit obcaecati quam suscipit officia
				iste fuga quas magnam! Enim nemo a ullam ea dignissimos, architecto corrupti magnam repellendus deleniti
				sapiente soluta amet natus fugit non velit laudantium sint omnis corporis est nostrum! Libero deleniti
				repellendus qui nisi quasi atque dolor eum. Esse architecto iusto consequatur aliquam dolorem molestiae
				consectetur praesentium, magnam consequuntur dolore, laudantium quibusdam! Eaque provident ipsum
				blanditiis error, repudiandae porro similique modi eos debitis vitae quidem enim voluptatibus sunt
				culpa, fugiat quis consequuntur temporibus perspiciatis tenetur id voluptas aspernatur accusantium non?
				Asperiores assumenda reprehenderit aliquam veritatis incidunt illo iusto, laborum et neque minus
				explicabo, molestiae voluptate consectetur quia quasi officiis, placeat corrupti iste. Harum corporis
				modi blanditiis dignissimos, quia nihil. Sunt fugit nesciunt ullam eos! Molestiae fuga asperiores porro
				incidunt aliquam aut deserunt voluptates nisi repellendus provident atque magni blanditiis, obcaecati
				exercitationem alias voluptatum cum adipisci doloremque. Necessitatibus odit maiores eligendi illo
				labore expedita dolorem tempora, quae dolores deserunt amet perspiciatis nihil tenetur quos maxime
				debitis aliquid porro ex rem quo veritatis quisquam. Quod quae est inventore ut quo vitae minus officia
				animi fugit alias error sint eligendi atque porro pariatur amet, deleniti sed, aliquid nihil! Similique
				ipsum totam dignissimos aperiam cumque quos eius consectetur, eaque eligendi ipsam corrupti at esse
				minus, quia voluptate cum modi accusantium vero. Autem, deserunt optio provident aut enim maxime
				molestias modi et, ut reiciendis architecto libero incidunt nulla quis labore ex eaque odit numquam id
				earum doloremque repudiandae. Suscipit unde nobis tempore. Ipsa eum iure deserunt corrupti illum? Fugit
				et, possimus quod velit qui excepturi officia repellat soluta magni eos vel voluptatum atque cupiditate,
				aspernatur laborum obcaecati inventore, magnam consequuntur. Soluta, ad? Voluptatum, nostrum, odio
				laudantium fugit repudiandae iste architecto sunt exercitationem blanditiis quo labore aperiam totam
				libero est atque iusto sequi nemo enim assumenda animi error illo vel. Dolores quibusdam similique
				temporibus veniam hic culpa repudiandae magni atque minus animi voluptas pariatur, illo qui dolorum
				repellendus odit, iusto sequi, repellat ab eius ipsam?
			</h1>
		</div>
	);
}

'use client';

// core
import React, { useEffect } from 'react';
import Image from 'next/image';

// types
import { FrameProps } from '@/types';

// three

// img
import frameTopLeftIdentity from '@/public/frame/frame-top-left-identity.png';
import frameTopCenter1st from '@/public/frame/frame-top-center-1st.png';
import frameTopCenter2nd from '@/public/frame/frame-top-center-2nd.png';
import frameTopCenter3rd from '@/public/frame/frame-top-center-3rd.png';
import frameTopCenter4th from '@/public/frame/frame-top-center-4th.png';
import frameTopCenter5th from '@/public/frame/frame-top-center-5th.png';

import frameLeftCenter1st from '@/public/frame/frame-left-center-1st.png';
import frameLeftCenter2nd from '@/public/frame/frame-left-center-2nd.png';
import frameLeftCenter3rd from '@/public/frame/frame-left-center-3rd.png';
import frameLeftCenter4th from '@/public/frame/frame-left-center-4th.png';
import frameLeftCenter5th from '@/public/frame/frame-left-center-5th.png';

import frameRightCenter1st from '@/public/frame/frame-right-center-1st.png';
import frameRightCenter2nd from '@/public/frame/frame-right-center-2nd.png';
import frameRightCenter3rd from '@/public/frame/frame-right-center-3rd.png';

import frameCenterLetterL from '@/public/frame/frame-center-letter-l.svg';
import frameCenterLetterA from '@/public/frame/frame-center-letter-a.svg';
import frameCenterLetterY from '@/public/frame/frame-center-letter-y.svg';
import frameCenterLetterN from '@/public/frame/frame-center-letter-n.svg';
import frameCenterLetterE from '@/public/frame/frame-center-letter-e.svg';

import frameCenterLetterCFamily from '@/public/frame/frame-center-letter-c-family.svg';
import frameCenterLetterHFamily from '@/public/frame/frame-center-letter-h-family.svg';
import frameCenterLetterEFamily from '@/public/frame/frame-center-letter-e-family.svg';
import frameCenterLetterNFamily from '@/public/frame/frame-center-letter-n-family.svg';

export default function Frame({ isSceneLoaded = true, scroll }: FrameProps) {
	useEffect(() => {
		console.log(scroll);
	}, [scroll]);
	return (
		<>
			<div className={isSceneLoaded ? 'block' : 'hidden'}>
				<div className='frame-top'>
					<div className='frame-top-item'>
						<Image
							src={frameTopLeftIdentity}
							alt='logo'
							className='frame-top-item-icon'
						/>
					</div>
					<div className='frame-top-item'>
						<Image
							src={frameTopCenter1st}
							alt=''
							className='frame-top-item-icon'
						/>
						<Image
							src={frameTopCenter2nd}
							alt=''
							className='frame-top-item-icon'
						/>
						<Image
							src={frameTopCenter3rd}
							alt=''
							className='frame-top-item-icon'
						/>
						<Image
							src={frameTopCenter4th}
							alt=''
							className='frame-top-item-icon'
						/>
						<Image
							src={frameTopCenter5th}
							alt=''
							className='frame-top-item-icon'
						/>
					</div>
					<div className='frame-top-item'>
						<div className='frame-top-item-icon-hamburger'>
							<div className='bar1'></div>
							<div className='bar2'></div>
							<div className='bar3'></div>
						</div>
					</div>
				</div>
				<div className='frame-left'>
					<div className='frame-left-item'>
						<Image
							src={frameLeftCenter1st}
							alt=''
							className='frame-left-item-icon'
						/>
						<Image
							src={frameLeftCenter2nd}
							alt=''
							className='frame-left-item-icon'
						/>
						<Image
							src={frameLeftCenter3rd}
							alt=''
							className='frame-left-item-icon'
						/>
						<Image
							src={frameLeftCenter4th}
							alt=''
							className='frame-left-item-icon'
						/>
						<Image
							src={frameLeftCenter5th}
							alt=''
							className='frame-left-item-icon'
						/>
					</div>
					<div className='frame-left-item'>
						<div className='frame-left-item-icon-music'>
							<div className='bar1'></div>
							<div className='bar2'></div>
							<div className='bar4'></div>
							<div className='bar5'></div>
							<div className='bar6'></div>
						</div>
					</div>
				</div>
				<div className='frame-right'>
					<div className='frame-right-item'>
						<Image
							src={frameRightCenter1st}
							alt=''
							className='frame-right-item-icon'
						/>
						<Image
							src={frameRightCenter2nd}
							alt=''
							className='frame-right-item-icon'
						/>
						<Image
							src={frameRightCenter3rd}
							alt=''
							className='frame-right-item-icon'
						/>
					</div>
				</div>
				<div className='frame-bottom'></div>

				<div className='prompt-view-panorama-ctn'>
					<p>press</p>
					<div className='btn-mattress'>
						<button>space</button>
					</div>
					<p>to</p>
					<p>view</p>
					<p>panorama</p>
				</div>

				<div className='prompt-hover-ring-rotate-ctn'>
					<p>hover the ring to rotate</p>
				</div>

				{/* <Image
					src={frameCenterLetterL}
					alt=''
					className='frame-center-letter frame-center-letter-l'
				/>
				<Image
					src={frameCenterLetterA}
					alt=''
					className='frame-center-letter frame-center-letter-a'
				/>
				<Image
					src={frameCenterLetterY}
					alt=''
					className='frame-center-letter frame-center-letter-y'
				/>
				<Image
					src={frameCenterLetterN}
					alt=''
					className='frame-center-letter frame-center-letter-n'
				/>
				<Image
					src={frameCenterLetterE}
					alt=''
					className='frame-center-letter frame-center-letter-e'
				/>
				<Image
					src={frameCenterLetterCFamily}
					alt=''
					className='frame-center-letter frame-center-letter-c-family'
				/>
				<Image
					src={frameCenterLetterHFamily}
					alt=''
					className='frame-center-letter frame-center-letter-h-family'
				/>
				<Image
					src={frameCenterLetterEFamily}
					alt=''
					className='frame-center-letter frame-center-letter-e-family'
				/>
				<Image
					src={frameCenterLetterNFamily}
					alt=''
					className='frame-center-letter frame-center-letter-n-family'
				/> */}
			</div>
		</>
	);
}

'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Frame, Loader, Camera } from '@/components';

const Scene = dynamic(() => import('@/components/scenery/Scene'), { ssr: false });

export default function Home() {
	const [isSceneLoaded, setIsSceneLoaded] = useState<boolean>(false);
	const [scroll, setScroll] = useState<number>(null);

	const handleSceneLoaded = () => {
		setIsSceneLoaded(true);
	};

	const handleScroll = (offset: number) => {
		setScroll(offset);
	};

	return (
		<main className='h-full'>
			{/* <Frame
				isSceneLoaded={isSceneLoaded}
				scroll={scroll}
			/> */}
			<Scene
				Loader={<Loader handleSceneLoaded={handleSceneLoaded} />}
				Camera={<Camera handleScroll={handleScroll} />}
			/>
		</main>
	);
}

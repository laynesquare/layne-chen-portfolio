'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Frame, Loader } from '@/components';

const Scene = dynamic(() => import('@/components/scenery/Scene'), { ssr: false });

export default function Home() {
	const [isSceneLoaded, setIsSceneLoaded] = useState<boolean>(false);
	const [sroll, setScroll] = useState<number | null>(null);

	const handleSceneLoaded = () => {
		setIsSceneLoaded(true);
	};

	const handleScroll = () => {
		setScroll(true);
	};

	return (
		<main className='h-full'>
			<Frame isSceneLoaded={isSceneLoaded} />
			<Scene loader={<Loader handleSceneLoaded={handleSceneLoaded} />} />
		</main>
	);
}

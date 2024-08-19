'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Frame, Loader, Camera, Scene, Hero } from '@/components';

// const Scene = dynamic(() => import('@/components/scenery/Scene'), { ssr: false });

export default function Home() {
	return (
		<main className='h-full'>
			<Hero />
			<Scene />
		</main>
	);
}

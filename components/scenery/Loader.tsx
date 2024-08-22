import { Html, useProgress } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Loader() {
	const { progress, item } = useProgress();
	const loaderRef = useRef<LegacyRef<HTMLDivElement> | undefined>(null);

	useGSAP(() => {
		if (progress === 100) {
			gsap.to(loaderRef.current, {
				opacity: 0,
				duration: 1.5,
				ease: 'power2.inOut',
				onComplete: () => {
					if (loaderRef.current) {
						loaderRef.current.style.display = 'none';
					}
				},
			});
		}
	}, [progress]);

	return (
		<div
			ref={loaderRef}
			className={`z-[100] absolute top-0 left-0 w-dvw h-dvh inset-0 bg-red-800 text-white flex items-center justify-center text-2xl font-bold bg-primary`}>
			<Indicator
				progress={progress}
				item={item}
			/>
		</div>
	);
}

function Indicator({ progress, item }) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return null;

	return (
		<>
			<p>{progress.toFixed(1)}% loaded</p>
			<p>{item}</p>
		</>
	);
}

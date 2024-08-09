import { Html, useProgress } from '@react-three/drei';
import React, { useEffect } from 'react';

// type
import { LoaderProps } from '@/types';

export default function Loader({ handleSceneLoaded }: LoaderProps) {
	const { progress } = useProgress();

	useEffect(() => {
		if (progress === 100) {
			handleSceneLoaded();
		}
	}, [progress, handleSceneLoaded]);

	return (
		<Html
			center
			style={{
				zIndex: '100',
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100vw',
				height: '100vh',
				backgroundColor: 'red', // Dark background with transparency
				color: 'white', // Text color
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontSize: '1.5rem',
				fontWeight: 'bold',
				textAlign: 'center',
			}}>
			{progress.toFixed(1)}% loaded
		</Html>
	);
}

import { useEffect } from 'react';

// store
import { useWebGlStore } from '@/store';

/**
 * use useEffect's clean-up callback to detect whether progress is 100 and 3D components are fully loaded,
 * since even if progress is 100, the 3D components still take a little time to load.
 */
export default function SuspenseMonitor() {
	useEffect(
		() => () => {
			window.scrollTo(0, 0);
			useWebGlStore.setState({ isLoaded: true });
		},
		[],
	);
	return null;
}

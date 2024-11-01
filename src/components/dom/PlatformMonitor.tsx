import { useEffect } from 'react';

// store
import { useCursorStore, usePlatformStore } from '@/store';

export default function PlatformMonitor() {
	function updatePlatform() {
		const isMobile = window.innerWidth < 768;
		const userAgent = navigator.userAgent || navigator.vendor || window.opera;
		const mobileRegex = /android|iphone|ipad|ipod|blackberry|windows phone/i;
		const isCustomCursor = !mobileRegex.test(userAgent);
		useCursorStore.setState({ isCustomCursor });
		usePlatformStore.setState({ isMobile });
	}

	useEffect(() => {
		updatePlatform();
		window.addEventListener('resize', updatePlatform);
		return () => window.removeEventListener('resize', updatePlatform);
	}, []);

	return null;
}

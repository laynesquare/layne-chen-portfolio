import { usePlatformStore } from '@/store';

export default function ResponsiveText({ desktop, mobile }) {
	const isMobile = usePlatformStore(state => state.isMobile);
	return <>{isMobile ? desktop : mobile}</>;
}

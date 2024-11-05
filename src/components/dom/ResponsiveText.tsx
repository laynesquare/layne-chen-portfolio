import { usePlatformStore } from '@/store';

interface ResponsiveTextProps {
	desktop: string;
	mobile: string;
}

export default function ResponsiveText({ desktop, mobile }: ResponsiveTextProps) {
	const isMobile = usePlatformStore(state => state.isMobile);
	return <>{isMobile ? desktop : desktop}</>;
}

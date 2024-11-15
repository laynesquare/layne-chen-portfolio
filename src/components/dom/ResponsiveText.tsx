// store
import { usePlatformStore } from '@/store';

// type
import type { ResponsiveTextProps } from '@/types';

export default function ResponsiveText({ desktop, mobile }: ResponsiveTextProps) {
	const isMobile = usePlatformStore(state => state.isMobile);
	return <>{isMobile ? mobile : desktop}</>;
}

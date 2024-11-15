import { create } from 'zustand';

// type
import type { PlatformStore } from '@/types';

export const usePlatformStore = create<PlatformStore>(set => ({
	isMobile: false,
}));

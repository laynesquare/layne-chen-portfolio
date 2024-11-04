import { create } from 'zustand';

interface PlatformStore {
	isMobile: boolean;
}

export const usePlatformStore = create<PlatformStore>(set => ({
	isMobile: false,
}));

import { create } from 'zustand';

export const usePlatformStore = create(set => ({
	isMobile: false,
}));

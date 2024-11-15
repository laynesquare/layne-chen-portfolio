import { create } from 'zustand';

// type
import type { NavStore } from '@/types';

export const useNavStore = create<NavStore>(set => ({
	isOpen: false,
	lenisRef: null,
}));

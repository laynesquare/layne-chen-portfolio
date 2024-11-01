import { create } from 'zustand';

export const useNavStore = create(set => ({
	isOpen: false,
	lenisRef: null,
}));

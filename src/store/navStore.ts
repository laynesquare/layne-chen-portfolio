import { create } from 'zustand';

import type Lenis from '@studio-freight/lenis';
import { RefObject } from 'react';

type LenisRef = {
	wrapper?: HTMLElement;
	content?: HTMLElement;
	lenis?: Lenis;
};

interface NavStore {
	isOpen: boolean;
	lenisRef: RefObject<LenisRef> | null;
}

export const useNavStore = create<NavStore>(set => ({
	isOpen: false,
	lenisRef: null,
}));

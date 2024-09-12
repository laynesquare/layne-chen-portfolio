import { create } from 'zustand';

const useDomStore = create(set => ({
	element: null,
	register: el => set(state => ({ element: el })),
}));

export { useDomStore };

import { create } from 'zustand';

const useDomStore = create(set => ({
	textEls: new Set(),
	textElRegister: el => {
		set(state => state.textEls.add(el));
	},
}));

export { useDomStore };

import { create } from 'zustand';

const useDomStore = create(set => ({
	textEls: new Set(),
	torsoEl: null,
	textElRegister: el => {
		set(state => state.textEls.add(el));
	},
	torsoElRegister: el => {
		set(state => (state.torsoEl = el));
	},
}));

export { useDomStore };

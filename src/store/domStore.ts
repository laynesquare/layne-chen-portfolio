import { create } from 'zustand';

export const useDomStore = create(set => ({
	textEls: new Set(),
	torsoEl: null,
	containerEls: new Set(),
	anchorEls: new Set(),

	textElRegister: (el: HTMLElement) => {
		set(state => {
			if (state && el && !state.textEls.has(el)) {
				return { textEls: new Set(state.textEls).add(el) };
			}
			return;
		});
	},
	torsoElRegister: (el: HTMLElement) => {
		set(state => {
			if (state && el) {
				return { torsoEl: el };
			}
			return;
		});
	},
	containerElRegister: (el: HTMLElement) => {
		set(state => {
			if (state && el && !state.containerEls.has(el)) {
				return { containerEls: new Set(state.containerEls).add(el) };
			}
			return;
		});
	},
	anchorElRegister: (el: HTMLElement) => {
		set(state => {
			if (state && el && !state.anchorEls.has(el)) {
				return { anchorEls: new Set(state.anchorEls).add(el) };
			}
			return;
		});
	},
}));

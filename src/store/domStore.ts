import { create } from 'zustand';

interface DomStoreState {
	textEls: Set<HTMLElement>;
	torsoEl: HTMLElement | null;
	containerEls: Set<HTMLElement>;
	anchorEls: Set<HTMLElement>;
	setText: (el: HTMLElement) => void;
	setTorso: (el: HTMLElement) => void;
	setContainer: (el: HTMLElement) => void;
	setAnchor: (el: HTMLElement) => void;
}

export const useDomStore = create<DomStoreState>(set => ({
	textEls: new Set(),
	torsoEl: null,
	containerEls: new Set(),
	anchorEls: new Set(),

	setText: (el: HTMLElement) => {
		set(state => {
			if (state && el && !state.textEls.has(el)) {
				return { textEls: new Set(state.textEls).add(el) };
			}
			return state;
		});
	},
	setTorso: (el: HTMLElement) => {
		set(state => {
			if (state && el) {
				return { torsoEl: el };
			}
			return state;
		});
	},
	setContainer: (el: HTMLElement) => {
		set(state => {
			if (state && el && !state.containerEls.has(el)) {
				return { containerEls: new Set(state.containerEls).add(el) };
			}
			return state;
		});
	},
	setAnchor: (el: HTMLElement) => {
		set(state => {
			if (state && el && !state.anchorEls.has(el)) {
				return { anchorEls: new Set(state.anchorEls).add(el) };
			}
			return state;
		});
	},
}));

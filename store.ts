import { create } from 'zustand';
import { Vector2 } from 'three';

const useDomStore = create(set => ({
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

const useWebGlStore = create(set => ({
	isBallPress: false,
	isLoaded: false,
	isEntryAnimationDone: false,

	containerMaskedMeshes: null,
	containerTranslucentMaskedMeshes: null,
	shareTranslucentBuffer: null,
}));

const useNavStore = create(set => ({
	isOpen: false,
	lenisRef: null,
}));

const usePlatformStore = create(set => ({
	isMobile: false,
}));

const useCursorStore = create(set => ({
	isRippleZone: true,
	isCustomCursor: true,
	ndcPosition: new Vector2(0, 0),
	curr: { x: 0, y: 0, cursor: 'auto' },
}));

export { useDomStore, useWebGlStore, useNavStore, usePlatformStore, useCursorStore };

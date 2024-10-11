import { create } from 'zustand';

const useDomStore = create(set => ({
	textEls: new Set(),
	torsoEl: null,
	containerEls: new Set(),
	anchorEls: new Set(),

	textElRegister: el => {
		set(state => {
			if (state && el && !state.textEls.has(el)) {
				return { textEls: new Set(state.textEls).add(el) };
			}
			return;
		});
	},
	torsoElRegister: el => {
		set(state => {
			if (state && el) {
				return { torsoEl: el };
			}
			return;
		});
	},
	containerElRegister: el => {
		set(state => {
			if (state && el && !state.containerEls.has(el)) {
				return { containerEls: new Set(state.containerEls).add(el) };
			}
			return;
		});
	},
	anchorElRegister: el => {
		set(state => {
			if (state && el && !state.anchorEls.has(el)) {
				return { anchorEls: new Set(state.anchorEls).add(el) };
			}
			return;
		});
	},
}));

const useWebGlStore = create(set => ({
	isLoaded: false,
	passivePortBuffer: null,
	containerMaskedMeshes: null,

	loadedRegister: item => {
		set(state => ({ isLoaded: item }));
	},

	passivePortBufferRegister: item => {
		set(state => ({ passivePortBuffer: item }));
	},

	containerMaskedMeshesRegister: item => {
		set(state => ({ containerMaskedMeshes: item }));
	},
}));

export { useDomStore, useWebGlStore };

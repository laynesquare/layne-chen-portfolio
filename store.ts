// import { create } from 'zustand';

// const useDomStore = create(set => ({
// 	textEls: new Set(),
// 	torsoEl: null,
// 	textElRegister: el => {
// 		set(state => state.textEls.add(el));
// 	},
// 	torsoElRegister: el => {
// 		set(state => (state.torsoEl = el));
// 	},
// }));

// export { useDomStore };

import { create } from 'zustand';

const useDomStore = create(set => ({
	textEls: new Set(),
	torsoEl: null,
	containerEls: new Set(),
	anchorEls: new Set(),

	textElRegister: el => {
		set(state => {
			if (state && el) {
				state.textEls.add(el);
			}
			return state;
		});
	},
	torsoElRegister: el => {
		set(state => {
			if (state && el) {
				state.torsoEl = el;
			}
			return state;
		});
	},
	containerElRegister: el => {
		set(state => {
			if (state && el) {
				state.containerEls.add(el);
			}
			return state;
		});
	},
	anchorElRegister: el => {
		set(state => {
			if (state && el) {
				state.anchorEls.add(el);
			}
			return state;
		});
	},
}));

const usePortFboStore = create(set => ({
	portFbo: null,

	portFboRegister: item => {
		set(state => {
			if (state && item) {
				state.portFbo = item;
			}
			return state;
		});
	},
}));

export { useDomStore, usePortFboStore };

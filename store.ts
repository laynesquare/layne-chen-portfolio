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
	textElRegister: el => {
		set(state => {
			if (state) {
				state.textEls.add(el);
			}
			return state;
		});
	},
	torsoElRegister: el => {
		set(state => {
			if (state) {
				state.torsoEl = el;
			}
			return state;
		});
	},
	containerElRegister: el => {
		set(state => {
			if (state) {
				state.containerEls.add(el);
			}
			return state;
		});
	},
}));

export { useDomStore };

import { create } from 'zustand';

export const useWebGlStore = create(set => ({
	isBallPress: false,
	isLoaded: false,
	isEntryAnimationDone: false,
	isStartFrame: false,

	containerMaskedMeshes: null,
	containerTranslucentMaskedMeshes: null,
	shareTranslucentBuffer: null,
}));

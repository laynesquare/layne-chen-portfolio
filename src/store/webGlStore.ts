import { create } from 'zustand';

// type
import type { WebGlStore } from '@/types';

export const useWebGlStore = create<WebGlStore>(set => ({
	isBallPress: false,
	isLoaded: false,
	isBallReady: false,
	isEntryAnimationDone: false,

	containerMaskedMeshes: new Set(),
	containerTranslucentMaskedMeshes: new Set(),

	translucentBuffer: null,
	rippleBuffer: null,
	aboutBuffer: null,
	skillBuffer: null,
	experienceBuffer: null,
}));

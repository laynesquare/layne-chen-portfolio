import { create } from 'zustand';

// three
import type { WebGLRenderTarget, Mesh, ShaderMaterial, BufferGeometry } from 'three';

interface WebGlStore {
	isBallPress: boolean;
	isLoaded: boolean;
	isEntryAnimationDone: boolean;
	isStartFrame: boolean;

	containerMaskedMeshes: Set<Mesh<BufferGeometry, ShaderMaterial>>;
	containerTranslucentMaskedMeshes: Set<Mesh<BufferGeometry, ShaderMaterial>>;

	translucentBuffer: WebGLRenderTarget | null;
	rippleBuffer: WebGLRenderTarget | null;
	aboutBuffer: WebGLRenderTarget | null;
	skillBuffer: WebGLRenderTarget | null;
	experienceBuffer: WebGLRenderTarget | null;
}

export const useWebGlStore = create<WebGlStore>(set => ({
	isBallPress: false,
	isLoaded: false,
	isEntryAnimationDone: false,
	isStartFrame: false,

	containerMaskedMeshes: new Set(),
	containerTranslucentMaskedMeshes: new Set(),

	translucentBuffer: null,
	rippleBuffer: null,
	aboutBuffer: null,
	skillBuffer: null,
	experienceBuffer: null,
}));

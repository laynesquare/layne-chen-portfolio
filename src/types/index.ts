import type Lenis from '@studio-freight/lenis';
import type {
	Group,
	Mesh,
	Object3D,
	BufferGeometry,
	MeshPhysicalMaterial,
	ShaderMaterial,
	MeshBasicMaterial,
	Vector2,
	WebGLRenderTarget,
} from 'three';
import type CustomShaderMaterial from 'three-custom-shader-material/vanilla';

/* -------------------------------------------------------------------------- */
/*                                     com                                    */
/* -------------------------------------------------------------------------- */

export interface SceneProps {
	wrapperRef: React.RefObject<HTMLElement>;
}

export interface BillboardProps {
	children: React.ReactNode;
}

export interface NavLinkBtnProps {
	label: string;
	href: string;
}

export interface OverlayNavLinkChapterProps {
	chapter: string;
	label: string;
	width: string;
	justify: string;
	isDecor: boolean;
}

export interface ResponsiveTextProps {
	desktop: string;
	mobile: string;
}

export interface SmoothScrollingProps {
	children: React.ReactNode;
}

export interface DiscloseProps {
	canvasRef: React.RefObject<HTMLCanvasElement>;
}

export interface LenisRef {
	wrapper?: HTMLElement;
	content?: HTMLElement;
	lenis?: Lenis;
}

/* -------------------------------------------------------------------------- */
/*                                    store                                   */
/* -------------------------------------------------------------------------- */

export interface cursorStore {
	isRippleZone: boolean;
	isCustomCursor: boolean;
	ndcPosition: Vector2;
	curr: { x: number; y: number; cursor: string };
}

export interface PlatformStore {
	isMobile: boolean;
}

export interface DomStoreState {
	textEls: Set<HTMLElement>;
	torsoEl: HTMLElement | null;
	containerEls: Set<HTMLElement>;
	anchorEls: Set<HTMLElement>;
	setText: (el: HTMLElement | null) => void;
	setTorso: (el: HTMLElement | null) => void;
	setContainer: (el: HTMLElement | null) => void;
	setAnchor: (el: HTMLElement | null) => void;
}

export interface NavStore {
	isOpen: boolean;
	lenisRef: React.RefObject<LenisRef> | null;
}

export interface WebGlStore {
	isBallPress: boolean;

	/**
	 * Is suspense fallback component unmounted.
	 */
	isLoaded: boolean;

	/**
	 * Is web worker done and ball's geometry ready.
	 */
	isBallReady: boolean;

	/**
	 * Is ready for user interaction.
	 */
	isEntryAnimationDone: boolean;

	containerMaskedMeshes: Set<Mesh<BufferGeometry, ShaderMaterial>>;
	containerTranslucentMaskedMeshes: Set<Mesh<BufferGeometry, ShaderMaterial>>;

	translucentBuffer: WebGLRenderTarget | null;
	rippleBuffer: WebGLRenderTarget | null;
	aboutBuffer: WebGLRenderTarget | null;
	skillBuffer: WebGLRenderTarget | null;
	experienceBuffer: WebGLRenderTarget | null;
}

/* -------------------------------------------------------------------------- */
/*                                   meshes                                   */
/* -------------------------------------------------------------------------- */

export type BallMesh = Mesh<BufferGeometry, CustomShaderMaterial & MeshPhysicalMaterial>;

export type TorsoMesh = Mesh<BufferGeometry, ShaderMaterial>;

export type BallMaskMesh = Mesh<BufferGeometry, MeshBasicMaterial>;

export type CurrGsapMorph = Record<string, number>;

export type RippleMesh = Mesh<BufferGeometry, MeshBasicMaterial>;

export interface MutatedMeshesType {
	containerGroup: Group;
	textGroup: Group;
	torso: TorsoMesh;
	ball: BallMesh;
	clonedBall: BallMesh;
}

export interface MutatedObject3DMeshes {
	containerGroup: Object3D | null | undefined;
	textGroup: Object3D | null | undefined;
	torso: Object3D | null | undefined;
	ball: Object3D | null | undefined;
	clonedBall: Object3D | null | undefined;
}

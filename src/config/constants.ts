import { FrontSide, NearestFilter, NoBlending, RGBAFormat, UnsignedByteType } from 'three/src/constants.js';

export const TEXT_BOXING = 'BOXING';
export const TEXT_SATOSHI = 'SATOSHI';
export const TRANSLUCENT = 'TRANSLUCENT';
export const ORIGINAL = 'ORIGINAL';

export const MESH_DISTANCE = {
	TEXT: 3,
	TORSO: 0,
	CONTAINER: 2.9,
	BALL: 0,
};

export const MESH_NAME = {
	TEXT_GROUP: 'TEXT_GROUP',
	CONTAINER_GROUP: 'CONTAINER_GROUP',
	TORSO: 'TORSO',
	BALL: 'BALL',
	CLONED_BALL: 'CLONE_BALL',

	BALL_MASK: 'BALL_MASK',
	BALL_MASK_CLONED: 'BALL_MASK_CLONED',
};

export const CHAP = {
	ABOUT: 'ABOUT',
	SKILL: 'SKILL',
	EXPERIENCE: 'EXPERIENCE',
	PROJECT: 'PROJECT',
};

export const FBO_CONFIG = {
	samples: 0,
	minFilter: NearestFilter,
	magFilter: NearestFilter,
	format: RGBAFormat,
	type: UnsignedByteType,
	anisotropy: 0,
	colorSpace: '',
	generateMipmaps: false,
	stencilBuffer: false,
};

/** place here for cross-component updates in case of chaotic mutation  */
export const BALL_INIT_MATERIAL = {
	iridescence: 0.1,
	ior: 0,
	metalness: 0.5,
	roughness: 0.1,
	clearcoat: 1.0,
	reflectivity: 0.46,
	iridescenceIOR: 1.3,
	displacementScale: 0,
	sheen: 0,
	emissiveIntensity: 0,
	silent: true,
	transparent: true,
	side: FrontSide,
	blending: NoBlending,
};

export const BALL_INIT_UNIFORMS = {
	uTime: { value: 0 },
	uSpeed: { value: 4 },
	uNoiseStrength: { value: 2.5 },
	uDisplacementStrength: { value: 1 },
	uFractAmount: { value: 0.8 },
	uIsNormalColor: { value: 0 },
};

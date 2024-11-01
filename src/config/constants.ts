import { NearestFilter, RGBAFormat, UnsignedByteType } from 'three/src/constants.js';

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

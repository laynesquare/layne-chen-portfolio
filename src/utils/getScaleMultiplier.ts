import { Size, Camera } from '@react-three/fiber';
import { PerspectiveCamera } from 'three';

/**
 * @export
 * @param {number} zPosition
 * @param {Camera} camera
 * @param {Size} size
 * @return {*}
 */
export default function getScaleMultiplier(zPosition: number, viewport, camera: Camera, size: Size): number {
	if (!(camera instanceof PerspectiveCamera)) {
		throw new Error(`Unsupported camera type: ${camera.type}`);
	}

	const fovInRadians = (camera.fov * Math.PI) / 180;
	const visibleHeight = 2 * Math.tan(fovInRadians / 2) * zPosition;
	const visibleWidth = visibleHeight * (size.width / size.height);
	const scaleFactor = size.width / visibleWidth;

	return 1 - viewport.factor / scaleFactor;
}

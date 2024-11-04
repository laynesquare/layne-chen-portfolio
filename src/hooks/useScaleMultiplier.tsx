import { PerspectiveCamera } from 'three';
import { Size, Camera, Viewport } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';

export default function useScaleMultiplier(zPosition: number): number {
	const [viewport, size, camera]: [Viewport, Size, Camera] = useThree(state => [
		state.viewport,
		state.size,
		state.camera,
	]);

	console.log('custom');

	if (!(camera instanceof PerspectiveCamera)) {
		throw new Error(`Unsupported camera type: ${camera.type}`);
	}

	const fovInRadians = (camera.fov * Math.PI) / 180;
	const visibleHeight = 2 * Math.tan(fovInRadians / 2) * zPosition;
	const visibleWidth = visibleHeight * (size.width / size.height);
	const scaleFactor = size.width / visibleWidth;

	return 1 - viewport.factor / scaleFactor;
}

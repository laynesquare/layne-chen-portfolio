import { IcosahedronGeometry } from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

self.onmessage = event => {
	const { radius, detail } = event.data;
	const geometry = mergeVertices(new IcosahedronGeometry(radius, detail));

	geometry.computeTangents();

	// Geometry's prototype and method will be lost during serialization.
	self.postMessage(geometry);
};

import { Raycaster, Vector3, Triangle } from 'three';

function createCustomRaycaster(mesh, uniforms) {
	const raycaster = new Raycaster();
	const origRaycast = raycaster.intersectObject.bind(raycaster);

	raycaster.intersectObject = (object, recursive, optionalTarget) => {
		const intersections = origRaycast(object, recursive, optionalTarget);

		intersections.forEach(intersection => {
			if (intersection.object === mesh) {
				const geometry = mesh.geometry;
				const position = geometry.attributes.position;
				const normal = geometry.attributes.normal;

				const a = new Vector3(),
					b = new Vector3(),
					c = new Vector3();
				const triangle = new Triangle();

				// Get the face
				const face = Math.floor(intersection.faceIndex / 3);
				const i1 = geometry.index.getX(face * 3);
				const i2 = geometry.index.getX(face * 3 + 1);
				const i3 = geometry.index.getX(face * 3 + 2);

				// Get the displaced positions
				getDisplacedPosition(i1, a, position, normal, uniforms);
				getDisplacedPosition(i2, b, position, normal, uniforms);
				getDisplacedPosition(i3, c, position, normal, uniforms);

				// Update the triangle
				triangle.set(a, b, c);

				// Recalculate the intersection point
				triangle.getUV(intersection.point, a, b, c, intersection.uv);
				triangle.getNormal(intersection.face.normal);

				intersection.point.copy(
					a
						.multiplyScalar(1 - intersection.uv.x - intersection.uv.y)
						.add(b.multiplyScalar(intersection.uv.x))
						.add(c.multiplyScalar(intersection.uv.y)),
				);
			}
		});

		return intersections;
	};

	return raycaster;
}

function getDisplacedPosition(index, target, position, normal, uniforms) {
	target.fromBufferAttribute(position, index);
	const normalVec = new Vector3().fromBufferAttribute(normal, index);

	// Apply displacement based on your shader logic
	const displacement = calculateDisplacement(target, uniforms);
	target.add(normalVec.multiplyScalar(displacement));
}

function calculateDisplacement(position, uniforms) {
	// Implement your displacement calculation here
	// This should mirror the logic in your vertex shader
	// Example (adjust according to your actual shader):
	const time = uniforms.uTime.value;
	const noise = simplex3D(position.x * 0.1, position.y * 0.1, position.z * 0.1 + time * 0.1);
	return noise * uniforms.uDisplacementStrength.value;
}

// Implement or import a simplex noise function
function simplex3D(x, y, z) {
	// Implement 3D simplex noise here
	// You can use a library like 'simplex-noise' or implement it yourself
}

export { createCustomRaycaster };

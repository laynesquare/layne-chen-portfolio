import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect, useMemo } from 'react';
import { Vector3, BufferGeometry, LineBasicMaterial, Line, Raycaster, Mesh } from 'three';
import { MeshBVH, acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';

export default function Laser() {
	const { scene } = useThree();
	const lasersRef = useRef([]);
	const raycaster = useRef(new Raycaster());

	// Enable the accelerated raycasting for Mesh
	useEffect(() => {
		Mesh.prototype.raycast = acceleratedRaycast;
	}, []);

	useEffect(() => {
		const origin = new Vector3(0, 0, 0);

		const laserPoints = [
			new Vector3(3, 3, 3),
			// new Vector3(-5, -5, 5),
			// new Vector3(5, -5, -5),
			// new Vector3(-5, 5, -5),
		];

		laserPoints.forEach((start, index) => {
			const geometry = new BufferGeometry().setFromPoints([start, origin]);
			const material = new LineBasicMaterial({ color: 0xff0000 });
			const line = new Line(geometry, material);
			line.layers.set(1);
			lasersRef.current.push({ line, start });
			scene.add(line);
		});

		return () => {
			lasersRef.current.forEach(({ line }) => scene.remove(line));
		};
	}, [scene]);

	// useEffect(() => {
	// 	// Build the BVH for the main character's mesh
	// 	const mainCharacter = scene.getObjectByName('main-character');
	// 	if (mainCharacter && mainCharacter.geometry) {
	// 		mainCharacter.geometry.computeBoundsTree = computeBoundsTree;
	// 		mainCharacter.geometry.disposeBoundsTree = disposeBoundsTree;
	// 		mainCharacter.geometry.boundsTree = new MeshBVH(mainCharacter.geometry);
	// 	}
	// }, [scene]);

	useFrame(() => {
		lasersRef.current.forEach(({ start }) => {
			// Set the raycaster direction towards the origin
			const direction = new Vector3().subVectors(new Vector3(0, 0, 0), start).normalize();
			raycaster.current.set(start, direction);
			raycaster.current.layers.set(0);

			const mainCharacter = scene.getObjectByName('main-character');
			if (mainCharacter) {
				const intersects = raycaster.current.intersectObject(mainCharacter, false);

				intersects.forEach(intersect => {
					console.log('Laser hit:', intersect);
				});
			}
		});
	});

	return (
		<>
			{/* <mesh>
                <torusKnotGeometry args={[3, 1, 256, 32]} />
                <MeshTransmissionMaterial
                    backside
                    backsideThickness={1}
                    thickness={1}
                />
            </mesh> */}
		</>
	);
}

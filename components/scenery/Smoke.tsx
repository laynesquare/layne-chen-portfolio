import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function Smoke() {
	const particlesRef = useRef();
	const velocitiesRef = useRef();

	// Load texture for particles
	const texture = useMemo(() => {
		const canvas = document.createElement('canvas');
		canvas.width = 64;
		canvas.height = 64;
		const context = canvas.getContext('2d');
		context.beginPath();
		context.arc(32, 32, 32, 0, Math.PI * 2, false);
		context.closePath();
		context.fillStyle = 'white';
		context.fill();

		return new THREE.CanvasTexture(canvas);
	}, []);

	// Create particle system
	const { geometry, velocities } = useMemo(() => {
		const count = 1000;
		const geometry = new THREE.BufferGeometry();
		const positions = new Float32Array(count * 3);
		const velocities = new Float32Array(count * 3);

		for (let i = 0; i < count; i++) {
			const theta = Math.random() * 2 * Math.PI;
			const phi = Math.acos(2 * Math.random() - 1);
			const radius = Math.random() * 10;

			const x = radius * Math.sin(phi) * Math.cos(theta);
			const y = radius * Math.sin(phi) * Math.sin(theta);
			const z = radius * Math.cos(phi);

			positions[i * 3] = x;
			positions[i * 3 + 1] = y;
			positions[i * 3 + 2] = z;

			velocities[i * 3] = (Math.random() - 0.5) * 0.01;
			velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
			velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
		}

		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

		return { geometry, velocities };
	}, []);

	useFrame(() => {
		if (particlesRef.current) {
			const positions = particlesRef.current.geometry.attributes.position.array;
			const velocities = particlesRef.current.geometry.attributes.velocity.array;
			const count = positions.length / 3;

			for (let i = 0; i < count; i++) {
				positions[i * 3] += velocities[i * 3];
				positions[i * 3 + 1] += velocities[i * 3 + 1];
				positions[i * 3 + 2] += velocities[i * 3 + 2];

				if (positions[i * 3] > 10 || positions[i * 3] < -10) velocities[i * 3] *= -1;
				if (positions[i * 3 + 1] > 10 || positions[i * 3 + 1] < -10) velocities[i * 3 + 1] *= -1;
				if (positions[i * 3 + 2] > 10 || positions[i * 3 + 2] < -10) velocities[i * 3 + 2] *= -1;
			}

			particlesRef.current.geometry.attributes.position.needsUpdate = true;
		}
	});

	const shaderMaterial = useMemo(
		() =>
			new THREE.ShaderMaterial({
				uniforms: {
					texture: { value: texture },
					glowColor: { value: new THREE.Color('white') },
					glowIntensity: { value: 1 },
					haloSize: { value: 5 },
				},
				vertexShader: `
			attribute vec3 velocity;
			varying vec3 vPosition;
			void main() {
				vPosition = position;
				vec3 pos = position + velocity;
				gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
				gl_PointSize = 2.0;
			}
		`,
				fragmentShader: `
			uniform sampler2D texture;
			uniform vec3 glowColor;
			uniform float glowIntensity;
			uniform float haloSize;
			varying vec3 vPosition;
			void main() {
				float distance = length(vPosition);
				float alpha = smoothstep(0.1, 1.0, 1.0 - distance / 10.0);
				vec3 color = glowColor * alpha * glowIntensity;

				// Halo effect
				float halo = smoothstep(0.1, haloSize, 1.0 - distance / 10.0);
				color += glowColor * halo * glowIntensity;

				gl_FragColor = vec4(color, alpha);
			}
		`,
				transparent: true,
				depthTest: false,
				depthWrite: false,
			}),
		[texture],
	);

	return (
		<points ref={particlesRef}>
			<bufferGeometry
				attach='geometry'
				{...geometry}
			/>
			<shaderMaterial
				attach='material'
				args={[shaderMaterial]}
			/>
		</points>
	);
}

export default Smoke;

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MeshTransmissionMaterial, shaderMaterial, useFBO, useScroll } from '@react-three/drei';
import { createPortal, useFrame, useThree, extend, useLoader, ThreeElements } from '@react-three/fiber';
import {
	GLSL3,
	Scene,
	ShaderMaterial,
	TextureLoader,
	Vector2,
	ACESFilmicToneMapping,
	Color,
	MeshBasicMaterial,
	Vector3,
	LinearFilter,
	RGBAFormat,
	UnsignedShort4444Type,
} from 'three';
import { easing } from 'maath';

import vertexShader from '@/shaders/animated-scroll-warp/vertex';
import fragmentShader from '@/shaders/animated-scroll-warp/fragment';

import { ReactLenis, useLenis } from '@studio-freight/react-lenis';

import { lerp } from 'three/src/math/MathUtils.js';

import { useDomStore, usePortFboStore } from '@/store';

// Create the shader material
const RippleMaterial = shaderMaterial(
	{
		uResolution: new Vector2(window.innerWidth, window.innerHeight),
		uTime: 0,
		uCursor: new Vector2(0.5, 0.5),
		uScrollVelocity: 0,
		uTexture: null,
		uTextureSize: new Vector2(100, 100),
		uQuadSize: new Vector2(100, 100),
		uBorderRadius: 0,
		uMouseEnter: 0,
		uMouseOverPos: new Vector2(0.5, 0.5),
	},
	vertexShader,
	fragmentShader,
);

extend({ RippleMaterial });

export default function Ripple({ children, damping = 0.15, ...props }) {
	const ref = useRef();
	const { viewport, size, camera, pointer } = useThree();
	// const { portFboRegister } = usePortFboStore(state => state);

	const devicePixelRatio = window.devicePixelRatio || 1;
	const memory = navigator.deviceMemory || 4;
	const resolutionScale = devicePixelRatio > 1.5 || memory <= 4 ? 0.5 : 0.75;

	const portBuffer = useFBO(size.width, size.height, {
		minFilter: LinearFilter,
		magFilter: LinearFilter,
		format: RGBAFormat,
	});

	useEffect(() => {
		// portBuffer.setSize(size.width * 1.2, size.height * 1.2);
		// portFboRegister(portBuffer);
	}, []);

	const rippleBuffer = useFBO(32, 32, {
		minFilter: LinearFilter,
		magFilter: LinearFilter,
		format: RGBAFormat,
		type: UnsignedShort4444Type,
	});

	const [portScene] = useState(() => new Scene());
	const [rippleScene] = useState(() => new Scene());

	const velocityRef = useRef(0);
	const preMousePos = useRef({ x: 0, y: 0 });
	const rippleVec3 = useRef(new Vector3());
	const rippleTexture = useLoader(TextureLoader, '/scenery/textures/ripple.png');
	const rippleRefs = useRef([]);
	const rippleCurrIdx = useRef(-1);

	const portMaterialRef = useRef(
		new ShaderMaterial({
			uniforms: {
				uResolution: { value: new Vector2(size.width, size.height) },
				uTime: { value: 0 },
				uCursor: { value: new Vector2(0.5, 0.5) },
				uScrollVelocity: { value: 0 },
				uTexture: { value: null },
				uTextureSize: { value: new Vector2(100, 100) },
				uQuadSize: { value: new Vector2(100, 100) },
				uDisplacement: { value: null },
			},
			vertexShader,
			fragmentShader,
			glslVersion: GLSL3,
			depthTest: false,
			depthWrite: false,
		}),
	);

	useLenis(event => {
		velocityRef.current = event.velocity;
	});

	const ripples = useMemo(() => {
		const max = 25;
		const meshes = [];

		for (let i = 0; i < max; i++) {
			meshes.push(
				<mesh
					key={i}
					ref={el => (rippleRefs.current[i] = el)}
					material={
						new MeshBasicMaterial({
							map: rippleTexture,
							transparent: true,
							visible: false,
							depthTest: false,
							depthWrite: false,
						})
					}
					position={[0, 0, 1]}
					rotation={[0, 0, 2 * Math.PI * Math.random()]}>
					<planeGeometry args={[0.5, 0.5, 1, 1]} />
				</mesh>,
			);
		}

		return meshes;
	}, [rippleTexture]);

	const handleMouseMove = useCallback(
		(event: MouseEvent) => {
			const vector = rippleVec3.current;
			vector.set(pointer.x, pointer.y, 0.5);
			vector.unproject(camera);
			vector.sub(camera.position).normalize();
			const distance = (1 - camera.position.z) / vector.z;

			const offsetX = Math.abs(preMousePos.current.x - event.clientX);
			const offsetY = Math.abs(preMousePos.current.y - event.clientY);

			if (offsetX < 0.5 && offsetY < 0.5) {
			} else {
				rippleCurrIdx.current = (rippleCurrIdx.current + 1) % 25;
				rippleRefs.current[rippleCurrIdx.current].material.visible = true;
				rippleRefs.current[rippleCurrIdx.current].material.opacity = 1;
				rippleRefs.current[rippleCurrIdx.current].scale.x = rippleRefs.current[
					rippleCurrIdx.current
				].scale.y = 1;
				rippleRefs.current[rippleCurrIdx.current].position
					.copy(camera.position)
					.add(vector.multiplyScalar(distance));
			}
			preMousePos.current = { x: event.clientX, y: event.clientY };
		},
		[camera, pointer.x, pointer.y],
	);

	useEffect(() => {
		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, [handleMouseMove]);

	useFrame(({ clock, gl, camera, scene }, delta) => {
		const elapsedTime = clock.getElapsedTime();

		if (portMaterialRef.current) {
			portMaterialRef.current.uniforms.uTime.value = elapsedTime;
			portMaterialRef.current.uniforms.uTexture.value = portBuffer.texture;
			portMaterialRef.current.uniforms.uDisplacement.value = rippleBuffer.texture;

			const currentVelocity = portMaterialRef.current.uniforms.uScrollVelocity.value;
			const targetVelocity = velocityRef.current;
			const smoothingFactor = 0.025; // Adjust this value for more or less smoothing
			const smoothedVelocity = lerp(currentVelocity, targetVelocity, smoothingFactor);
			portMaterialRef.current.uniforms.uScrollVelocity.value = smoothedVelocity;
		}

		rippleRefs.current.forEach(mesh => {
			mesh.rotation.z += 0.025;
			mesh.material.opacity *= 0.95;
			mesh.scale.x = 0.98 * mesh.scale.x + 0.155;
			mesh.scale.y = mesh.scale.x;
		});

		gl.setRenderTarget(portBuffer);
		gl.render(portScene, camera);
		gl.setRenderTarget(rippleBuffer);
		gl.render(rippleScene, camera);
		gl.setRenderTarget(null);
	});

	return (
		<>
			{createPortal(children, portScene)}
			{createPortal(ripples, rippleScene)}
			<mesh
				name='billboard'
				castShadow={false}
				receiveShadow={false}
				ref={ref}
				onPointerOver={() => null}
				scale={[viewport.width, viewport.height, 1]}
				material={portMaterialRef.current}
				position={[0, 0, 0]}>
				<planeGeometry args={[1, 1, 64, 64]} />
			</mesh>
		</>
	);
}

const useCustomViewport = () => {
	const { viewport, camera, pointer, size } = useThree();
	const [custom, setCustom] = useState({ viewport, camera, pointer, size });

	useEffect(() => {
		const isMobile = () => {
			const userAgent = navigator.userAgent || navigator.vendor || window.opera;

			// Mobile user agent detection
			if (/android/i.test(userAgent)) {
				return true;
			}

			if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
				return true;
			}

			// Tablets (Android, iOS)
			if (/Tablet|PlayBook|Silk|Kindle|iPad/.test(userAgent)) {
				return true;
			}

			// Windows phone
			if (/Windows Phone|IEMobile|WPDesktop/.test(userAgent)) {
				return true;
			}

			return false;
		};

		const handleSize = () => {
			console.log('calling');
			if (false) {
				alert('resize from banner');
				setCustom({ viewport, camera, pointer, size });
			}
		};

		window.addEventListener('resize', handleSize);
		return () => window.removeEventListener('resize', handleSize);
	}, [viewport, camera, pointer, size]);

	return { ...custom };
};

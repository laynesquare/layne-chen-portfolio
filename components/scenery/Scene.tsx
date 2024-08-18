'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import {
	useProgress,
	Html,
	ScrollControls,
	useScroll,
	OrbitControls,
	Text,
	Preload,
	MeshTransmissionMaterial,
	Text3D,
} from '@react-three/drei';
import {
	EffectComposer,
	Bloom,
	ChromaticAberration,
	Noise,
	ToneMapping,
	Scanline,
	GodRays,
	LensFlare,
	N8AO,
} from '@react-three/postprocessing';
import { KernelSize, Resolution, BlendFunction } from 'postprocessing';
import { Vector2, BackSide, Vector3 } from 'three';

// Import custom components
import { Floor, Cage, Particles, Model, Loader, Camera, Laser, Ray } from '@/components';

// Import types
import { SceneProps } from '@/types';

import { BallCollider, Physics, RigidBody } from '@react-three/rapier';

import { suspend } from 'suspend-react';

export default function Scene({}: SceneProps) {
	return (
		<>
			<Canvas
				gl={{
					antialias: false,
					alpha: false,
					stencil: false,
					depth: false,
					powerPreference: 'high-performance',
				}}
				// eventSource={document.getElementById('root')}
				// eventPrefix='client'
				camera={{ fov: 100 }}
				className='relative h-svh z-0'>
				<color
					attach='background'
					args={['#141414']}
				/>
				<OrbitControls />
				{/* <ambientLight intensity={10} /> */}
				<directionalLight
					position={[15, 15, 15]}
					intensity={5}
					castShadow
				/>

				<Suspense>
					<ScrollControls
						damping={0.5}
						pages={10}>
						<Physics gravity={[0, 0, 0]}>
							{/* <Pointer /> */}
							<Model />
							{/* <Laser /> */}
						</Physics>

						<Ray />

						<Camera />
						<gridHelper
							args={[100, 100, '#232323', '#232323']}
							position={[0, 0, -5]} // Position it slightly behind the camera
							rotation={[Math.PI / 2, 0, 0]} // Rotate it 90 degrees to stand vertically
						/>

						<EffectComposer>
							<Bloom
								intensity={0.1} //
								kernelSize={KernelSize.VERY_LARGE}
								luminanceThreshold={0.5}
								luminanceSmoothing={0.01}
								mipmapBlur={false}
								resolutionX={Resolution.AUTO_SIZE}
								resolutionY={Resolution.AUTO_SIZE}
							/>
							<ChromaticAberration
								blendFunction={BlendFunction.NORMAL} // blend mode
								offset={[0.001, 0.001]} // color offset
							/>
						</EffectComposer>
						<Preload />
					</ScrollControls>
				</Suspense>
			</Canvas>
		</>
	);
}

/* -------------------------------------------------------------------------- */
/*                                 Layne Chen                                 */
/* -------------------------------------------------------------------------- */

// function Status({ text }) {
// 	return <Text3D>HELLO R3F</Text3D>;
// }
function Brand({ text, font = '/font/Inter_Medium_Regular.json' }) {
	const textOptions = {
		font,
		size: 5,
		height: 1,
	};
	return (
		<>
			<Text3D
				position={[0, 0, 5]}
				castShadow
				bevelEnabled
				font={font}
				scale={1}
				letterSpacing={-0.03}
				height={0.25}
				bevelSize={0.01}
				bevelSegments={10}
				curveSegments={128}
				bevelThickness={0.01}>
				{text}
				<MeshTransmissionMaterial
					backside
					backsideThickness={2}
					transmission={1}
					clearcoat={1}
					clearcoatRoughness={1}
					thickness={0.3}
					chromaticAberration={0.45}
					roughness={0}
				/>
			</Text3D>
		</>
	);
}

/* -------------------------------------------------------------------------- */
/*                                     游標                                    */
/* -------------------------------------------------------------------------- */

function Pointer({ vec = new Vector3() }) {
	const ref = useRef();
	useFrame(({ mouse, viewport }) =>
		ref.current?.setNextKinematicTranslation(
			vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0),
		),
	);
	return (
		<RigidBody
			position={[0, 0, 0]}
			type='kinematicPosition'
			colliders={false}
			ref={ref}>
			<BallCollider args={[1]} />
		</RigidBody>
	);
}

/* -------------------------------------------------------------------------- */
/*                                 later used                                 */
/* -------------------------------------------------------------------------- */

const PsychedelicBackground = () => {
	const shaderRef = useRef();

	const vertexShader = `
	  varying vec2 vUv;
	  void main() {
		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	  }
	`;

	const fragmentShader = `
	  varying vec2 vUv;
	  uniform float time;
	  uniform vec2 iResolution;
  
	  vec3 palette(float t) {
		  vec3 a = vec3(0.6, 0.5, 0.5);
		  vec3 b = vec3(0.5, 0.5, 0.7);
		  vec3 c = vec3(1.0, 1.0, 1.0);
		  vec3 d = vec3(0.6, 0.7, 0.8);
		  return a + b * cos(6.28318 * (c * t + d));
	  }
  
	  float hash(float n) {
		  return fract(sin(n) * 43758.5453);
	  }
  
	  float noise(vec2 x) {
		  vec2 p = floor(x);
		  vec2 f = fract(x);
		  f = f * f * (3.0 - 2.0 * f);
		  float n = p.x + p.y * 57.0;
		  return mix(mix(hash(n), hash(n + 1.0), f.x),
					 mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y);
	  }
  
	void main() {
		vec2 uv = (vUv - 0.5) * iResolution.xy / iResolution.y;

		float t = time * 0.5;
		float n = noise(uv * 4.0 + t);

		uv.x += sin(uv.y * 10.0 + t) * 0.2;
		uv.y += sin(uv.x * 10.0 + t) * 0.2;

		float pattern = 0.5 + 0.5 * sin(15.0 * length(uv + vec2(sin(t), cos(t))) + t * 5.0 + n * 20.0);

		vec3 col = palette(pattern + n);

		// Darken the color by multiplying by a factor (e.g., 0.5)
		// col *= 1;

		gl_FragColor = vec4(col, 1.0);
	}
	`;

	useFrame(({ clock }) => {
		if (shaderRef.current) {
			shaderRef.current.uniforms.time.value = clock.getElapsedTime() * 0.1;
			shaderRef.current.uniforms.iResolution.value = new Vector2(window.innerWidth, window.innerHeight);
		}
	});

	return (
		<mesh frustumCulled={true}>
			<sphereGeometry args={[50, 50, 50]} />
			<shaderMaterial
				ref={shaderRef}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				side={BackSide}
				uniforms={{
					time: { value: 1.0 },
					iResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
				}}
			/>
		</mesh>
	);
};

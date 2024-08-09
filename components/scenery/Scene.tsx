'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useProgress, Html, ScrollControls, useScroll, OrbitControls, Environment, Sky } from '@react-three/drei';
import {
	EffectComposer,
	Bloom,
	ChromaticAberration,
	Noise,
	ToneMapping,
	Scanline,
	GodRays,
	LensFlare,
} from '@react-three/postprocessing';
import { KernelSize, Resolution, BlendFunction } from 'postprocessing';
import { Vector2, BackSide } from 'three';

// com
import { Floor, Cage, Particles, Model, Loader } from '@/components';

// type
import { SceneProps } from '@/types';

function AdjustCamera() {
	const { camera } = useThree();
	const scroll = useScroll();

	useFrame(() => {
		const scrollOffset = scroll.offset;
	});

	useEffect(() => {
		camera.position.set(-0.9225665193808417, 3.534796092969559, 3.3980916163639696);
		camera.rotation.set(0.36711881061574475, -0.09825279434400959, 0.03770469119335154, 'XYZ');
	}, [camera]);

	return null;
}

export default function Scene({ loader }: SceneProps) {
	return (
		<>
			<Canvas
				shadows
				gl={{ antialias: true }}
				camera={{ fov: 75 }}
				className='relative h-svh z-0'>
				{/* <OrbitControls /> */}
				<ambientLight intensity={10} />

				<directionalLight
					position={[15, 15, 15]}
					intensity={50}
					castShadow
					// shadow-mapSize-width={1024}
					// shadow-mapSize-height={1024}
				/>

				<Suspense fallback={loader}>
					<ScrollControls
						damping={0.5}
						pages={10}>
						<Cage />
						<Model />
						<Floor />
						{/* <Smoke /> */}
						<Particles />
						<AdjustCamera />
						{/* <PsychedelicBackground /> */}
						<EffectComposer>
							<Bloom
								intensity={0.3} // The bloom intensity.
								kernelSize={KernelSize.VERY_LARGE} // blur kernel size
								luminanceThreshold={2} // luminance threshold. Raise this value to mask out darker elements in the scene.
								luminanceSmoothing={0.1} // smoothness of the luminance threshold. Range is [0, 1]
								mipmapBlur={true} // Enables or disables mipmap blur.
								resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
								resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
							/>

							<ChromaticAberration
								blendFunction={BlendFunction.NORMAL} // blend mode
								offset={[0.0005, 0.0005]} // color offset
							/>

							<Noise
								blendFunction={BlendFunction.NORMAL} // blend mode
								premultiply // whether to premultiply the noise texture
							/>

							{/* <Noise
							blendFunction={BlendFunction.NORMAL} // blend mode
							premultiply // whether to premultiply the noise texture
						/> */}
							{/* <GodRays
							blendFunction={BlendFunction.Screen} // The blend function of this effect.
							samples={60} // The number of samples per pixel.
							density={0.96} // The density of the light rays.
							decay={0.9} // An illumination decay factor.
							weight={0.4} // A light ray weight factor.
							exposure={0.6} // A constant attenuation coefficient.
							clampMax={1} // An upper bound for the saturation of the overall effect.
							width={Resolution.AUTO_SIZE} // Render width.
							height={Resolution.AUTO_SIZE} // Render height.
							kernelSize={KernelSize.SMALL} // The blur kernel size. Has no effect if blur is disabled.
							blur={true} // Whether the god rays should be blurred to reduce artifacts.
						/> */}

							{/* <ToneMapping
							blendFunction={BlendFunction.HARD_MIX} // blend mode
							adaptive={true} // toggle adaptive luminance map usage
							resolution={256} // texture resolution of the luminance map
							middleGrey={0.6} // middle grey factor
							maxLuminance={100.0} // maximum luminance
							averageLuminance={1.0} // average luminance
							adaptationRate={1.0} // luminance adaptation rate
						/> */}
						</EffectComposer>
					</ScrollControls>
				</Suspense>
			</Canvas>
		</>
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
  
		  gl_FragColor = vec4(col, 1.0);
	  }
	`;

	useFrame(({ clock }) => {
		if (shaderRef.current) {
			shaderRef.current.uniforms.time.value = clock.getElapsedTime();
			shaderRef.current.uniforms.iResolution.value = new Vector2(window.innerWidth, window.innerHeight);
		}
	});

	return (
		<mesh>
			<sphereGeometry args={[100, 50, 50]} />
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

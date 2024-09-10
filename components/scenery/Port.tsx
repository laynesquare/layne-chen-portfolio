import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import {
	View,
	useProgress,
	Html,
	ScrollControls,
	useScroll,
	OrbitControls,
	Text,
	Preload,
	MeshTransmissionMaterial,
	Text3D,
	Environment,
	Lightformer,
	Scroll,
	Sparkles,
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
	FXAA,
} from '@react-three/postprocessing';
import { KernelSize, Resolution, BlendFunction } from 'postprocessing';
import { Vector2, BackSide, Vector3, Color } from 'three';

import Ripple from '@/components/scenery/Ripple';
import Banner from '@/components/scenery/Banner';
import Model from '@/components/scenery/Model';

export default function Port() {
	return (
		<>
			{/* <OrbitControls /> */}
			<Suspense>
				<ScrollControls
					enabled={true}
					damping={0.1}
					pages={2}>
					<Ripple>
						<Banner />
						{/* <Model /> */}
						{/* <Camera /> */}
						<Environment preset='warehouse'>
							<Lightformer
								color='white'
								intensity={5}
								position={[10, 5, 0]}
								scale={[10, 50, 1]}
								onUpdate={self => self.lookAt(0, 0, 0)}
								form='rect'
							/>
						</Environment>
						<Preload />
					</Ripple>
				</ScrollControls>
			</Suspense>
		</>
	);
}

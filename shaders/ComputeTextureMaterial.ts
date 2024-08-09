import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

const ComputeTextureMaterial = shaderMaterial(
	// Uniforms
	{
		uResolution: [512, 512],
	},
	// Vertex Shader
	`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
	// Fragment Shader
	`
  uniform vec2 uResolution;
  varying vec2 vUv;

  void main() {
    vec2 st = vUv * uResolution.xy / min(uResolution.x, uResolution.y);
    float x = st.x * 10.0;
    float y = st.y * 10.0;

    float v1 = sin(x);
    float v2 = sin(y);
    float v3 = sin(x + y);
    float v4 = sin(sqrt(x * x + y * y) + 5.0);
    float v = v1 + v2 + v3 + v4;

    float r = sin(v);
    float g = sin(v + 3.14159265);
    float b = sin(v + 3.14159265 - 0.5);

    gl_FragColor = vec4(r, g, b, 1.0);
  }
  `,
);

extend({ ComputeTextureMaterial });

export { ComputeTextureMaterial };

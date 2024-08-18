import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

const RaymarchMaterial = shaderMaterial(
	{
		time: 0,
		// No need to define cameraPosition here
	},
	// vertex shader
	`
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vPosition = position;
      vNormal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
	// fragment shader
	`
    uniform float time;

    varying vec3 vPosition;
    varying vec3 vNormal;

    // Define your scene objects here
    float sdSphere(vec3 p, float r) {
        return length(p) - r;
    }

    // Raymarching function
    float sceneSDF(vec3 p) {
        // Define your scene here
        return sdSphere(p, 1.0);
    }

    // Normal calculation
    vec3 calcNormal(vec3 p) {
        const float h = 0.0001;
        const vec2 k = vec2(1, -1);
        return normalize(
            k.xyy * sceneSDF(p + k.xyy * h) +
            k.yyx * sceneSDF(p + k.yyx * h) +
            k.yxy * sceneSDF(p + k.yxy * h) +
            k.xxx * sceneSDF(p + k.xxx * h)
        );
    }

    void main() {
        vec3 rayOrigin = cameraPosition; // Automatically provided by Three.js
        vec3 rayDir = normalize(vPosition - cameraPosition);
        
        float t = 0.0;
        for(int i = 0; i < 100; i++) {
            vec3 p = rayOrigin + t * rayDir;
            float d = sceneSDF(p);
            if(d < 0.01) {  // Adjust the threshold for intersection
                vec3 normal = calcNormal(p);
                vec3 circleCenter = p;
                float circleRadius = 0.1;
                
                vec3 toPixel = p - circleCenter;
                if(length(toPixel - normal * dot(toPixel, normal)) < circleRadius) {
                    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red circle
                } else {
                    gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0); // Gray surface
                }
                return;
            }
            t += d;
        }
        
        // No intersection
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Black background
    }
  `,
);

extend({ RaymarchMaterial });

export default function Ray() {
	return (
		<mesh position={[0, 0, -2]}>
			{/* Move the plane back */}
			{/* <planeGeometry args={[10, 10]} /> */}
			<raymarchMaterial />
		</mesh>
	);
}

export default `
precision lowp float;
precision lowp int;

float PI = 3.141592653589793;

uniform float uTime; // in s
uniform float uScrollVelocity; // - (scroll up) / + (scroll down)
uniform sampler2D uTexture; // texture

out vec2 vUv;  // 0 (left) 0 (bottom) - 1 (top) 1 (right)
out vec2 vUvCover;

float randomFreq(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec3 deformationCurve(vec3 position, vec2 uv) {
    // - Add a wobble effect based on time and the vertex position
    // position.y += sin(uv.x * PI) * abs(uScrollVelocity) * sign(uScrollVelocity) * 0.005;
    
    // - Add  wave to the y-axis based on uTime and position
    position.z += sin(position.x * 20.0 + uTime * 3.0) * 0.05;
    // position.z -= sin(uv.x * PI) * 0.5;
    // position.z += abs(uScrollVelocity) * 0.01;

    float uvFactor = (uScrollVelocity > 0.0) ? (1.0 - uv.y) : uv.y;
    // position.y -= sin(uvFactor * PI * 0.35) * abs(uScrollVelocity) * sign(uScrollVelocity) * 0.025;

    return position;
}

void main() {
    vUv = uv;

    // Apply deformation to the position with time-based wave effect
    vec3 deformedPosition = deformationCurve(position, vUv);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(deformedPosition, 1.0);
}
`;

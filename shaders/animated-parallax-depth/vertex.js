export default `
precision lowp float;
precision lowp int;

varying vec2 vUv;
varying vec3 vPosition;


uniform float uIsInView;
varying float vIsInView;

void main() {
    vUv = uv;
    vPosition = position;
    vIsInView = uIsInView;

    // csm_PositionRaw = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

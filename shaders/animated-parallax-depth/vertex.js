export default `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vPosition = position;

    csm_PositionRaw = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

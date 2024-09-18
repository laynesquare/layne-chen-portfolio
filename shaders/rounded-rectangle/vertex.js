export default `

varying vec2 vUv;

void main() {
    vUv = uv;
    csm_PositionRaw = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

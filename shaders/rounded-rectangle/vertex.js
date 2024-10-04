export default `

varying vec2 vUv;

void main() {
    vUv = uv;
    csm_PositionRaw = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    // - jitter effect
    // csm_PositionRaw.xy /= csm_PositionRaw.w;
    // csm_PositionRaw.xy = floor(csm_PositionRaw.xy * 80.0) / 80.0 * csm_PositionRaw.w;
}
`;

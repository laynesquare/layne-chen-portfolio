const glsl = `
precision lowp float;
precision lowp int;

varying vec2 vUv;
uniform vec2 uResolution;
uniform vec4 uRadii;
uniform float uAnchor;
uniform float uHeatMap;
uniform sampler2D uMaskTexture;
uniform vec2 uMaskResolution;
uniform sampler2D uTranslucentMaskTexture;

// Optimization 1: Simplified SDF calculation with fewer branches
float roundedBoxSDF(vec2 cp, vec2 size, vec4 radius) {
    // Removed branching by using mix() instead of conditional operators
    vec2 r = mix(radius.zw, radius.xy, step(0.0, cp.x));
    float cornerRadius = mix(r.y, r.x, step(0.0, cp.y));
    vec2 q = abs(cp) - size + cornerRadius;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - cornerRadius;
}

// Optimization 2: Precomputed color array using const
const vec3 heatColors[5] = vec3[5](
    vec3(0.0, 0.0, 1.0),  // Blue
    vec3(0.0, 1.0, 1.0),  // Cyan
    vec3(0.0, 1.0, 0.0),  // Green
    vec3(1.0, 1.0, 0.0),  // Yellow
    vec3(1.0, 0.0, 0.0)   // Red
);

// Optimization 3: Simplified heat map calculation
vec3 getHeatMapColor(float value) {
    value = clamp(value * 3.0, 0.0, 3.0);
    int idx = int(floor(value));
    return mix(heatColors[idx], heatColors[idx + 1], fract(value));
}

void main() {
    // Optimization 4: Reduced number of calculations by computing common values once
    const float borderWidth = 1.0;
    vec2 pixelPosition = vUv * uResolution;
    vec2 centerPosition = pixelPosition - uResolution * 0.5;
    vec2 size = uResolution * 0.5 - borderWidth;

    // Optimization 5: Calculate distance once and reuse
    float distance = roundedBoxSDF(centerPosition, size, uRadii);
    
    // Optimization 6: Compute smoothstep values once and reuse
    float smoothedAlpha = 1.0 - smoothstep(0.0, 1.0, distance);
    float borderMix = smoothstep(-borderWidth, 0.0, distance);

    // Optimization 7: Calculate UV coordinates once
    vec2 maskUv = gl_FragCoord.xy / uMaskResolution.xy;
    
    // Optimization 8: Sample textures once
    vec4 maskColor = texture2D(uMaskTexture, maskUv);
    vec4 translucentMaskColor = texture2D(uTranslucentMaskTexture, maskUv);

    // Optimization 9: Simplified color selection using mix()
    vec3 selectedColor = mix(translucentMaskColor.rgb, maskColor.rgb, step(0.5, uAnchor));
    vec3 fillColor = mix(selectedColor, getHeatMapColor(maskColor.b), step(0.5, uHeatMap));

    // Optimization 10: Combine color and alpha calculations
    const vec3 borderColor = vec3(1.0, 1.0, 0.941);
    vec3 finalColor = mix(fillColor, borderColor, borderMix);
    float finalAlpha = mix(1.0, 0.5, borderMix) * smoothedAlpha;

    gl_FragColor = vec4(finalColor, finalAlpha);
}
`;

// Output the final color with the calculated alpha
// csm_DiffuseColor = vec4(color, alpha * smoothedAlpha);
// csm_FragColor = vec4(color, alpha * smoothedAlpha);

// - displacement
// vec4 displacement = texture2D(uMask, maskUv);
// float theta = displacement.r * 2.0 * PI; // Rotation based on displacement
// vec2 dir = vec2(sin(theta), cos(theta)); // Direction
// maskUv += dir * displacement.r * 0.5;
// fillColor = texture2D(uMask, maskUv).rgb;

// - heatwave distortion
// float frequency = 100.0;
// float amplitude = 0.003;
// float distortion = sin(maskUv.y * frequency) * amplitude;
// maskColor = texture2D(uMask, vec2(maskUv.x + distortion, maskUv.y));

export default glsl;

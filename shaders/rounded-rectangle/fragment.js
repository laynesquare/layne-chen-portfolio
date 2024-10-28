const fragmentShader = `
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

float roundedBoxSDF(vec2 centerPosition, vec2 size, vec4 radius) {
    radius.xy = (centerPosition.x > 0.0) ? radius.xy : radius.zw;
    radius.x = (centerPosition.y > 0.0) ? radius.x : radius.y;
    vec2 q = abs(centerPosition) - size + radius.x;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - radius.x;
}

vec3 getHeatMapColor(float value) {
    // Clamp the value between 0.0 and 1.0
    value = clamp(value, 0.0, 1.0);

    // Define color stops as an array of vec3
    vec3 colors[5];
    colors[0] = vec3(0.0, 0.0, 1.0);  // Blue
    colors[1] = vec3(0.0, 1.0, 1.0);  // Cyan
    colors[2] = vec3(0.0, 1.0, 0.0);  // Green
    colors[3] = vec3(1.0, 1.0, 0.0);  // Yellow
    colors[4] = vec3(1.0, 0.0, 0.0);  // Red

    // Compute the segment index and local interpolation value
    float scaledValue = value * 4.0;  // Scale to [0, 4] range
    float idx = floor(scaledValue);   // Determine the segment index
    float t = fract(scaledValue);     // Get the local interpolation value

    // Blend between the two nearest colors
    return mix(colors[int(idx)], colors[int(idx) + 1], t);
}

void main() {
    float borderWidth = 1.0;
    vec2 pixelPosition = vUv * uResolution;
    vec2 centerPosition = pixelPosition - uResolution * 0.5;
    vec2 size = uResolution * 0.5 - borderWidth;

    float distance = roundedBoxSDF(centerPosition, size, uRadii);

    // - Smooth alpha for the border and the fill
    float smoothedAlpha = 1.0 - smoothstep(0.0, 1.0, distance);

    // - Colors
    vec3 borderColor = vec3(1.0, 1.0, 0.941); // #fffff0 in RGB

    // - masking and clipping
    vec2 maskUv = gl_FragCoord.xy / uMaskResolution.xy;
    vec4 maskColor = texture2D(uMaskTexture, maskUv);
    vec3 fillColor = vec3(0.0, 0.0, 0.0);

    // - alpha
    float fillAlpha = 1.0;
    float borderAlpha = 0.5;

    // - finalize texture
    vec4 translucentMaskColor = texture2D(uTranslucentMaskTexture, maskUv);

    // - Use step() to create a float value (1.0 or 0.0) based on uAnchor
    float anchorFactor = step(0.5, uAnchor);

    // - Blend between maskColor and translucentMaskColor based on anchorFactor
    vec3 selectedColor = mix(translucentMaskColor.rgb, maskColor.rgb, anchorFactor);

    // - Use step() to check if uHeatMap is enabled
    float heatMapFactor = step(0.5, uHeatMap);

    // - Get the heatmap color if heatMapFactor is 1.0, otherwise use the selected color
    fillColor = mix(selectedColor, getHeatMapColor(maskColor.b), heatMapFactor);

    // - Set the alpha to 1.0 for both cases
    fillAlpha = 1.0;

    // - Mix the fill and border colors based on the distance
    vec3 color = mix(fillColor, borderColor, smoothstep(-borderWidth, 0.0, distance));

    // - Mix the alpha: fully transparent for fill, fully opaque for border
    float alpha = mix(fillAlpha, borderAlpha, smoothstep(-borderWidth, 0.0, distance));

    // Output the final color with the calculated alpha
    // csm_DiffuseColor = vec4(color, alpha * smoothedAlpha);
    // csm_FragColor = vec4(color, alpha * smoothedAlpha);
    gl_FragColor = vec4(color, alpha * smoothedAlpha);
}
`;

export default fragmentShader;

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

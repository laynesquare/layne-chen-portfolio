const fragmentShader = `
varying vec2 vUv;
uniform vec2 uResolution;
uniform vec4 uRadii;
uniform float uAnchor;
uniform sampler2D uMask;
uniform vec2 uMaskResolution;

float roundedBoxSDF(vec2 centerPosition, vec2 size, vec4 radius) {
    radius.xy = (centerPosition.x > 0.0) ? radius.xy : radius.zw;
    radius.x = (centerPosition.y > 0.0) ? radius.x : radius.y;
    vec2 q = abs(centerPosition) - size + radius.x;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - radius.x;
}

void main() {
    float borderWidth = 2.0;
    vec2 pixelPosition = vUv * uResolution;
    vec2 centerPosition = pixelPosition - uResolution * 0.5;
    vec2 size = uResolution * 0.5 - borderWidth;

    float distance = roundedBoxSDF(centerPosition, size, uRadii);

    // Smooth alpha for the border and the fill
    float smoothedAlpha = 1.0 - smoothstep(0.0, 1.0, distance);

    // - Colors
    // vec3 fillColor = vec3(1.0, 1.0, 0.941); // #fffff0 in RGB
    // vec3 fillColor = vec3(0.0, 0.0, 0.0);
    vec3 borderColor = vec3(1.0, 1.0, 0.941); // #fffff0 in RGB

    // - masking and clipping
    vec2 maskUv = gl_FragCoord.xy / uMaskResolution.xy;
    vec4 maskColor = texture2D(uMask, maskUv);
    vec3 fillColor = maskColor.rgb;

    // Determine the alpha for fill and border
    float fillAlpha = (uAnchor == 1.0) ? 1.0 : 0.2; // Use uAnchor to control fillAlpha
    float borderAlpha = 1.0;      // Keep the border fully opaque

    // Mix the fill and border colors based on the distance
    vec3 color = mix(fillColor, borderColor, smoothstep(-borderWidth, 0.0, distance));

    // Mix the alpha: fully transparent for fill, fully opaque for border
    float alpha = mix(fillAlpha, borderAlpha, smoothstep(-borderWidth, 0.0, distance));

    // Output the final color with the calculated alpha
    csm_FragColor = vec4(color, alpha * smoothedAlpha);
}
`;

export default fragmentShader;

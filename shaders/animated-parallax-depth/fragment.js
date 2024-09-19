const fragmentShader = `
varying vec3 position;
varying vec2 vUv;
uniform vec2 uResolution;
uniform vec4 uRadii;

uniform sampler2D uTexture;
uniform sampler2D uTextureDepth;
uniform vec2 uMouse;

float roundedBoxSDF(vec2 centerPosition, vec2 size, vec4 radius) {
    radius.xy = (centerPosition.x > 0.0) ? radius.xy : radius.zw;
    radius.x = (centerPosition.y > 0.0) ? radius.x : radius.y;
    vec2 q = abs(centerPosition) - size + radius.x;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - radius.x;
}

void main() {
    // ! parallax handling
    float frequency = 100.0;
    float amplitude = 0.003;
    float distortion = sin(vUv.y * frequency) * amplitude;

    // - sample the depth texture
    float depth = texture(uTextureDepth, vUv).r;
    float shiftX = uMouse.x * 0.05;
    float shiftY = uMouse.y * 0.05;

    vec2 parallaxPosition= vec2(vUv.x + shiftX * depth, vUv.y + shiftY * depth);
    vec4 textureColorWithParallax = texture(uTexture, parallaxPosition);

    // ! border handling
    vec2 pixelPosition = vUv * uResolution;
    vec2 centerPosition = pixelPosition - uResolution * 0.5;
    float borderWidth = 2.0;
    vec2 size = uResolution * 0.5 - borderWidth;
    float distance = roundedBoxSDF(centerPosition, size, uRadii);

    // - Smooth alpha for the border and the fill
    float smoothedAlpha = 1.0 - smoothstep(0.0, 1.0, distance);

    // - Colors
    vec3 borderColor = vec3(1.0, 1.0, 0.941); // #fffff0 in RGB
    vec3 fillColor = vec3(textureColorWithParallax.r, textureColorWithParallax.g, textureColorWithParallax.b);

    // - Determine the alpha for fill and border
    float fillAlpha = 1.0;        // Make the fill fully transparent
    float borderAlpha = 1.0;      // Keep the border fully opaque

    // - Mix the fill and border colors based on the distance
    vec3 color = mix(fillColor, borderColor, smoothstep(-borderWidth, 0.0, distance));
    float alpha = mix(fillAlpha, borderAlpha, smoothstep(-borderWidth, 0.0, distance));

    csm_FragColor = vec4(color, alpha * smoothedAlpha);
}
`;

export default fragmentShader;

// - output the original with distortion
// vec4 color = texture(uTexture, vec2(vUv.x + distortion, vUv.y));

// - output the original
// vec4 color = texture(uTexture, vUv);

// vec4 color = texture(uTexture, parallaxPosition);
// csm_FragColor = color;

const fragmentShader = `
precision lowp float;
precision lowp int;

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
    // precision lowp float;

    vec2 mouseNormalized = (uMouse + 1.0) / 2.0;

    // - Parallax mapping parameters
    float parallaxScale = 2.0; // Controls the strength of the parallax effect
    float numLayers = 5.0;
    float layerDepth = 1.0 / numLayers;
    float currentLayerDepth = 0.0;
    vec2 deltaTexCoords = uMouse * parallaxScale / numLayers;
    vec2 currentTexCoords = vUv;

    // - Perform parallax occlusion mapping
    for (int i = 0; i < 5; i++) {
        currentTexCoords -= deltaTexCoords;
        currentLayerDepth += layerDepth;
        float depthFromTexture = 1.0 - texture2D(uTexture, currentTexCoords).r;
        if (currentLayerDepth > depthFromTexture) {
            break;
        }
    }

    // - Sample the texture with the adjusted UV coordinates
    vec4 textureColorWithParallax = texture2D(uTexture, currentTexCoords);

    // - border handling
    float borderWidth = 1.0;
    vec2 pixelPosition = vUv * uResolution;
    vec2 centerPosition = pixelPosition - uResolution * 0.5;
    vec2 size = uResolution * 0.5 - borderWidth;
    float distance = roundedBoxSDF(centerPosition, size, uRadii);

    // - Smooth alpha for the border and the fill
    float smoothedAlpha = 1.0 - smoothstep(0.0, 1.0, distance);

    // - Colors
    vec3 borderColor = vec3(1.0, 1.0, 0.941); // #fffff0 in RGB
    vec3 fillColor = textureColorWithParallax.rgb;

    // - Determine the alpha for fill and border
    float fillAlpha = 0.95;        // Make the fill opaque
    float borderAlpha = 0.2;      // Keep the border fully opaque

    // - Mix the fill and border colors based on the distance
    vec3 color = mix(fillColor, borderColor, smoothstep(-borderWidth, 0.0, distance));
    float alpha = mix(fillAlpha, borderAlpha, smoothstep(-borderWidth, 0.0, distance));

    // csm_FragColor = vec4(color, alpha * smoothedAlpha);
    gl_FragColor = vec4(color, alpha * smoothedAlpha);
}
`;

export default fragmentShader;

// - output the original with distortion
// vec4 color = texture(uTexture, vec2(vUv.x + distortion, vUv.y));

// - output the original
// vec4 color = texture(uTexture, vUv);

// vec4 color = texture(uTexture, parallaxPosition);
// csm_FragColor = color;

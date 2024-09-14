const fragmentShader = `
uniform float uTime;
varying vec2 vUv;
varying vec3 vPosition;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 2.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

// Generate high-frequency noise for grain effect
float grainNoise(vec2 uv) {
    return snoise(uv * 1800.0 + 1.0 * 10.0) * 0.05;
}

float curvedLines(vec2 uv, float offset, float curveAmount) {
    // Apply curvature to the uv.x by using uv.y and curveAmount
    uv.x += sin(uv.y * 3.14159) * curveAmount;

    // Create the curved lines using the modified uv
    return smoothstep(
        0.0, 0.5 + offset * 0.5,
        abs(0.5 * (sin(uv.x * 10.0) + offset * 2.0))
    );
}

void main() {
    // Create vertical gradient
    float gradient = smoothstep(0.1, 8.0, abs(vUv.x - 0.5) * 80.0); // Adjust gradient smoothness
    
    // Generate low-frequency noise for pattern (scale down for larger shapes)
    float noise = snoise(vUv * 8.0 + uTime * 0.05) * 0.5; // Lower the frequency of noise
    
    // Combine gradient and noise for base pattern
    float pattern = mix(gradient, noise, 0.7); // Use more of the noise in blending

    vec2 baseUV = vPosition.xy;
    float basePattern = curvedLines(baseUV, 0.1, 1.0);
    float baseSecondPattern = curvedLines(baseUV, noise, 1.0);
    
    // Define colors
    vec3 darkColor = vec3(0.227, 0.227, 0.227);
    vec3 brightColor = vec3(0.243, 0.639, 0.482);
    
    // Mix colors based on the pattern
    vec3 finalColor = mix(brightColor, darkColor, baseSecondPattern);
    
    // Add grainy texture on top
    float grain = grainNoise(vUv);
    finalColor += grain;  // Adjust the strength of the grain effect here
    
    gl_FragColor = vec4(finalColor, 1.0);
}
`;

export default fragmentShader;

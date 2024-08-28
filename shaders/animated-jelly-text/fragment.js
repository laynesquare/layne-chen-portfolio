const fragmentShader = `
#define TAU 6.28318530718
#define MAX_ITER 5

// #extension GL_OES_standard_derivatives : enable

precision highp float;
precision highp int;

uniform vec2 Tiling_Caustic1477531952046_152_resolution;
uniform vec3 backgroundColor;
uniform vec3 Tiling_Caustic1477531952046_152_color;
uniform float Tiling_Caustic1477531952046_152_speed;
uniform float Tiling_Caustic1477531952046_152_brightness;
uniform float time;
uniform float contrast;
uniform float distortion;
uniform float Noise_Ripples1477531959288_166_speed;
uniform vec3 Noise_Ripples1477531959288_166_color;
uniform float Noise_Ripples1477531959288_166_brightness;
uniform sampler2D noiseImage;
uniform vec2 Noise_Ripples1477531959288_166_resolution;
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
uniform float highlightIntensity;
uniform vec3 highlightColor;
uniform vec3 Wiggly_Improved1477532051339_181_color;
uniform vec3 Transparent_Glow1477532059126_201_color;
uniform float Transparent_Glow1477532059126_201_start;
uniform float Transparent_Glow1477532059126_201_end;
uniform float Transparent_Glow1477532059126_201_alpha;
uniform vec3 Glow_Effect1477532183055_216_color;
uniform float Glow_Effect1477532183055_216_start;
uniform float Glow_Effect1477532183055_216_end;
uniform float Glow_Effect1477532183055_216_alpha;

varying vec2 Tiling_Caustic1477531952046_152_vUv;
varying vec2 Noise_Ripples1477531959288_166_vUv;
varying vec3 Wiggly_Improved1477532051339_181_vNormal;
varying float light;
varying vec3 Transparent_Glow1477532059126_201_fPosition;
varying vec3 Transparent_Glow1477532059126_201_fNormal;
varying vec3 Glow_Effect1477532183055_216_fPosition;
varying vec3 Glow_Effect1477532183055_216_fNormal;

mat2 makem2(in float theta) {
    float c = cos(theta);
    float s = sin(theta);
    return mat2(c, -s, s, c);
}

float noise(in vec2 x) {
    return texture2D(noiseImage, x * .01).x;
}

float fbm(in vec2 p) {
    float z = 2.;
    float rz = 0.;
    vec2 bp = p;
    for (float i = 1.; i < 6.0; i++) {
        rz += abs((noise(p) - 0.5) * 2.0) / z;
        z = z * 2.;
        p = p * 2.;
    }
    return rz;
}

float dualfbm(in vec2 p) {
    vec2 p2 = p * distortion;
    vec2 basis = vec2(fbm(p2 - time * Noise_Ripples1477531959288_166_speed * 1.6), fbm(p2 + time * Noise_Ripples1477531959288_166_speed * 1.7));
    basis = (basis - .5) * .2;
    p += basis;
    return fbm(p * makem2(time * Noise_Ripples1477531959288_166_speed * 0.2));
}

vec4 Tiling_Caustic1477531952046_152_main() {
    vec4 Tiling_Caustic1477531952046_152_gl_FragColor = vec4(0.0);
    vec2 uv = Tiling_Caustic1477531952046_152_vUv * Tiling_Caustic1477531952046_152_resolution;
    vec2 p = mod(uv * TAU, TAU) - 250.0;
    vec2 i = vec2(p);
    float c = 1.0;
    float inten = 0.005;
    for (int n = 0; n < MAX_ITER; n++) {
        float t = time * Tiling_Caustic1477531952046_152_speed * (1.0 - (3.5 / float(n + 1)));
        i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
        c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));
    }
    c /= float(MAX_ITER);
    c = 1.17 - pow(c, Tiling_Caustic1477531952046_152_brightness);
    vec3 rgb = vec3(pow(abs(c), 8.0));
    Tiling_Caustic1477531952046_152_gl_FragColor = vec4(rgb * Tiling_Caustic1477531952046_152_color + backgroundColor, 1.0);
    return Tiling_Caustic1477531952046_152_gl_FragColor *= 1.0;
}

vec4 Noise_Ripples1477531959288_166_main() {
    vec4 Noise_Ripples1477531959288_166_gl_FragColor = vec4(0.0);
    vec2 p = (Noise_Ripples1477531959288_166_vUv.xy - 0.5) * Noise_Ripples1477531959288_166_resolution;
    float rz = dualfbm(p);
    vec3 col = (Noise_Ripples1477531959288_166_color / rz) * Noise_Ripples1477531959288_166_brightness;
    col = ((col - 0.5) * max(contrast, 0.0)) + 0.5;
    Noise_Ripples1477531959288_166_gl_FragColor = vec4(col, 1.0);
    return Noise_Ripples1477531959288_166_gl_FragColor *= 0.8;
}

vec4 Wiggly_Improved1477532051339_181_main() {
    vec4 Wiggly_Improved1477532051339_181_gl_FragColor = vec4(0.0);
    Wiggly_Improved1477532051339_181_gl_FragColor = vec4(clamp(highlightColor * highlightIntensity * light, 0.0, 1.0), 1.0);
    return Wiggly_Improved1477532051339_181_gl_FragColor *= 1.0;
}

vec4 Transparent_Glow1477532059126_201_main() {
    vec4 Transparent_Glow1477532059126_201_gl_FragColor = vec4(0.0);
    vec3 normal = normalize(Transparent_Glow1477532059126_201_fNormal);
    vec3 eye = normalize(-Transparent_Glow1477532059126_201_fPosition.xyz);
    float rim = smoothstep(Transparent_Glow1477532059126_201_start, Transparent_Glow1477532059126_201_end, 1.0 - dot(normal, eye));
    float value = clamp(rim * Transparent_Glow1477532059126_201_alpha, 0.0, 1.0);
    Transparent_Glow1477532059126_201_gl_FragColor = vec4(Transparent_Glow1477532059126_201_color * value, value);
    return Transparent_Glow1477532059126_201_gl_FragColor *= 1.0;
}

vec4 Glow_Effect1477532183055_216_main() {
    vec4 Glow_Effect1477532183055_216_gl_FragColor = vec4(0.0);
    vec3 normal = normalize(Glow_Effect1477532183055_216_fNormal);
    vec3 eye = normalize(-Glow_Effect1477532183055_216_fPosition.xyz);
    float rim = smoothstep(Glow_Effect1477532183055_216_start, Glow_Effect1477532183055_216_end, 1.0 - dot(normal, eye));
    Glow_Effect1477532183055_216_gl_FragColor = vec4(clamp(rim, 0.0, 1.0) * Glow_Effect1477532183055_216_alpha * Glow_Effect1477532183055_216_color, 1.0);
    return Glow_Effect1477532183055_216_gl_FragColor *= 1.0;
}

void main() {
    csm_FragColor = Tiling_Caustic1477531952046_152_main() + 
                   Noise_Ripples1477531959288_166_main() + 
                   Transparent_Glow1477532059126_201_main() + 
                   Glow_Effect1477532183055_216_main() + 
                   Wiggly_Improved1477532051339_181_main();
}
`;

export default fragmentShader;

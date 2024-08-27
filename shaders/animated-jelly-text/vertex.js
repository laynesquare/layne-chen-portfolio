export default `
precision highp float;
precision highp int;

uniform float time;
uniform float Wiggly_Improved1477532051339_181_speed;
uniform float frequency;
uniform float amplitude;


attribute vec2 uv2;

varying vec3 Tiling_Caustic1477531952046_152_vPosition;
varying vec3 Tiling_Caustic1477531952046_152_vNormal;
varying vec2 Tiling_Caustic1477531952046_152_vUv;
varying vec2 Tiling_Caustic1477531952046_152_vUv2;
varying vec3 Noise_Ripples1477531959288_166_vPosition;
varying vec3 Noise_Ripples1477531959288_166_vNormal;
varying vec2 Noise_Ripples1477531959288_166_vUv;
varying vec2 Noise_Ripples1477531959288_166_vUv2;
varying vec3 Wiggly_Improved1477532051339_181_vNormal;
varying float light;
varying vec3 Wiggly_Improved1477532051339_181_vPosition;
varying vec3 Transparent_Glow1477532059126_201_fNormal;
varying vec3 Transparent_Glow1477532059126_201_fPosition;
varying vec3 Glow_Effect1477532183055_216_fNormal;
varying vec3 Glow_Effect1477532183055_216_fPosition;

vec4 Tiling_Caustic1477531952046_152_main() {
    vec4 Tiling_Caustic1477531952046_152_gl_Position = vec4(0.0);
    Tiling_Caustic1477531952046_152_vNormal = normal;
    Tiling_Caustic1477531952046_152_vUv = uv;
    Tiling_Caustic1477531952046_152_vUv2 = uv2;
    Tiling_Caustic1477531952046_152_vPosition = position;
    Tiling_Caustic1477531952046_152_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    return Tiling_Caustic1477531952046_152_gl_Position *= 1.0;
}

vec4 Noise_Ripples1477531959288_166_main() {
    vec4 Noise_Ripples1477531959288_166_gl_Position = vec4(0.0);
    Noise_Ripples1477531959288_166_vNormal = normal;
    Noise_Ripples1477531959288_166_vUv = uv;
    Noise_Ripples1477531959288_166_vUv2 = uv2;
    Noise_Ripples1477531959288_166_vPosition = position;
    Noise_Ripples1477531959288_166_gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    return Noise_Ripples1477531959288_166_gl_Position *= 0.8;
}

vec4 Wiggly_Improved1477532051339_181_main() {
    vec4 Wiggly_Improved1477532051339_181_gl_Position = vec4(0.0);
    vec3 offset = normalize(vec3(0.0) - position) * (amplitude * sin(Wiggly_Improved1477532051339_181_speed * time + position.y * frequency));
    vec3 newPosition = position + vec3(offset.x, 0.0, offset.z);
    light = amplitude * sin(Wiggly_Improved1477532051339_181_speed * time + 1.0 + position.y * frequency);
    Wiggly_Improved1477532051339_181_vPosition = newPosition;
    Wiggly_Improved1477532051339_181_gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    return Wiggly_Improved1477532051339_181_gl_Position *= 1.0;
}

vec4 Transparent_Glow1477532059126_201_main() {
    vec4 Transparent_Glow1477532059126_201_gl_Position = vec4(0.0);
    Transparent_Glow1477532059126_201_fNormal = normalize(normalMatrix * normal);
    vec4 pos = modelViewMatrix * vec4(position, 1.0);
    Transparent_Glow1477532059126_201_fPosition = pos.xyz;
    Transparent_Glow1477532059126_201_gl_Position = projectionMatrix * pos;
    return Transparent_Glow1477532059126_201_gl_Position *= 1.0;
}

vec4 Glow_Effect1477532183055_216_main() {
    vec4 Glow_Effect1477532183055_216_gl_Position = vec4(0.0);
    Glow_Effect1477532183055_216_fNormal = normalize(normalMatrix * normal);
    vec4 pos = modelViewMatrix * vec4(position, 1.0);
    Glow_Effect1477532183055_216_fPosition = pos.xyz;
    Glow_Effect1477532183055_216_gl_Position = projectionMatrix * pos;
    return Glow_Effect1477532183055_216_gl_Position *= 1.0;
}

void main() {
    gl_Position = Tiling_Caustic1477531952046_152_main() + Noise_Ripples1477531959288_166_main() + Wiggly_Improved1477532051339_181_main() + Transparent_Glow1477532059126_201_main() + Glow_Effect1477532183055_216_main();
}
`;

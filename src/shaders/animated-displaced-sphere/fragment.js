export default glsl = `
precision lowp float;
precision lowp int;

varying float vPattern;
uniform vec3 uColor;
uniform float uIsNormalColor;

void main() {
    vec3 color = uColor;
    float isNormalColorFactor = step(0.5, uIsNormalColor);
    vec3 finalColor = mix(color, normalize(vNormal) * 0.5 + 0.5, isNormalColorFactor);

    color *= vPattern;
    csm_DiffuseColor = vec4(finalColor, 1.0);
}
`;

// void main() {
//     vec3 color = uColor;
//     float isNormalColorFactor = step(0.5, uIsNormalColor);
//     vec3 finalColor = mix(color, normalize(vNormal) * 0.5 + 0.5, isNormalColorFactor);

//     color *= vPattern;
//     csm_DiffuseColor = vec4(finalColor, 1.0);
// }

export default /*glsl*/ `
varying float vPattern;
uniform vec3 uColor;
uniform float uIsNormalColor;

void main() {
    vec3 color = uColor; // Default to uniform color

    if (uIsNormalColor == 1.0) {
        vec3 nv_color = normalize(vNormal) * 0.5 + 0.5; // Normal vector color
        color = nv_color; // Use normal color when the condition is true
    }

    color *= vPattern;
    csm_DiffuseColor = vec4(color, 1.0);
}
`;

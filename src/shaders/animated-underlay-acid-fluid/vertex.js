const glsl = `
precision lowp float;
precision lowp int;

varying vec2 vUv;
varying vec3 vPosition;
uniform sampler2D uTexture;

void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export default glsl;

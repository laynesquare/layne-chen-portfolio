const fragmentShader = `
varying vec3 position;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform sampler2D uTextureDepth;
uniform vec2 uMouse;

void main() {
  float frequency = 100.0;
  float amplitude = 0.003;
  float distortion = sin(vUv.y * frequency) * amplitude;

  // - output the original with distortion
  // vec4 color = texture(uTexture, vec2(vUv.x + distortion, vUv.y));

  // - output the original
  // vec4 color = texture(uTexture, vUv);

  // - sample the depth texture
  float depth = texture(uTextureDepth, vUv).r;

  // float parallax = uMouse * 0.005;

  float shiftX = uMouse.x * 0.01;
  float shiftY = uMouse.y * 0.01;

  vec2 parallaxPosition= vec2(vUv.x + shiftX * depth, vUv.y + shiftY * depth);

  vec4 color = texture(uTexture, parallaxPosition);

  gl_FragColor = color;
}
`;

export default fragmentShader;

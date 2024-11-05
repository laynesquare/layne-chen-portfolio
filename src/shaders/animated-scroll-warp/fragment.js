export default glsl = `
precision lowp float;
precision lowp int;

float PI = 3.141592653589793;

uniform float uTime; // in s
uniform vec2 uCursor; // 0 (left) 0 (top) / 1 (right) 1 (bottom)
uniform float uScrollVelocity; // - (scroll up) / + (scroll down)
uniform sampler2D uTexture; // texture
uniform sampler2D uDisplacement;

in vec2 vUv; // 0 (left) 0 (bottom) - 1 (right) 1 (top)
in vec2 vUvCover;

out vec4 outColor;

// - center curve (smoothness strength)
const float radius = 0.5;

// - main content will lean towards center
const float strength = 2.0;

vec2 bulge(vec2 uv, vec2 center) {
  uv -= center;
  float dist = length(uv) / radius; // distance from UVs divided by radius
  float distPow = pow(dist, 4.0);
  float strengthAmount = strength / (1.0 + distPow); // Invert bulge and add a minimum of 1)

  float scrollSpeed = abs(uScrollVelocity); // ranges from 0.0 to 50.0
  float scrollFactor = clamp(scrollSpeed / 100.0, 0.0, 1.0);

  // uv *= strengthAmount;
  uv *= (1. - scrollFactor) + scrollFactor * strengthAmount;
  uv += center;

  return uv;
}


void main() {
  vec2 center = vec2(0.5, 0.5);
  vec2 texCoords = bulge(vUv, center);

  // - DISPLACEMENT SECTION
  vec4 displacement = texture(uDisplacement, texCoords); // Sample displacement texture
  float theta = displacement.r * 2.0 * PI; // Rotation based on displacement
  vec2 dir = vec2(sin(theta), cos(theta)); // Direction
  texCoords += dir * displacement.r * 0.08; // Apply displacement to texture coordinates

  // - Apply chromatic aberration where displacement occurs
  vec2 aberrationOffset = dir * displacement.r * 0.01; // Smaller offset for chromatic aberration

  // - Sample the texture for each RGB channel with a slight offset
  vec3 color;
  color.r = texture(uTexture, texCoords + aberrationOffset ).r;
  color.g = texture(uTexture, texCoords).g;
  color.b = texture(uTexture, texCoords - aberrationOffset).b;

  // output
  outColor = vec4(color, 1.0);
}
`;

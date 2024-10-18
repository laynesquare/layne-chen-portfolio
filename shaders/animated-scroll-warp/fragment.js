const fragmentShader = `
precision lowp float;
precision lowp int;

float PI = 3.141592653589793;
uniform vec2 uResolution; // in pixel
uniform float uTime; // in s
uniform vec2 uCursor; // 0 (left) 0 (top) / 1 (right) 1 (bottom)
uniform float uScrollVelocity; // - (scroll up) / + (scroll down)
uniform sampler2D uTexture; // texture
uniform sampler2D uDisplacement;
uniform vec2 uTextureSize; // size of texture
uniform vec2 uQuadSize; // size of texture element
uniform float uBorderRadius; // pixel value
uniform float uMouseEnter; // 0 - 1 (enter) / 1 - 0 (leave)
uniform vec2 uMouseOverPos; // 0 (left) 0 (top) / 1 (right) 1 (bottom)

in vec2 vUv; // 0 (left) 0 (bottom) - 1 (right) 1 (top)
in vec2 vUvCover;


vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+10.0)*x);
}

float snoise(vec2 v)
  {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
// First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

// Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

// Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
		+ i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

// Gradients: 41 points uniformly over a line, mapped onto a diamond.
// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

// Normalise gradients implicitly by scaling m
// Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

// Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}


out vec4 outColor;

// - center curve (smoothness strength)
// const float radius = 0.75;
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

  // aspect ratio needed to create a real circle when quadSize is not 1:1 ratio
  float aspectRatio = uQuadSize.y / uQuadSize.x;

  // create a circle following the mouse with size 15
  float circle = 1.0 - distance(
    vec2(uMouseOverPos.x, (1.0 - uMouseOverPos.y) * aspectRatio),
    vec2(vUv.x, vUv.y * aspectRatio)
  ) * 15.0;

  // create noise
  float noise = snoise(gl_FragCoord.xy);

  // modify texture coordinates
  texCoords.x += mix(0.0, noise * 0.00, uScrollVelocity * 0.01);
  texCoords.y += mix(0.0, noise * 0.00, uScrollVelocity * 0.01);

  // --- DISPLACEMENT SECTION ---
  vec4 displacement = texture(uDisplacement, texCoords); // Sample displacement texture
  float theta = displacement.r * 2.0 * PI; // Rotation based on displacement
  vec2 dir = vec2(sin(theta), cos(theta)); // Direction
  texCoords += dir * displacement.r * 0.1; // Apply displacement to texture coordinates
  // --- END OF DISPLACEMENT SECTION ---

  // Apply chromatic aberration where displacement occurs
  vec2 aberrationOffset = dir * displacement.r * 0.01; // Smaller offset for chromatic aberration

  // Sample the texture for each RGB channel with a slight offset
  vec3 color;
  color.r = texture(uTexture, texCoords + aberrationOffset ).r;
  color.g = texture(uTexture, texCoords).g;
  color.b = texture(uTexture, texCoords - aberrationOffset).b;

  // output
  outColor = vec4(color, 1.0);
}

`;

export default fragmentShader;

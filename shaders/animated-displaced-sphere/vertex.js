export default /*glsl*/ `
attribute vec4 tangent;

varying float vPattern;

uniform float uTime;
uniform float uSpeed;
uniform float uNoiseStrength;
uniform float uDisplacementStrength;
uniform float uFractAmount;

vec3 hash3( vec2 p ){
    vec3 q = vec3( dot(p,vec2(127.1,311.7)), 
				   dot(p,vec2(269.5,183.3)), 
				   dot(p,vec2(419.2,371.9)) );
	return fract(sin(q)*43758.5453);
}

float iqnoise( in vec2 x, float u, float v ){
    vec2 p = floor(x);
    vec2 f = fract(x);
		
	float k = 1.0+63.0*pow(1.0-v,4.0);
	
	float va = 0.0;
	float wt = 0.0;
    for( int j=-2; j<=2; j++ )
    for( int i=-2; i<=2; i++ )
    {
        vec2 g = vec2( float(i),float(j) );
		vec3 o = hash3( p + g )*vec3(u,u,1.0);
		vec2 r = g - f + o.xy;
		float d = dot(r,r);
		float ww = pow( 1.0-smoothstep(0.0,1.414,sqrt(d)), k );
		va += o.z*ww;
		wt += ww;
    }
	
    return va/wt;
}


float smoothMod(float axis, float amp, float rad) {
    float top = cos(PI * (axis / amp)) * sin(PI * (axis / amp));
    float bottom = pow(sin(PI * (axis / amp)), 2.0) + pow(rad, 2.0);
    float at = atan(top / bottom);
    return amp * (1.0 / 2.0) - (1.0 / PI) * at;
}

float getDisplacement(vec3 position) {
    vec3 pos = position;
    pos.y -= uTime * 0.05 * uSpeed;
    pos += iqnoise(pos.xy * 1.65, 1.0, 1.0) * uNoiseStrength;

    return smoothMod(pos.y * uFractAmount, 1., 1.5) * uDisplacementStrength;
}

void main() {
    vec3 biTangent = cross(csm_Normal, tangent.xyz);
    float shift = 0.01;
    vec3 posA = csm_Position + tangent.xyz * shift;
    vec3 posB = csm_Position + biTangent * shift;

    float pattern = getDisplacement(csm_Position);
    vPattern = pattern;

    csm_Position += csm_Normal * pattern;
    posA += csm_Normal * getDisplacement(posA);
    posB += csm_Normal * getDisplacement(posB);

    vec3 toA = normalize(posA - csm_Position);
    vec3 toB = normalize(posB - csm_Position);

    csm_Normal = normalize(cross(toA, toB));
}
`;

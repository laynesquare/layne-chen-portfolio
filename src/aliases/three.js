/* -------------------------------------------------------------------------- */
/*                             cherry-pick imports                            */
/* -------------------------------------------------------------------------- */

export class WebXRManager {
	// Add any specific XR methods/properties you need
	constructor() {
		this.enabled = false;
		this.isPresenting = false;
	}

	// Common WebXR methods you might want to stub
	getController() {}
	getControllerGrip() {}
	getHand() {}
	setFramebufferScaleFactor() {}
	setReferenceSpaceType() {}
	getReferenceSpace() {}
	getSession() {}
	setSession() {}
	getCamera() {}
	addEventListener() {}
	getEnvironmentBlendMode() {}
}

export { WebGLRenderer } from 'three/src/renderers/WebGLRenderer.js';
export { WebGLRenderTarget } from 'three/src/renderers/WebGLRenderTarget.js';
export { WebGLCubeRenderTarget } from 'three/src/renderers/WebGLCubeRenderTarget.js';
export { ShaderChunk } from 'three/src/renderers/shaders/ShaderChunk.js';
export { Scene } from 'three/src/scenes/Scene.js';
export { Mesh } from 'three/src/objects/Mesh.js';

export { Material } from 'three/src/materials/Material.js';
export { Texture } from 'three/src/textures/Texture.js';

export { OrthographicCamera } from 'three/src/cameras/OrthographicCamera.js';
export { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera.js';
export { CubeCamera } from 'three/src/cameras/CubeCamera.js';

export { Matrix4 } from 'three/src/math/Matrix4.js';
export { Matrix3 } from 'three/src/math/Matrix3.js';
export { Box3 } from 'three/src/math/Box3.js';
export { Vector4 } from 'three/src/math/Vector4.js';
export { Vector3 } from 'three/src/math/Vector3.js';
export { Vector2 } from 'three/src/math/Vector2.js';
export { Color } from 'three/src/math/Color.js';

export * from 'three/src/constants.js';
export * from 'three/src/core/BufferAttribute.js';

export { DataUtils } from 'three/src/extras/DataUtils.js';
export { InstancedBufferAttribute } from 'three/src/core/InstancedBufferAttribute.js';

export { DataTextureLoader } from 'three/src/loaders/DataTextureLoader.js';
export { Clock } from 'three/src/core/Clock.js';

export { ShaderMaterial } from 'three/src/materials/ShaderMaterial.js';

export { BufferGeometry } from 'three/src/core/BufferGeometry.js';
export { PlaneGeometry } from 'three/src/geometries/PlaneGeometry.js';
export { IcosahedronGeometry } from 'three/src/geometries/IcosahedronGeometry.js';
export { CircleGeometry } from 'three/src/geometries/CircleGeometry.js';

export { InstancedBufferGeometry } from 'three/src/core/InstancedBufferGeometry.js';
export { MeshPhysicalMaterial } from 'three/src/materials/MeshPhysicalMaterial.js';
export { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial.js';

export { Group } from 'three/src/objects/Group.js';
export { Sphere } from 'three/src/math/Sphere.js';
export { Ray } from 'three/src/math/Ray.js';
export { Raycaster } from 'three/src/core/Raycaster.js';

export { LoadingManager, DefaultLoadingManager } from 'three/src/loaders/LoadingManager.js';
export { TextureLoader } from 'three/src/loaders/TextureLoader.js';

export { MathUtils } from 'three/src/math/MathUtils.js';

/* ------------------------------ three-stdlib ------------------------------ */

export { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

/* -------------------------------- stub/mock ------------------------------- */

// export { GainMapLoader } from 'three/src/loaders/GainMapLoader.js';
// export class GainMapLoader {}
export class HDRJPGLoader {}
// export class EXRLoader {}

// export class Loader {}
// export class FileLoader {}

// export { Cache } from 'three/src/loaders/Cache.js';
export { Loader } from 'three/src/loaders/Loader.js';
export { FileLoader } from 'three/src/loaders/FileLoader.js';

export class ShaderLib {}
export class UniformsLib {}
export class UniformsUtils {}
export class Uniform {}

export class LineLoop {}
export class LineSegments {}
export class Interpolant {}
export class InstancedMesh {}

export class Spherical {}
export class Shape {}
export class Triangle {}
export class Line {}
export class Line3 {}
export class Box2 {}

export class Bone {}
export class Path {}
export class Points {}
export class Skeleton {}
export class SkinnedMesh {}
export class ShapePath {}
export class Sprite {}
export class Plane {}
export class Quaternion {}
export class Euler {}
export class Object3D {}

export class EllipseCurve {}
export class Curve {}

export class AnimationClip {}
export class QuaternionKeyframeTrack {}
export class NumberKeyframeTrack {}
export class VectorKeyframeTrack {}
export class BooleanKeyframeTrack {}
export class ColorKeyframeTrack {}
export class AnimationMixer {}

export class SkeletonHelper {}
export class GridHelper {}
export class Box3Helper {}

export class ConeGeometry {}
export class CylinderGeometry {}
export class OctahedronGeometry {}
export class TorusGeometry {}
export class SphereGeometry {}
export class LatheGeometry {}
export class ExtrudeGeometry {}
export class BoxGeometry {}
export class WireframeGeometry {}

export class SpriteMaterial {}
export class MeshLambertMaterial {}
export class RawShaderMaterial {}
export class MeshNormalMaterial {}
export class MeshToonMaterial {}
export class MeshPhongMaterial {}
export class MeshStandardMaterial {}
export class MeshDistanceMaterial {}
export class MeshDepthMaterial {}
export class PointsMaterial {}
export class LineBasicMaterial {}

export class EventDispatcher {}

export class Camera {}
// export class OrthographicCamera {}
export class StereoCamera {}
export class Frustum {}

export class SphericalHarmonics3 {}
export class LoaderUtils {}

export class CubeTextureLoader {}
export class BufferGeometryLoader {}
export class ImageBitmapLoader {}
export class CompressedTextureLoader {}

export class CompressedTexture {}
export class DataTexture {}
export class DepthTexture {}
export class CanvasTexture {}
export class CubeTexture {}

export class InstancedInterleavedBuffer {}
export class InterleavedBufferAttribute {}
export class InterleavedBuffer {}

export class SpotLight {}
export class PointLight {}
export class DirectionalLight {}
export class AmbientLight {}
export class RectAreaLight {}
export class LightProbe {}

export class Layers {}

// export class BufferAttribute {}
export class ShapeUtils {}
export class PropertyBinding {}

/* -------------------------------------------------------------------------- */
/*                              full path imports                             */
/* -------------------------------------------------------------------------- */

// export { WebGLRenderer } from 'three/src/renderers/WebGLRenderer.js';
// export { WebGLRenderTarget } from 'three/src/renderers/WebGLRenderTarget.js';
// export { WebGLCubeRenderTarget } from 'three/src/renderers/WebGLCubeRenderTarget.js';
// export { ShaderLib } from 'three/src/renderers/shaders/ShaderLib.js';
// export { UniformsLib } from 'three/src/renderers/shaders/UniformsLib.js';
// export { UniformsUtils } from 'three/src/renderers/shaders/UniformsUtils.js';
// export { Uniform } from 'three/src/core/Uniform.js';
// export { ShaderChunk } from 'three/src/renderers/shaders/ShaderChunk.js';
// export { Scene } from 'three/src/scenes/Scene.js';
// export { Mesh } from 'three/src/objects/Mesh.js';
// export { LineSegments } from 'three/src/objects/LineSegments.js';
// export { Line } from 'three/src/objects/Line.js';
// export { CubeTexture } from 'three/src/textures/CubeTexture.js';
// export { CanvasTexture } from 'three/src/textures/CanvasTexture.js';
// export { Group } from 'three/src/objects/Group.js';
// export { Material } from 'three/src/materials/Material.js';
// export { MeshNormalMaterial } from 'three/src/materials/MeshNormalMaterial.js';
// export { MeshToonMaterial } from 'three/src/materials/MeshToonMaterial.js';
// export { MeshPhongMaterial } from 'three/src/materials/MeshPhongMaterial.js';
// export { MeshPhysicalMaterial } from 'three/src/materials/MeshPhysicalMaterial.js';
// export { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial.js';
// export { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial.js';
// export { MeshLambertMaterial } from 'three/src/materials/MeshLambertMaterial.js';
// export { RawShaderMaterial } from 'three/src/materials/RawShaderMaterial.js';
// export { LineDashedMaterial } from 'three/src/materials/LineDashedMaterial.js';
// export { SpriteMaterial } from 'three/src/materials/SpriteMaterial.js';
// export { LineBasicMaterial } from 'three/src/materials/LineBasicMaterial.js';
// export { Loader } from 'three/src/loaders/Loader.js';
// export { LoadingManager, DefaultLoadingManager } from 'three/src/loaders/LoadingManager.js';
// export { DefaultLoadingManager } from 'three/src/loaders/DefaultLoadingManager.js';
// export { FileLoader } from 'three/src/loaders/FileLoader.js';
// export { TextureLoader } from 'three/src/loaders/TextureLoader.js';
// export { DataTexture } from 'three/src/textures/DataTexture.js';
// export { Texture } from 'three/src/textures/Texture.js';
// export { CompressedTexture } from 'three/src/textures/CompressedTexture.js';
// export { Sprite } from 'three/src/objects/Sprite.js';
// export { SpotLightShadow } from 'three/src/lights/SpotLightShadow.js';
// export { SpotLight } from 'three/src/lights/SpotLight.js';
// export { SpotLightHelper } from 'three/src/helpers/SpotLightHelper.js';
// export { CameraHelper } from 'three/src/helpers/CameraHelper.js';
// export { PointLight } from 'three/src/lights/PointLight.js';
// export { DirectionalLight } from 'three/src/lights/DirectionalLight.js';
// export { AmbientLight } from 'three/src/lights/AmbientLight.js';
// export { LightShadow } from 'three/src/lights/LightShadow.js';
// export { Camera } from 'three/src/cameras/Camera.js';
// export { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera.js';
// export { OrthographicCamera } from 'three/src/cameras/OrthographicCamera.js';
// export { BufferGeometry } from 'three/src/core/BufferGeometry.js';
// export { PlaneGeometry } from 'three/src/geometries/PlaneGeometry.js';
// export { IcosahedronGeometry } from 'three/src/geometries/IcosahedronGeometry.js';
// export { LatheGeometry } from 'three/src/geometries/LatheGeometry.js';
// export { ExtrudeGeometry } from 'three/src/geometries/ExtrudeGeometry.js';
// export { CircleGeometry } from 'three/src/geometries/CircleGeometry.js';
// export { BoxGeometry } from 'three/src/geometries/BoxGeometry.js';
// export { ConeGeometry } from 'three/src/geometries/ConeGeometry.js';
// export { CylinderGeometry } from 'three/src/geometries/CylinderGeometry.js';
// export { OctahedronGeometry } from 'three/src/geometries/OctahedronGeometry.js';
// export { TorusGeometry } from 'three/src/geometries/TorusGeometry.js';
// export { SphereGeometry } from 'three/src/geometries/SphereGeometry.js';
// export * from 'three/src/core/BufferAttribute.js';
// export { Face3 } from 'three/src/core/Face3.js';
// export { Object3D } from 'three/src/core/Object3D.js';
// export { Raycaster } from 'three/src/core/Raycaster.js';
// export { Triangle } from 'three/src/math/Triangle.js';
// export { _Math as Math } from 'three/src/math/Math.js';
// export { Spherical } from 'three/src/math/Spherical.js';
// export { Cylindrical } from 'three/src/math/Cylindrical.js';
// export { Plane } from 'three/src/math/Plane.js';
// export { Frustum } from 'three/src/math/Frustum.js';
// export { Sphere } from 'three/src/math/Sphere.js';
// export { Ray } from 'three/src/math/Ray.js';
// export { Matrix4 } from 'three/src/math/Matrix4.js';
// export { Matrix3 } from 'three/src/math/Matrix3.js';
// export { Box3 } from 'three/src/math/Box3.js';
// export { Box2 } from 'three/src/math/Box2.js';
// export { Line3 } from 'three/src/math/Line3.js';
// export { Euler } from 'three/src/math/Euler.js';
// export { Vector4 } from 'three/src/math/Vector4.js';
// export { Vector3 } from 'three/src/math/Vector3.js';
// export { Vector2 } from 'three/src/math/Vector2.js';
// export { Quaternion } from 'three/src/math/Quaternion.js';
// export { Color } from 'three/src/math/Color.js';
// export { GridHelper } from 'three/src/helpers/GridHelper.js';
// export { Box3Helper } from 'three/src/helpers/Box3Helper.js';
// export { AxesHelper } from 'three/src/helpers/AxesHelper.js';
// export * from 'three/src/constants.js';
// export { InstancedBufferGeometry } from 'three/src/core/InstancedBufferGeometry.js';
// export { InstancedInterleavedBuffer } from 'three/src/core/InstancedInterleavedBuffer.js';
// export { InterleavedBufferAttribute } from 'three/src/core/InterleavedBufferAttribute.js';
// export { InterleavedBuffer } from 'three/src/core/InterleavedBuffer.js';
// export { ShaderMaterial } from 'three/src/materials/ShaderMaterial.js';
// export { WireframeGeometry } from 'three/src/geometries/WireframeGeometry.js';
// export { Path } from 'three/src/extras/core/Path.js';
// export { NumberKeyframeTrack } from 'three/src/animation/tracks/NumberKeyframeTrack.js';
// export { AnimationClip } from 'three/src/animation/AnimationClip.js';
// export { VectorKeyframeTrack } from 'three/src/animation/tracks/VectorKeyframeTrack.js';
// export { BooleanKeyframeTrack } from 'three/src/animation/tracks/BooleanKeyframeTrack.js';
// export { ColorKeyframeTrack } from 'three/src/animation/tracks/ColorKeyframeTrack.js';
// export { AnimationMixer } from 'three/src/animation/AnimationMixer.js';
// export { Bone } from 'three/src/objects/Bone.js';
// export { EventDispatcher } from 'three/src/core/EventDispatcher.js';
// export { EllipseCurve } from 'three/src/extras/curves/EllipseCurve.js';
// export { Curve } from 'three/src/extras/core/Curve.js';
// export { MathUtils } from 'three/src/math/MathUtils.js';
// export { StereoCamera } from 'three/src/cameras/StereoCamera.js';
// export { Points } from 'three/src/objects/Points.js';
// export { PropertyBinding } from 'three/src/animation/PropertyBinding.js';
// export { SphericalHarmonics3 } from 'three/src/math/SphericalHarmonics3.js';
// export { LightProbe } from 'three/src/lights/LightProbe.js';
// export { DataUtils } from 'three/src/extras/DataUtils.js';
// export { LoaderUtils } from 'three/src/loaders/LoaderUtils.js';
// export class Skeleton {}
// export class SkinnedMesh {}
// export { QuaternionKeyframeTrack } from 'three/src/animation/tracks/QuaternionKeyframeTrack.js';
// export { CompressedTextureLoader } from 'three/src/loaders/CompressedTextureLoader.js';
// export { DataTextureLoader } from 'three/src/loaders/DataTextureLoader.js';
// export { BufferGeometryLoader } from 'three/src/loaders/BufferGeometryLoader.js';
// export { ShapePath } from 'three/src/extras/core/ShapePath.js';
// export { InstancedMesh } from 'three/src/objects/InstancedMesh.js';
// export { InstancedBufferAttribute } from 'three/src/core/InstancedBufferAttribute.js';
// export { Interpolant } from 'three/src/math/Interpolant.js';
// export { ImageBitmapLoader } from 'three/src/loaders/ImageBitmapLoader.js';
// export { PointsMaterial } from 'three/src/materials/PointsMaterial.js';
// export { LineLoop } from 'three/src/objects/LineLoop.js';
// export { ShapeUtils } from 'three/src/extras/ShapeUtils.js';
// export { Shape } from 'three/src/extras/core/Shape.js';
// export { RectAreaLight } from 'three/src/lights/RectAreaLight.js';
// export { DepthTexture } from 'three/src/textures/DepthTexture.js';
// export { Clock } from 'three/src/core/Clock.js';
// export { MeshDepthMaterial } from 'three/src/materials/MeshDepthMaterial.js';
// export { SkeletonHelper } from 'three/src/helpers/SkeletonHelper.js';
// export { BufferAttribute } from 'three/src/core/BufferAttribute.js';
// export { CubeTextureLoader } from 'three/src/loaders/CubeTextureLoader.js';
// export { MeshDistanceMaterial } from 'three/src/materials/MeshDistanceMaterial.js';
// export { Layers } from 'three/src/core/Layers.js';

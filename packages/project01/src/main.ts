import "./style.css"

import { aspect } from "@example/common"
import {
  AmbientLight,
  AxesHelper,
  BackSide,
  BasicShadowMap,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CameraHelper,
  CapsuleGeometry,
  CylinderGeometry,
  DirectionalLight,
  DirectionalLightHelper,
  DoubleSide,
  ExtrudeGeometry,
  FrontSide,
  HemisphereLight,
  HemisphereLightHelper,
  Mesh,
  MeshBasicMaterial,
  MeshDepthMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  Object3D,
  PCFShadowMap,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  PointLightHelper,
  Points,
  PointsMaterial,
  RectAreaLight,
  Scene,
  Shape,
  ShapeGeometry,
  SphereGeometry,
  SpotLight,
  SpotLightHelper,
  TextureLoader,
  TorusGeometry,
  TorusKnotGeometry,
  WebGLRenderer
} from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js"

const scene = new Scene()

scene.add(new AxesHelper(5))

const camera = new PerspectiveCamera(60, aspect(), 0.1, 100)
camera.position.x = 10
camera.position.y = 10
camera.position.z = 10
camera.lookAt(0, 0, 0)

const light = new DirectionalLight(0xffffff, 5)
light.castShadow = true
light.shadow.camera.top = 20
light.shadow.camera.bottom = -20
light.shadow.camera.right = 20
light.shadow.camera.left = -20
light.shadow.mapSize.set(4096, 4096)
light.position.set(8, 8, 8)
light.lookAt(0, 0, 0)
scene.add(light)
scene.add(new DirectionalLightHelper(light, 1))
scene.add(new CameraHelper(light.shadow.camera))

const ambientLight = new AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

const hemisphereLight = new HemisphereLight(0xb4a912, 0x12f34f, 1)
hemisphereLight.position.set(0, 9, 0)
scene.add(hemisphereLight)
scene.add(new HemisphereLightHelper(hemisphereLight, 1))

const pointLight = new PointLight(0xffffff, 5, 20, 0.5)
pointLight.castShadow = true
pointLight.position.set(-9, 9, -9)
scene.add(pointLight)
scene.add(new PointLightHelper(pointLight, 1))

const rectAreaLight = new RectAreaLight(0xffffff, 5, 10, 1)
rectAreaLight.castShadow = true
rectAreaLight.position.set(-9, 0.5, 9)
rectAreaLight.lookAt(0, 0, 0)
scene.add(rectAreaLight)
scene.add(new RectAreaLightHelper(rectAreaLight))

const spotLightTarget = new Object3D()
spotLightTarget.position.set(2, 0, 2)
scene.add(spotLightTarget)

const spotLight = new SpotLight(0xffffff, 10, 100, Math.PI / 4, 1, 1)
spotLight.castShadow = true
spotLight.position.set(9, 9, -9)
spotLight.target = spotLightTarget
scene.add(spotLight)
scene.add(new SpotLightHelper(spotLight))

const floor = new Mesh(
  new PlaneGeometry(40, 40),
  new MeshStandardMaterial({ color: 0xefefef, side: DoubleSide })
)
floor.rotation.x = -Math.PI / 2
floor.receiveShadow = true
// floor.castShadow = true
scene.add(floor)

const box = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshStandardMaterial({ color: 0xff0000 })
)
box.position.set(0, 0.5, 0)
box.castShadow = true
box.receiveShadow = true
scene.add(box)

const capsule = new Mesh(
  new CapsuleGeometry(1, 1, 20, 20),
  new MeshStandardMaterial({ color: 0xffff00 })
)
capsule.position.set(3, 1.5, 0)
capsule.receiveShadow = true
capsule.castShadow = true
scene.add(capsule)

const cylinder = new Mesh(
  new CylinderGeometry(1, 1, 2),
  new MeshStandardMaterial({ color: 0x00ff00 })
)
cylinder.position.set(-3, 1, 0)
cylinder.receiveShadow = true
cylinder.castShadow = true
scene.add(cylinder)

const torus = new Mesh(
  new TorusGeometry(1, 0.5),
  new MeshStandardMaterial({ color: 0x0000ff })
)
torus.receiveShadow = true
torus.castShadow = true
torus.position.set(0, 1.5, 3)
scene.add(torus)

const sphere = new Mesh(
  new SphereGeometry(1, 32, 32),
  new MeshStandardMaterial({ color: 0x98daaf })
)
sphere.receiveShadow = true
sphere.castShadow = true
sphere.position.set(0, 1.5, 6)
scene.add(sphere)

const starShape = new Shape()
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    const index = i / 2
    const theta = ((18 + 72 * index) * Math.PI) / 180
    if (index === 0) {
      starShape.moveTo(2 * Math.cos(theta), 2 * Math.sin(theta))
    }
    starShape.lineTo(2 * Math.cos(theta), 2 * Math.sin(theta))
  }
  if (i % 2 === 1) {
    const index = (i - 1) / 2
    const theta = ((54 + 72 * index) * Math.PI) / 180
    starShape.lineTo(Math.cos(theta), Math.sin(theta))
  }
}

const star = new Mesh(
  new ShapeGeometry(starShape),
  new MeshStandardMaterial({ color: 0xff00ff, side: DoubleSide })
)
star.castShadow = true
// star.receiveShadow = true
star.position.set(0, 2, -3)
scene.add(star)

const star3D = new Mesh(
  new ExtrudeGeometry(starShape, {
    steps: 1,
    depth: 0.2,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.3,
    bevelSegments: 100
  }),
  new MeshStandardMaterial({ color: 0x0ddaaf })
)
star3D.castShadow = true
star3D.receiveShadow = true
star3D.position.set(0, 2, -6)
scene.add(star3D)

const positions = new Float32Array(1000 * 3)
for (let i = 0; i < positions.length / 3; i++) {
  const x = Math.random() - 0.5
  const y = Math.random() - 0.5
  const z = Math.random() - 0.5
  positions[i * 3] = x
  positions[i * 3 + 1] = y
  positions[i * 3 + 2] = z
}

const bufferGeometry = new BufferGeometry()
bufferGeometry.setAttribute("position", new BufferAttribute(positions, 3))
const randomPoints = new Points(
  bufferGeometry,
  new PointsMaterial({ color: 0xffffff, size: 0.05 })
)
randomPoints.castShadow = true
randomPoints.receiveShadow = true
randomPoints.position.set(0, 3, 0)
scene.add(randomPoints)

const spherePoints = new Points(
  new SphereGeometry(1, 32, 32),
  new PointsMaterial({ color: 0xffffff, size: 0.05 })
)
spherePoints.position.set(0, 6, 0)
spherePoints.castShadow = true
spherePoints.receiveShadow = true
scene.add(spherePoints)

const frontSideBox = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshStandardMaterial({
    color: 0x00ffff,
    side: FrontSide
  })
)
frontSideBox.position.set(-10, 0.5, 0)
frontSideBox.receiveShadow = true
frontSideBox.castShadow = true
scene.add(frontSideBox)

const backSideBox = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshStandardMaterial({
    color: 0x00ff00,
    side: BackSide
  })
)
backSideBox.position.set(-8, 0.51, 0) // floor mesh 와의 z fighting 방지를 위해 y 축 값을 조금 다르게 수정
backSideBox.receiveShadow = true
// backSideBox.castShadow = true
scene.add(backSideBox)

const doubleSideBox = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshStandardMaterial({
    color: 0xffff00,
    side: DoubleSide
  })
)
doubleSideBox.position.set(-6, 0.51, 0) // floor mesh 와의 z fighting 방지를 위해 y 축 값을 조금 다르게 수정
doubleSideBox.receiveShadow = true
// doubleSideBox.castShadow = true
scene.add(doubleSideBox)

const torusKnotStandard = new Mesh(
  new TorusKnotGeometry(0.5, 0.15, 100, 20),
  new MeshStandardMaterial({
    color: 0xff0000,
    roughness: 0.5,
    metalness: 1
  })
)
torusKnotStandard.castShadow = true
torusKnotStandard.receiveShadow = true
torusKnotStandard.position.set(6, 1, 0)
scene.add(torusKnotStandard)

const torusKnotLambert = new Mesh(
  new TorusKnotGeometry(0.5, 0.15, 100, 20),
  new MeshLambertMaterial({
    color: 0xff0000,
    emissive: 0x00ff00,
    emissiveIntensity: 0.2
  })
)
torusKnotLambert.castShadow = true
torusKnotLambert.receiveShadow = true
torusKnotLambert.position.set(8, 1, 0)
scene.add(torusKnotLambert)

const torusKnotPhong = new Mesh(
  new TorusKnotGeometry(0.5, 0.15, 100, 20),
  new MeshPhongMaterial({
    color: 0xff0000,
    emissive: 0x00ff00,
    emissiveIntensity: 0.2,
    specular: 0x0000ff,
    shininess: 100
  })
)
torusKnotPhong.castShadow = true
torusKnotPhong.receiveShadow = true
torusKnotPhong.position.set(10, 1, 0)
scene.add(torusKnotPhong)

const torusKnotBasic = new Mesh(
  new TorusKnotGeometry(0.5, 0.15, 100, 20),
  new MeshBasicMaterial({
    color: 0xff0000
  })
)
torusKnotBasic.castShadow = true
torusKnotBasic.receiveShadow = true
torusKnotBasic.position.set(6, 1, 2)
scene.add(torusKnotBasic)

const torusKnotDepth = new Mesh(
  new TorusKnotGeometry(0.5, 0.15, 100, 20),
  new MeshDepthMaterial({
    opacity: 0.5
  })
)
torusKnotDepth.castShadow = true
torusKnotDepth.receiveShadow = true
torusKnotDepth.position.set(8, 1, 2)
scene.add(torusKnotDepth)

const textureLoader = new TextureLoader()
textureLoader.load("/texture.jpg", (texture) => {
  console.log(texture)
  const textureMesh = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshStandardMaterial({
      map: texture
    })
  )
  textureMesh.position.set(0, 0.5, 8)
  textureMesh.castShadow = true
  textureMesh.receiveShadow = true
  scene.add(textureMesh)
})

const renderer = new WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
// shadowMap 성능순 BasicShadowMap < PCFShadowMap < PCFSoftShadowMap
renderer.shadowMap.type = BasicShadowMap
renderer.shadowMap.type = PCFShadowMap
renderer.shadowMap.type = PCFSoftShadowMap
document.body.appendChild(renderer.domElement)

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.enableDamping = true
orbitControls.dampingFactor = 0.03

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = aspect()
  camera.updateProjectionMatrix()
})

const render = () => {
  torusKnotBasic.rotation.set(
    torusKnotBasic.rotation.x + 0.01,
    torusKnotBasic.rotation.y + 0.01,
    torusKnotBasic.rotation.z + 0.01
  )
  torusKnotStandard.rotation.set(
    torusKnotStandard.rotation.x + 0.01,
    torusKnotStandard.rotation.y + 0.01,
    torusKnotStandard.rotation.z + 0.01
  )
  torusKnotLambert.rotation.set(
    torusKnotLambert.rotation.x + 0.01,
    torusKnotLambert.rotation.y + 0.01,
    torusKnotLambert.rotation.z + 0.01
  )
  torusKnotPhong.rotation.set(
    torusKnotPhong.rotation.x + 0.01,
    torusKnotPhong.rotation.y + 0.01,
    torusKnotPhong.rotation.z + 0.01
  )
  torusKnotDepth.rotation.set(
    torusKnotDepth.rotation.x + 0.01,
    torusKnotDepth.rotation.y + 0.01,
    torusKnotDepth.rotation.z + 0.01
  )
  orbitControls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

requestAnimationFrame(render)

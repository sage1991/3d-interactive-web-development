import "./style.css"

import { aspect } from "@example/common"
import {
  AxesHelper,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CameraHelper,
  CapsuleGeometry,
  CylinderGeometry,
  DirectionalLight,
  DirectionalLightHelper,
  ExtrudeGeometry,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Scene,
  Shape,
  ShapeGeometry,
  SphereGeometry,
  TorusGeometry,
  WebGLRenderer
} from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const scene = new Scene()

scene.add(new AxesHelper(5))

const camera = new PerspectiveCamera(60, aspect(), 0.1, 100)
camera.position.x = 10
camera.position.y = 10
camera.position.z = 10
camera.lookAt(0, 0, 0)

const light = new DirectionalLight(0xffffff, 5)
light.castShadow = true
light.shadow.camera.top = 10
light.shadow.camera.bottom = -10
light.shadow.camera.right = 10
light.shadow.camera.left = -10
light.position.set(8, 8, 8)
light.lookAt(0, 0, 0)
scene.add(light)

scene.add(new DirectionalLightHelper(light, 0.1))
scene.add(new CameraHelper(light.shadow.camera))

const floor = new Mesh(
  new PlaneGeometry(20, 20),
  new MeshStandardMaterial({ color: 0xefefef })
)
floor.rotation.x = -Math.PI / 2
floor.receiveShadow = true
floor.castShadow = true
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
  new MeshStandardMaterial({ color: 0xff00ff })
)
star.castShadow = true
star.receiveShadow = true
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
scene.add(spherePoints)
spherePoints.castShadow = true
spherePoints.receiveShadow = true

const renderer = new WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
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
  renderer.render(scene, camera)
  orbitControls.update()
  requestAnimationFrame(render)
}

requestAnimationFrame(render)

import "./style.css"

import { aspect, isMesh } from "@example/common"
import {
  AnimationMixer,
  AxesHelper,
  Clock,
  DoubleSide,
  LoopPingPong,
  Mesh,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Raycaster,
  RectAreaLight,
  Scene,
  SpotLight,
  Vector2,
  Vector3,
  WebGLRenderer
} from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

const root = document.body

const scene = new Scene()
scene.add(new AxesHelper(10))

const light = new SpotLight(0xffffff, 10, undefined, Math.PI / 6, 1, 0.5)
light.position.set(0, 10, 0)
light.castShadow = true
light.shadow.mapSize.set(4096, 4096)
scene.add(light)

const positions: [x: number, y: number, z: number][] = [
  [20, 0.5, 0],
  [-20, 0.5, 0],
  [0, 0.5, 20],
  [0, 0.5, -20]
]
positions.forEach((position) => {
  const rectAreaLight = new RectAreaLight(0x0000ff, 1, 40, 1)
  rectAreaLight.position.set(...position)
  rectAreaLight.lookAt(0, 0, 0)
  scene.add(rectAreaLight)
})

const floor = new Mesh(
  new PlaneGeometry(40, 40),
  new MeshStandardMaterial({
    color: 0xffffff,
    side: DoubleSide
  })
)
floor.name = "floor"
floor.rotation.set(Math.PI / 2, 0, 0)
floor.receiveShadow = true
scene.add(floor)

const loader = new GLTFLoader()
const dancer = await loader.loadAsync("/dancer.glb")
dancer.scene.position.set(0, 1.66, 0)
dancer.scene.scale.set(0.02, 0.02, 0.02)
dancer.scene.receiveShadow = true
dancer.scene.castShadow = true
dancer.scene.traverse((object) => {
  if (isMesh(object)) {
    object.castShadow = true
    object.receiveShadow = true
  }
})
scene.add(dancer.scene)

light.target = dancer.scene

const mixer = new AnimationMixer(dancer.scene)
const actions = dancer.animations.map((animation) => {
  const action = mixer.clipAction(animation)
  action.setLoop(LoopPingPong, Infinity)
  return action
})

const destination = new Vector3(0, 1.66, 0)
const rayCaster = new Raycaster()
root.addEventListener("mousedown", (e: MouseEvent) => {
  if (e.button !== 2) {
    return
  }
  const { clientX, clientY } = e
  const x = (2 * clientX) / window.innerWidth - 1
  const y = 1 - (2 * clientY) / window.innerHeight
  rayCaster.setFromCamera(new Vector2(x, y), camera)
  const intersections = rayCaster.intersectObjects(scene.children)
  const floor = intersections.find(
    (intersection) => intersection.object.name === "floor"
  )
  floor && destination.copy(floor.point)
  destination.setY(1.66)
})

const camera = new PerspectiveCamera(60, aspect())
camera.aspect = aspect()
camera.position.set(20, 20, 20)
camera.lookAt(0, 0, 0)

const controls = new OrbitControls(camera, root)
controls.enableDamping = true

const renderer = new WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap
root.appendChild(renderer.domElement)

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = aspect()
  camera.updateProjectionMatrix()
})

const delta = new Vector3()

const clock = new Clock()
const render = () => {
  dancer.scene.lookAt(destination)
  delta
    .subVectors(destination, dancer.scene.position)
    .normalize()
    .multiplyScalar(0.05)
  const isMove =
    Math.abs(dancer.scene.position.x - destination.x) > 0.05 &&
    Math.abs(dancer.scene.position.z - destination.z) > 0.05
  if (isMove) {
    dancer.scene.position.x += delta.x
    dancer.scene.position.z += delta.z
    actions.forEach((action, index) => {
      if (index !== 3 && action.isRunning()) {
        action.stop()
      }
      if (index === 3 && !action.isRunning()) {
        action.play()
      }
    })
  }
  if (!isMove) {
    actions.forEach((action, index) => {
      if (index !== 4 && action.isRunning()) {
        action.stop()
      }
      if (index === 4 && !action.isRunning()) {
        action.play()
      }
    })
  }
  controls.update()
  mixer.update(clock.getDelta())
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

requestAnimationFrame(render)

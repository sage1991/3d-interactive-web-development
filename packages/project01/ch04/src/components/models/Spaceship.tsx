import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import { forwardRef } from "react"
import { Object3D, Object3DEventMap } from "three"

const MODEL_PATH = "/models/spaceship.glb"

export const Spaceship = forwardRef<Object3D<Object3DEventMap>>((_, ref) => {
  const { scene } = useGLTF(MODEL_PATH)
  return <animated.primitive ref={ref} object={scene} scale={1} />
})

useGLTF.preload(MODEL_PATH)

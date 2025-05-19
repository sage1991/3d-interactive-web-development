import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import { FC } from "react"

const MODEL_PATH = "/models/earth.glb"

export const Earth: FC = () => {
  const { scene } = useGLTF(MODEL_PATH)
  return (
    <animated.primitive object={scene} scale={0.02} position={[0, 0, -100]} />
  )
}

useGLTF.preload(MODEL_PATH)

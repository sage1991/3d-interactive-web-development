import { animated } from "@react-spring/three"
import { useGLTF } from "@react-three/drei"
import { FC } from "react"

const MODEL_PATH = "/models/sun.glb"

export const Sun: FC = () => {
  const { scene } = useGLTF(MODEL_PATH)
  return (
    <animated.primitive
      object={scene}
      scale={10}
      position={[400, -200, -500]}
    />
  )
}

useGLTF.preload(MODEL_PATH)

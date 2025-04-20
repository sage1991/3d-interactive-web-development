import { useAnimations, useGLTF } from "@react-three/drei"
import { FC, useEffect, useRef } from "react"
import { Object3D } from "three"

export const Dancer: FC = () => {
  const dancerRef = useRef<Object3D>(null)
  const { scene, animations } = useGLTF("/models/dancer.glb")
  const { actions } = useAnimations(animations, dancerRef)

  useEffect(() => {
    actions.wave?.play()
  }, [actions])

  return <primitive ref={dancerRef} object={scene} scale={0.05} />
}

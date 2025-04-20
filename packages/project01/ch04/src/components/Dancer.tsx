import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { FC, useEffect, useRef } from "react"
import { Object3D } from "three"

export const Dancer: FC = () => {
  const dancerRef = useRef<Object3D>(null)
  const { scene, animations } = useGLTF("/models/dancer.glb")
  const { actions } = useAnimations(animations, dancerRef)
  const scroll = useScroll()

  useFrame(() => {
    console.log(scroll.offset)
  })

  useEffect(() => {
    actions.wave?.play()
  }, [actions])

  return <primitive ref={dancerRef} object={scene} scale={0.05} />
}

import { useAnimations, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { FC, useEffect, useRef } from "react"
import { Object3D } from "three"

import { useUIStore } from "../stores"
import { Loader } from "./Loader"

export const Dancer: FC = () => {
  const isLoading = useUIStore(({ isLoading }) => isLoading)
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

  if (isLoading) {
    return <Loader />
  }

  return <primitive ref={dancerRef} object={scene} scale={0.05} />
}

import { isMesh } from "@common/utils"
import { useAnimations, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react"
import { LoopPingPong, Object3D } from "three"

const ANIMATION_LIST = [
  "breakdance01",
  "breakdanceFootworkToIdle",
  "breakdancingEnd",
  "hiphop01",
  "hiphop02",
  "twerk",
  "uprock",
  "wave",
  "windmill"
]

export const GlbModel: FC = () => {
  const dancerRef = useRef<Object3D>(null)
  const { scene, animations } = useGLTF("/dancer.glb")
  const { actions } = useAnimations(animations, dancerRef)
  const [animationType, setAnimationType] = useState<string>(ANIMATION_LIST[0])

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (isMesh(obj)) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene, actions])

  useEffect(() => {
    actions[animationType]?.setLoop(LoopPingPong, Infinity).fadeIn(0.5).play()
    return () => {
      actions[animationType]?.fadeOut(0.5).stop()
    }
  }, [actions, animationType])

  useFrame(() => {
    if (dancerRef.current) {
      dancerRef.current.rotation.y += 0.02
    }
  })

  const onClick = () => {
    setAnimationType((prevType) => {
      const index = ANIMATION_LIST.findIndex((type) => type === prevType)
      return ANIMATION_LIST[index + 1] ?? ANIMATION_LIST[0]
    })
  }

  const onPointerUp = () => {
    console.log("pointer up")
  }

  const onPointerDown = () => {
    console.log("pointer down")
  }

  return (
    <>
      <primitive
        ref={dancerRef}
        object={scene}
        scale={0.01}
        position={[7, 0.8, 0]}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
        onClick={onClick}
      />
    </>
  )
}

import { useAnimations, useGLTF } from "@react-three/drei"
import { useGraph } from "@react-three/fiber"
import { FC, JSX, useEffect, useMemo, useRef, useState } from "react"
import {
  AnimationClip,
  Bone,
  Group,
  LoopPingPong,
  MeshStandardMaterial,
  SkinnedMesh
} from "three"
import { GLTF, SkeletonUtils } from "three-stdlib"

type ActionName =
  | "breakdance01"
  | "breakdancingEnd"
  | "breakdanceFootworkToIdle"
  | "uprock"
  | "windmill"
  | "wave"
  | "hiphop01"
  | "twerk"
  | "hiphop02"

interface GLTFAction extends AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Ch03: SkinnedMesh
    mixamorigHips: Bone
  }
  materials: {
    Ch03_Body: MeshStandardMaterial
  }
  animations: GLTFAction[]
}

const ANIMATION_LIST: ActionName[] = [
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

export const Dancer: FC<JSX.IntrinsicElements["group"]> = ({
  scale = 0.01,
  position = [7, 0.8, 2],
  ...rest
}) => {
  const group = useRef<Group>(null)
  const { scene, animations } = useGLTF("/dancer.glb")
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone) as unknown as GLTFResult
  const { actions } = useAnimations<GLTFAction>(
    animations as GLTFAction[],
    group
  )
  const [animationType, setAnimationType] = useState<ActionName>(
    ANIMATION_LIST[0]
  )

  useEffect(() => {
    actions[animationType]?.setLoop(LoopPingPong, Infinity).fadeIn(0.5).play()
    return () => {
      actions[animationType]?.fadeOut(0.5).stop()
    }
  }, [actions, animationType])

  const onClick = () => {
    setAnimationType((prevType) => {
      const index = ANIMATION_LIST.findIndex((type) => type === prevType)
      return ANIMATION_LIST[index + 1] ?? ANIMATION_LIST[0]
    })
  }

  return (
    <group
      {...rest}
      ref={group}
      dispose={null}
      scale={scale}
      position={position}
      onClick={onClick}
    >
      <group name="AuxScene">
        <group position={[0, -82.942, -1.295]}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="Ch03"
            geometry={nodes.Ch03.geometry}
            material={materials.Ch03_Body}
            skeleton={nodes.Ch03.skeleton}
          >
            <meshToonMaterial args={[{ color: 0x049ef4 }]} />
          </skinnedMesh>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("/dancer.glb")

import { aspect } from "@common/utils"
import { PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { FC } from "react"
import { Color } from "three"

import { Controls } from "./Controls.tsx"
import { Dancer } from "./generated/Dancer.tsx"
import { GlbModel } from "./GLBModel.tsx"
import { Lights } from "./Lights.tsx"
import { Meshes } from "./Meshes.tsx"
import { PostProcessor } from "./PostProcessor.tsx"

export const MainCanvas: FC = () => {
  return (
    <Canvas
      gl={{ antialias: true }}
      shadows="soft"
      scene={{ background: new Color(0x000000) }}
    >
      <PerspectiveCamera
        args={[60, aspect(), 0.1, 100]}
        position={[5, 5, 5]}
        makeDefault
      />
      <Controls />
      <Lights />
      <Meshes />
      <GlbModel />
      <Dancer />
      <PostProcessor />
    </Canvas>
  )
}

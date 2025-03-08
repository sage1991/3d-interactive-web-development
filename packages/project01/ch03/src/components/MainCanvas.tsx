import { aspect } from "@common/utils"
import { Canvas } from "@react-three/fiber"
import { FC } from "react"
import { Color } from "three"

import { Controls } from "./Controls.tsx"
import { Lights } from "./Lights.tsx"
import { Meshes } from "./Meshes.tsx"

export const MainCanvas: FC = () => {
  return (
    <Canvas
      gl={{ antialias: true }}
      shadows="soft"
      camera={{
        fov: 60,
        aspect: aspect(),
        near: 0.1,
        far: 100,
        position: [5, 5, 5]
      }}
      scene={{ background: new Color(0x000000) }}
    >
      <Controls />
      <Lights />
      <Meshes />
    </Canvas>
  )
}

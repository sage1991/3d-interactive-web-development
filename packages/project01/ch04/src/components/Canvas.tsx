import { aspect } from "@common/utils"
import { ScrollControls } from "@react-three/drei"
import { Canvas as ReactThreeFiberCanvas } from "@react-three/fiber"
import { FC, Suspense } from "react"
import { Color } from "three"

import { Dancer } from "./Dancer"
import { Loader } from "./Loader"

const background = new Color(0x000000)

export const Canvas: FC = () => {
  return (
    <ReactThreeFiberCanvas
      id="canvas"
      gl={{ antialias: true }}
      shadows="soft"
      camera={{
        fov: 30,
        aspect: aspect(),
        near: 0.01,
        far: 1000,
        position: [0, 6, 12]
      }}
      scene={{ background }}
    >
      <ambientLight intensity={2} />
      <ScrollControls pages={8} damping={0.25}>
        <Suspense fallback={<Loader />}>
          <Dancer />
        </Suspense>
      </ScrollControls>
    </ReactThreeFiberCanvas>
  )
}

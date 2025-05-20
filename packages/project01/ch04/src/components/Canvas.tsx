import { aspect } from "@common/utils"
import { ScrollControls } from "@react-three/drei"
import { Canvas as ReactThreeFiberCanvas } from "@react-three/fiber"
import { Bloom, EffectComposer } from "@react-three/postprocessing"
import { FC, Suspense } from "react"
import { Color } from "three"

import { CameraConfig } from "./Camera/CameraConfig.tsx"
import { MovingDom } from "./dom/MovingDOM.tsx"
import { Loader } from "./Loader"
import { Earth } from "./models/Earth.tsx"
import { Sun } from "./models/Sun.tsx"

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
        position: [10, 10, 20]
      }}
      scene={{ background }}
    >
      <ambientLight intensity={2} />
      <Suspense fallback={<Loader />}>
        <ScrollControls pages={3} damping={0.25}>
          <CameraConfig />
          <MovingDom />
          <Sun />
          <Earth />
        </ScrollControls>
      </Suspense>
      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.2} mipmapBlur />
      </EffectComposer>
      {/*<axesHelper args={[5]} />*/}
    </ReactThreeFiberCanvas>
  )
}

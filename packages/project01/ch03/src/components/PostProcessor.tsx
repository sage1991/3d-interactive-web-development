import { Bloom, EffectComposer } from "@react-three/postprocessing"
import { FC } from "react"

export const PostProcessor: FC = () => {
  return (
    <>
      <EffectComposer>
        <Bloom
          intensity={0.2}
          mipmapBlur
          luminanceThreshold={0.5}
          luminanceSmoothing={0.02}
        />
        {/*<BrightnessContrast brightness={-0.2} contrast={0.5} />*/}
        {/*<DotScreen angle={Math.PI / 6} scale={1} />*/}
        {/*<Glitch*/}
        {/*  delay={[1.5, 3.5] as ComponentProps<typeof Glitch>["delay"]}*/}
        {/*  duration={[0.5, 1.0] as ComponentProps<typeof Glitch>["duration"]}*/}
        {/*  strength={[0.01, 1] as ComponentProps<typeof Glitch>["strength"]}*/}
        {/*/>*/}
        {/*<Grid scale={1} lineWidth={0.1} />*/}
      </EffectComposer>
    </>
  )
}

import { Html, useProgress } from "@react-three/drei"
import { FC } from "react"

import { Background, Container, Progress } from "./Loader.styled"

export const Loader: FC = () => {
  const { progress } = useProgress()
  return (
    <Html center>
      <Background />
      <Container>
        <Progress progress={progress} />
      </Container>
    </Html>
  )
}

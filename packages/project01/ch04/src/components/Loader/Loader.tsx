import { Html, useProgress } from "@react-three/drei"
import { FC } from "react"

import { useUIStore } from "../../stores"
import { Background, Container, EnterButton, Progress } from "./Loader.styled"

export const Loader: FC = () => {
  const { isLoading, finishLoading } = useUIStore()
  const { progress } = useProgress()

  if (!isLoading) {
    return null
  }

  return (
    <Html center>
      <Background />
      <Container>
        <Progress progress={progress} />
        <EnterButton onClick={finishLoading}>Enter</EnterButton>
      </Container>
    </Html>
  )
}

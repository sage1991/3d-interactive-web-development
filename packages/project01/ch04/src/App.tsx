import { FC } from "react"

import { Root } from "./App.styled"
import { Canvas } from "./components/Canvas"

export const App: FC = () => {
  return (
    <Root>
      <Canvas />
    </Root>
  )
}

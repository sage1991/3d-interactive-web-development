import { FC } from "react"

import { Root } from "./App.styled.ts"
import { Canvas } from "./components/Canvas.tsx"

export const App: FC = () => {
  return (
    <Root>
      <Canvas />
    </Root>
  )
}

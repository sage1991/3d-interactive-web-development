import { Scroll } from "@react-three/drei"
import { FC, useRef } from "react"

import { ArticleRoot } from "./MovingDom.styled.ts"

export const MovingDom: FC = () => {
  const article01Ref = useRef<HTMLDivElement>(null)
  const article02Ref = useRef<HTMLDivElement>(null)
  const article03Ref = useRef<HTMLDivElement>(null)

  return (
    <Scroll html>
      <ArticleRoot ref={article01Ref}></ArticleRoot>
      <ArticleRoot ref={article02Ref}></ArticleRoot>
      <ArticleRoot ref={article03Ref}></ArticleRoot>
    </Scroll>
  )
}

import styled from "@emotion/styled"

export const Root = styled.main`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  @supports (width: 100dvw) and (height: 100dvh) {
    width: 100dvw;
    height: 100dvh;
  }
`

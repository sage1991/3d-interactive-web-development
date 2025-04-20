import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const Background = styled.div`
  width: 400px;
  height: 400px;
  background-color: #ff0000;
  border-radius: 50%;
  filter: blur(250px);
`

export const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

export const Progress = styled.div<{ progress: number }>`
  width: 300px;
  height: 20px;
  border: 1px solid #efefef;
  border-radius: 8px;
  overflow: hidden;

  ::after {
    content: "";
    transition: width 200ms;
    display: block;
    width: ${({ progress }) => progress}%;
    height: 100%;
    background-color: #efefef;
  }
`

export const EnterButton = styled.button`
  padding: 8px 18px;
  font-size: 16px;
  animation: ${blink} 1.5s infinite;
  transition:
    background-color 300ms,
    color 300ms;
  outline: none;
  border: 1px solid #efefef;
  border-radius: 8px;
  background-color: transparent;
  color: #efefef;
  cursor: pointer;

  :hover {
    background-color: #efefef;
    color: #ff4800;
  }
`

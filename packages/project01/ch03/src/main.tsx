import "./index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { App } from "./App.tsx"

const root = document.querySelector<HTMLDivElement>("#root")
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

import { Mesh } from "three"

export const isMesh = (object: unknown): object is Mesh =>
  object instanceof Mesh

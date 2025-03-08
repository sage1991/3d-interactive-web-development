import {
  Box,
  Circle,
  Cone,
  Cylinder,
  Plane,
  Sphere,
  Torus,
  TorusKnot
} from "@react-three/drei"
import { FC } from "react"
import { DoubleSide } from "three"

export const Meshes: FC = () => {
  return (
    <>
      <Plane
        args={[40, 40]}
        receiveShadow
        position-y={-0.01}
        rotation-x={-Math.PI / 2}
      >
        <meshStandardMaterial color={0xffffff} side={DoubleSide} />
      </Plane>
      <Box
        args={[1, 1, 1]}
        castShadow
        position-y={0.5}
        material-color={0xff0000}
      />
      <Sphere
        args={[1]}
        castShadow
        position={[0, 1, 3]}
        material-color={0xffff00}
      />
      <Circle
        args={[1]}
        castShadow
        position={[0, 1, -3]}
        material-color="violet"
        material-side={DoubleSide}
      />
      <Cone
        args={[1, 2]}
        castShadow
        position={[3, 1, 3]}
        material-color="brown"
      />
      <Cylinder
        args={[1, 2, 2]}
        castShadow
        position={[3, 1, -3]}
        material-color="pink"
      />
      <Torus
        args={[0.8, 0.2]}
        castShadow
        position={[-3, 1, -3]}
        material-color="teal"
      />
      <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        position={[-3, 1.6, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={0xaaff00} roughness={0.5} metalness={1} />
      </TorusKnot>
      <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        position={[-7, 1.6, 0]}
        castShadow
        receiveShadow
      >
        <meshLambertMaterial
          color={0xffffff}
          emissive={0xff0000}
          emissiveIntensity={0.5}
        />
      </TorusKnot>
      <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        position={[-11, 1.6, 0]}
        castShadow
        receiveShadow
      >
        <meshPhongMaterial
          color={0xffffff}
          emissive={0x0abff0}
          emissiveIntensity={0.5}
          specular={0xff0000}
          shininess={100}
        />
      </TorusKnot>
      <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        position={[-15, 1.6, 0]}
        castShadow
        receiveShadow
      >
        <meshDepthMaterial opacity={0.5} />
      </TorusKnot>
    </>
  )
}

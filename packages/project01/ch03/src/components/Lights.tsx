import { useHelper } from "@react-three/drei"
import { FC, RefObject, useRef } from "react"
import {
  DirectionalLight,
  DirectionalLightHelper,
  HemisphereLight,
  HemisphereLightHelper,
  PointLight,
  PointLightHelper,
  RectAreaLight,
  SpotLight as ThreeSpotLight,
  SpotLightHelper
} from "three"
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js"

export const Lights: FC = () => {
  const directionalLightRef = useRef<DirectionalLight>(null)
  const pointLightRef = useRef<PointLight>(null)
  const hemisphereLightRef = useRef<HemisphereLight>(null)
  const rectAreaLightRef = useRef<RectAreaLight>(null)
  const spotLightRef = useRef<ThreeSpotLight>(null)

  useHelper(
    directionalLightRef as RefObject<DirectionalLight>,
    DirectionalLightHelper,
    0.5,
    0xffffff
  )
  useHelper(
    pointLightRef as RefObject<PointLight>,
    PointLightHelper,
    0.5,
    0xff0000
  )
  useHelper(
    hemisphereLightRef as RefObject<HemisphereLight>,
    HemisphereLightHelper,
    0.5
  )
  useHelper(rectAreaLightRef as RefObject<RectAreaLight>, RectAreaLightHelper)
  useHelper(spotLightRef as RefObject<ThreeSpotLight>, SpotLightHelper)

  return (
    <>
      <ambientLight args={[0xefefef, 0.1]} />
      <directionalLight
        ref={directionalLightRef}
        args={[0xffffff, 1]}
        castShadow={true}
        position={[4, 4, 4]}
        shadow-camera-top={25}
        shadow-camera-right={25}
        shadow-camera-bottom={-25}
        shadow-camera-left={-25}
        shadow-camera-near={0.1}
        shadow-camera-far={1000}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight
        ref={pointLightRef}
        args={[0xff0000, 10, 10, 1]}
        castShadow={true}
        position-y={2}
      />
      <hemisphereLight
        ref={hemisphereLightRef}
        args={[0x00ffff, 0xf00ff0, 0.5]}
        position-y={4}
      />
      <rectAreaLight
        ref={rectAreaLightRef}
        args={[0xffffff, 1, 20, 1]}
        position-y={0.5}
        position-x={10}
        rotation-y={Math.PI / 2}
      />
      <spotLight
        ref={spotLightRef}
        args={[0xffffff, 10, 100, Math.PI / 4, 1, 0.5]}
        castShadow={true}
        position={[-5, 5, -5]}
      />
    </>
  )
}

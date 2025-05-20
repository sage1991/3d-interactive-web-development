import { aspect } from "@common/utils"
import { useSpring } from "@react-spring/three"
import { useScroll } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import gsap from "gsap"
import { FC, useEffect, useMemo, useRef } from "react"
import { Object3D, PerspectiveCamera } from "three"

import { Spaceship } from "../models/Spaceship.tsx"

export const CameraConfig: FC = () => {
  const { camera } = useThree()
  const pivotRef = useRef(new Object3D())
  const spaceshipRef = useRef<Object3D>(null)
  const timeline = useMemo(() => {
    return gsap.timeline({ paused: true })
  }, [])
  const [, api] = useSpring(() => ({
    x: 10,
    y: 100,
    z: 20
  }))
  const scroll = useScroll()

  useEffect(() => {
    api.start({
      y: 10,
      config: { mass: 10, tension: 100, friction: 100 },
      onChange: ({ value: { y } }) => {
        camera.position.y = y
      }
    })
  }, [api, camera])

  useEffect(() => {
    pivotRef.current.add(camera)

    timeline
      .to(pivotRef.current.rotation, {
        y: -Math.PI / 4,
        duration: 10
      })
      .to(pivotRef.current.rotation, {
        y: 0,
        x: Math.PI / 6,
        duration: 10
      })
    if (spaceshipRef.current) {
      timeline
        .to(spaceshipRef.current?.position, {
          z: -100,
          duration: 10
        })
        .to(
          spaceshipRef.current,
          {
            scale: 0,
            duration: 10
          },
          "<"
        )
    }
  }, [camera, timeline])

  useFrame(() => {
    timeline.seek(scroll.offset * timeline.duration())
  })

  useEffect(() => {
    const onResize = () => {
      if (camera instanceof PerspectiveCamera) {
        camera.aspect = aspect()
        camera.updateProjectionMatrix()
      }
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [camera])

  return (
    <>
      <primitive object={pivotRef.current} />
      <Spaceship ref={spaceshipRef} />
    </>
  )
}

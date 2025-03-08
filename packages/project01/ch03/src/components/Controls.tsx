import {
  // FirstPersonControls,
  // FlyControls,
  OrbitControls
  // PointerLockControls,
  // TrackballControls
} from "@react-three/drei"
import { FC } from "react"

export const Controls: FC = () => {
  return (
    <>
      <OrbitControls
        enableDamping
        minPolarAngle={0.25 * Math.PI}
        maxPolarAngle={0.75 * Math.PI}
      />
      {/*<FlyControls movementSpeed={1} rollSpeed={Math.PI / 20} />*/}
      {/*<FirstPersonControls lookSpeed={0.1} movementSpeed={1} lookVertical />*/}
      {/*<PointerLockControls />*/}
      {/*<TrackballControls rotateSpeed={2} zoomSpeed={1.5} panSpeed={0.5} />*/}
    </>
  )
}

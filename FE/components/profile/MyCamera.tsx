import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { LayoutCamera } from 'framer-motion-3d';
import { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';

import roomIndexAtom from 'store/profile/roomIndexAtom';
const CAMERA_POS = [
  { x: 0, y: 10, z: 60 },
  { x: -17, y: 5, z: 4 },
  { x: 0, y: 55, z: 0 },
  { x: 20, y: 15, z: 15 }, //
];
const CAMERA_ANGLE = [
  {
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
  },

  {
    rotateX: 0,
    rotateY: 0.6435011087932845, //desktop view
    rotateZ: 0,
  },
  {
    rotateX: -0.6435011087932843,
    rotateY: 0,
    rotateZ: 0,
  },
  {
    //flowerPot
    rotateX: -0.8259433780253354,
    rotateY: 0.46920842517941325,
    rotateZ: 0.455953684691092,
  },
];
function MyCamera({ router }: { router: any }) {
  const ref = useRef();
  const [isAnimate, setIsAnimate] = useState(true);
  const roomIndex = useRecoilValue(roomIndexAtom);
  useEffect(() => {
    if (roomIndex === 3 && !isAnimate) router.push('/garden');
  }, [isAnimate]);
  // useThree(({ camera }) => {
  //   console.log(camera.rotation);
  // });
  // useFrame(({ camera }) => {
  //   camera.lookAt(0, 25, -40);
  //   console.log(camera.rotation);
  //   // console.log(camera.position);
  // });

  return (
    <>
      {/* <OrbitControls target={[0, 10, 0]} /> */}

      {!isAnimate && (roomIndex === 2 || roomIndex === 0) && (
        <OrbitControls
          minDistance={50}
          maxDistance={80}
          enablePan={false}
          target={[0, roomIndex === 0 ? 10 : 25, roomIndex === 0 ? 0 : -40]}
        />
      )}
      <LayoutCamera
        ref={ref}
        animate={{
          ...CAMERA_POS[roomIndex],
          ...CAMERA_ANGLE[roomIndex],
        }}
        onAnimationStart={() => setIsAnimate(true)}
        onAnimationComplete={() => setIsAnimate(false)}
        transition={{ duration: roomIndex === 3 ? 2 : 1 }}
        far={1500}
        position={[-10, 20, 35]}
        // rotation={[
        //   CAMERA_ANGLE[0].rotateX,
        //   CAMERA_ANGLE[0].rotateY,
        //   CAMERA_ANGLE[0].rotateZ,
        // ]}
      />
    </>
  );
}
export default MyCamera;

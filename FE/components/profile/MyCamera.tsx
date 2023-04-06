import { OrbitControls } from '@react-three/drei';
import { LayoutCamera } from 'framer-motion-3d';
import { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import React, { useEffect } from 'react';

import roomIndexAtom from 'store/profile/roomIndexAtom';
import { useMobile } from '@hooks/useMobile';

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
    rotateX: 0,
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
// eslint-disable-next-line
function MyChildCamera({ router, userId }: { router: any; userId: any }) {
  const isMobile = useMobile();
  const CAMERA_POS = [
    { x: 0, y: 10, z: 60 },
    { x: -17, y: 5, z: 4 },
    { x: 0, y: 25, z: 30 },
    { x: 20, y: 15, z: 5 }, //
  ];
  const ref = useRef();
  const [isAnimate, setIsAnimate] = useState(true);
  const roomIndex = useRecoilValue(roomIndexAtom);
  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    if (roomIndex === 3) {
      id = setTimeout(() => {
        router.push(`/garden/${userId}`);
      }, 500);
    }
    return () => {
      if (id) clearTimeout(id);
    };
  }, [roomIndex, router]);

  return (
    <>
      {!isAnimate && (roomIndex === 2 || roomIndex === 0) && (
        <OrbitControls
          enabled={roomIndex === 2 || roomIndex === 0}
          minDistance={10}
          maxDistance={!isMobile ? 80 : 200}
          enablePan={false}
          target={[
            0,
            roomIndex === 0 ? 10 : roomIndex === 2 ? 25 : 0,
            roomIndex === 0 ? 0 : roomIndex === 2 ? -30 : 0,
          ]}
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
        transition={{ duration: 1 }}
        far={1500}
        position={[0, 10, 60]}
      />
    </>
  );
}
const MyCamera = React.memo(MyChildCamera);
export default MyCamera;

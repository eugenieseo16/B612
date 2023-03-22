import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { LayoutCamera } from 'framer-motion-3d';
import { useRef, useState } from 'react';

function MyCamera({ index }: any) {
  const ref = useRef();
  const [isAnimate, setIsAnimate] = useState(true);
  const CAMERA_POS = [
    { x: [420, 420], y: [300, 300], z: [420, 420] },
    { x: [0, -80], y: [0, -5], z: [0, -54] },
    { x: [420, 10, 10], y: [300, 20, 20], z: [420, -80, -300] },
    { x: [0, 27], y: [0, 1.5], z: [0, 1] }, //
  ];

  const CAMERA_ANGLE = [
    {
      rotateX: -0.6202494859828216,
      rotateY: 0.6830590914963978,
      rotateZ: 0.4235479439953271,
    },
    {
      rotateX: 0,
      rotateY: 1.5707963267948966, //desktop view
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

  return (
    <>
      {!isAnimate && (index === 2 || index === 0) && (
        <OrbitControls target={[0, 0, index === 0 ? 0 : -700]} />
      )}
      <LayoutCamera
        ref={ref}
        animate={{
          ...CAMERA_POS[index],
          ...CAMERA_ANGLE[index],
        }}
        onAnimationStart={() => setIsAnimate(true)}
        onAnimationComplete={e => {
          console.log(e);
          setIsAnimate(false);
        }}
        transition={{ duration: index === 2 ? 2 : 1 }}
        far={1500}
        position={[420, 300, 420]}
        rotation={[
          CAMERA_ANGLE[0].rotateX,
          CAMERA_ANGLE[0].rotateY,
          CAMERA_ANGLE[0].rotateZ,
        ]}
      />
    </>
  );
}
export default MyCamera;

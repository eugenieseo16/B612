import { useFrame, useThree } from '@react-three/fiber';
import { LayoutCamera } from 'framer-motion-3d';

function MyCamera({ index }: any) {
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
  useThree(
    ({
      camera: {
        position: { x, y, z },
      },
    }) => {
      CAMERA_POS.forEach(arr => {
        if (x === 0 && y === 0 && z === 5) return;
        arr.x[0] = x;
        arr.y[0] = y;
        arr.z[0] = z;
      });
    }
  );
  return (
    <>
      <LayoutCamera
        animate={{
          ...CAMERA_POS[index],
          ...CAMERA_ANGLE[index],
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

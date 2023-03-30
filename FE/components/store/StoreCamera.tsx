import { useThree } from '@react-three/fiber';
import { LayoutCamera } from 'framer-motion-3d';
import React from 'react';
import { useRecoilValue } from 'recoil';
import storeIndexAtom from 'store/store/storeIndexAtom';

function StoreCamera() {
  const { index, page } = useRecoilValue(storeIndexAtom);
  const deg = (Math.PI * 2 * index) / 7;
  const deg2 = (Math.PI * 2 * index) / 7;
  const cameraPos = { x: Math.cos(deg) * 3, z: Math.sin(deg) * 3 };
  console.log(deg);
  return (
    <LayoutCamera
      animate={{
        rotateY: 0.1,
        y: 0,
        x: Math.cos(0) * 3,
        z: Math.sin(0) * 3,
      }}
      // animate={{ ...cameraPos, rotateY: -deg - Math.PI / 2 }}
      transition={{ duration: 1 }}
    />
  );
}

export default StoreCamera;

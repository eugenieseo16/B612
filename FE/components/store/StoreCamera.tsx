import { LayoutCamera } from 'framer-motion-3d';
import React from 'react';

function StoreCamera() {
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

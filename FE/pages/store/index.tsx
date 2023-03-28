import { Canvas } from '@react-three/fiber';
import { MotionCanvas } from 'framer-motion-3d';
import React from 'react';

function index() {
  return (
    <div>
      <MotionCanvas style={{ height: '100vh', width: '100%' }}>
        <mesh>
          <sphereGeometry />
          <meshStandardMaterial />
        </mesh>
      </MotionCanvas>
      <Canvas style={{ display: 'none' }}>
        <mesh />
      </Canvas>
    </div>
  );
}

export default index;

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Stars } from '@react-three/drei';

function Square() {
  return (
    <div>
      <Canvas>
        <ambientLight />

        <PerspectiveCamera makeDefault fov={75} position={[0, 0, 5]} />
        <Stars />
      </Canvas>
    </div>
  );
}

export default Square;

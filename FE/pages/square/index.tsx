import React from 'react';
import { Canvas } from '@react-three/fiber';
// import { PerspectiveCamera } from '@react-three/drei';
import { Stars } from '@react-three/drei';

function Square() {
  return (
    <div>
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="navy" position={[0, 0, 5]} />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>

        <Stars />
      </Canvas>
    </div>
  );
}

export default Square;

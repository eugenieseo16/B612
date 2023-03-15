import React from 'react';
import { Canvas } from '@react-three/fiber';
// import { PerspectiveCamera } from '@react-three/drei';
import { Stars } from '@react-three/drei';
import AnimatedBox from '@components/square/AnimatedBox';

function Square() {
  const styles = {
    container: {
      width: '100%',
      height: '100vh',
    },
  } as const;

  return (
    <div style={styles.container}>
      <Canvas>
        <Stars />
        <ambientLight intensity={0.1} />
        <directionalLight color="navy" position={[0, 0, 5]} />
        {/* <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh> */}
        <AnimatedBox />
      </Canvas>
    </div>
  );
}

export default Square;

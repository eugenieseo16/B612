import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// useFrame은 Canvans 안에서만 사용 가능 (executing every Frame)
// animate the cube-> reference the cube and then change properties on it in our render loop
//  -> useRef

const AnimatedBox = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    console.log("Hey, I'm executing every Frame");
    // current reference 가 여기있는지 확인하는 과정을 거친 후, 있다면 로테이션
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
};

export default AnimatedBox;

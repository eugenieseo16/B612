import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import React from 'react';

const Ground: React.FC = () => {
  const normalMap = useTexture('../textures/grass_rock_nor_gl.png');
  const roughnessMap = useTexture('../textures/grass_rock_rough.png');

  return (
    <>
      <mesh rotation-x={Math.PI * -0.5} receiveShadow>
        <planeBufferGeometry args={[300, 300]} />
        <meshStandardMaterial
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          color={'#A0CA33'}
          side={THREE.FrontSide}
        />
      </mesh>
    </>
  );
};

export default Ground;

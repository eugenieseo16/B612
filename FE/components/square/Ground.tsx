import React, { useRef } from 'react';

import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper } from 'three';

const Ground: React.FC = () => {
  return (
    <>
      <mesh rotation-x={Math.PI * -0.5} receiveShadow>
        <planeBufferGeometry args={[300, 300]} />
        <meshStandardMaterial color={'#B0C85B'} />
      </mesh>
    </>
  );
};

export default Ground;

import React, { useRef } from 'react';

import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper } from 'three';

const Lights: React.FC = () => {
  const lightRef = useRef<THREE.DirectionalLight>();

  useHelper(lightRef, DirectionalLightHelper, 5, 'red');
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight ref={lightRef} position={[0, 10, 10]} castShadow />
      <hemisphereLight args={['#194D6F', '#5e9c49', 1]} />
    </>
  );
};

export default Lights;

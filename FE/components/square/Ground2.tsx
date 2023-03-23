import { useLoader } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Ground2 = () => {
  const model = useLoader(GLTFLoader, './ground/ground2.glb');

  return (
    <object3D scale={[0.1, 0.1, 0.1]} position={[0, -7, 0]}>
      <primitive object={model.scene} />
    </object3D>
  );
};

export default Ground2;

// https://jstris.jezevec10.com/?langSwitch=ko

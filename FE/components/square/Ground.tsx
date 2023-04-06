import { useLoader } from '@react-three/fiber';
import React from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Ground = () => {
  const model = useLoader(
    GLTFLoader,
    'https://res.cloudinary.com/dohkkln9r/image/upload/v1680669905/ground.glb'
  );

  return (
    <object3D>
      <primitive object={model.scene} />
    </object3D>
  );
};

export default Ground;

// https://jstris.jezevec10.com/?langSwitch=ko

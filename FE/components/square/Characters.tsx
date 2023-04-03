import { useAnimations } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Characters = () => {
  const model = useLoader(GLTFLoader, './avatar_finn/character1.glb');
  const { actions } = useAnimations(model.animations, model.scene);

  useEffect(() => {
    const action = actions['Take 001'];
    action?.play();
  }, [actions]);
  console.log(model);

  return (
    <object3D>
      <primitive object={model.scene} />
    </object3D>
  );
};

export default Characters;

// https://jstris.jezevec10.com/?langSwitch=ko

import { useAnimations } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Tetris = () => {
  const model = useLoader(GLTFLoader, './tetris/tetris.glb');
  // const { actions } = useAnimations(model.animations, model.scene);

  // useEffect(() => {
  //   const action = actions['Take 001'];
  //   action?.play();
  // }, [actions]);

  return (
    <object3D>
      <primitive object={model.scene} position={[-20, 0, -45]} />
    </object3D>
  );
};

export default Tetris;

// https://jstris.jezevec10.com/?langSwitch=ko
// scale={[0.5, 1, 0.5]}
// rotation={[0, Math.PI / 2, 0]}
//  position={[-20, 0, -45]

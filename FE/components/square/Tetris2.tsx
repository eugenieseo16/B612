import { useAnimations } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import React, { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Tetris2 = () => {
  const model = useLoader(GLTFLoader, './tetris/tetris_animation.glb');
  const { actions } = useAnimations(model.animations, model.scene);

  useEffect(() => {
    const action = actions['Take 001'];
    action?.play();
  }, [actions]);

  return (
    <object3D scale={[40, 40, 40]} position={[5, 0, -2]}>
      <primitive object={model.scene} />
    </object3D>
  );
};

export default Tetris2;

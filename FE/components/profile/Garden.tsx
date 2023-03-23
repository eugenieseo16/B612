import { Center, useGLTF } from '@react-three/drei';
import React from 'react';

function Garden() {
  const garden = useGLTF('/garden_pond/scene.gltf');
  return (
    <>
      <Center scale={8} position={[300, 5, 0]}>
        <primitive object={garden.scene} />
      </Center>
    </>
  );
}

export default Garden;

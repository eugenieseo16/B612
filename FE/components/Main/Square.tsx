import { Center, useGLTF } from '@react-three/drei';
import React from 'react';
import { Box3, Vector3 } from 'three';

function Square() {
  const { scene } = useGLTF(
    'https://res.cloudinary.com/dohkkln9r/image/upload/v1680596386/square.glb'
  );
  const bbox = new Box3().setFromObject(scene);
  const center = bbox.getCenter(new Vector3());
  const size = bbox.getSize(new Vector3());

  const maxAxis = Math.max(size.x, size.y, size.z);
  scene.scale.multiplyScalar(10 / maxAxis);
  bbox.setFromObject(scene);
  bbox.getCenter(center);
  bbox.getSize(size);
  scene.position.copy(center).multiplyScalar(-1);

  return (
    <Center position={[0, -1, 0]}>
      <group>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

export default Square;

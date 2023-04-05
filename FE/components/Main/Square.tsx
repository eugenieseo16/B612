import { useGLTF } from '@react-three/drei';
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
  scene.scale.multiplyScalar(4.5 / maxAxis);
  bbox.setFromObject(scene);
  bbox.getCenter(center);
  bbox.getSize(size);
  scene.position.copy(center).multiplyScalar(-1);
  scene.position.y -= size.y * 0.5;

  return (
    <group>
      <primitive object={scene} />
    </group>
  );
}

export default Square;

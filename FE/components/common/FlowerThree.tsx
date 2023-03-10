import { OrbitControls, useGLTF } from '@react-three/drei';
import React, { useEffect } from 'react';
import { Box3, Vector3 } from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { degToRad } from 'three/src/math/MathUtils';

function FlowerThree({ type }: { type: number }) {
  const flower = useGLTF('/mario_flower/scene.gltf');
  const flowerClone = SkeletonUtils.clone(flower.scene);

  useEffect(() => {
    const bbox = new Box3().setFromObject(flowerClone);
    const cent = bbox.getCenter(new Vector3());

    flowerClone.position.x += flowerClone.position.x - cent.x;
    flowerClone.position.y += flowerClone.position.y - cent.y;
    flowerClone.position.z += flowerClone.position.z - cent.z;
  }, [flowerClone]);

  // const clone = SkeletonUtils.clone(gltf.scene);

  return (
    <>
      <OrbitControls />
      <group scale={0.5} rotation={[0, degToRad(-120), 0]}>
        <primitive object={flowerClone} />
      </group>
    </>
  );
}

export default FlowerThree;

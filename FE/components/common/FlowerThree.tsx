import { Center, Environment, OrbitControls, useGLTF } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import { Box3, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';

const GLTF_URL = [
  'mario_flower/scene.gltf',
  'glowing_flower/scene.gltf',
  'dinosaur/scene.gltf',
];

function FlowerThree({ type }: { type: number }) {
  const grass = useGLTF('/grass/scene.gltf');

  return (
    <>
      <OrbitControls enableZoom={false} maxPolarAngle={degToRad(90)} />
      <Environment background files={'/sky.hdr'} />
      <group scale={3} position={[0, -4, 0]}>
        <primitive object={grass.scene} />
      </group>

      <Flower type={type} />
    </>
  );
}

export default FlowerThree;

function Flower({ type }: { type: number }) {
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(0);

  const flower = useGLTF(GLTF_URL[type]);
  const flowerClone = SkeletonUtils.clone(flower.scene);

  useEffect(() => {
    const bbox = new Box3().setFromObject(flowerClone);
    const tempSize = bbox.getSize(new Vector3());
    const maxAxis = Math.max(tempSize.x, tempSize.y, tempSize.z);
    const newScale = 4 / maxAxis;
    setScale(newScale);
    setHeight(tempSize.y);
  }, [flower]);

  return (
    <Center scale={1} position={[0, height / 2 - 4, 0]}>
      <group rotation={[0, degToRad(-90), 0]}>
        <primitive object={flower.scene} />
      </group>
    </Center>
  );
}

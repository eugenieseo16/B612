import {
  Center,
  Environment,
  OrbitControls,
  Shadow,
  useGLTF,
} from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import { Box3, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

const GLTF_URL = [
  'mario_flower/scene.gltf',
  'glowing_flower/scene.gltf',
  'dinosaur/scene.gltf',
];

function FlowerThree({ type }: { type: number }) {
  const grass = useGLTF('/grass/scene.gltf');
  useEffect(() => {
    grass.scene.traverse(node => (node.receiveShadow = true));
  }, [grass]);

  return (
    <>
      <ambientLight intensity={0.1} />
      <spotLight castShadow position={[-7, 8, 5]} intensity={1} />

      <OrbitControls enableZoom={false} maxPolarAngle={degToRad(90)} />
      <Environment background files={'/sky.hdr'} />
      <Shadow />

      <group scale={3} position={[0, -4, 0]}>
        <primitive object={grass.scene} />
      </group>

      <Flower type={type} />
    </>
  );
}

export default FlowerThree;

function Flower({ type }: { type: number }) {
  const [height, setHeight] = useState(0);

  const flower = useGLTF(GLTF_URL[type]);

  useEffect(() => {
    flower.scene.traverse(node => {
      node.castShadow = true;
    });
    const bbox = new Box3().setFromObject(flower.scene);
    setHeight(bbox.getSize(new Vector3()).y);
  }, [flower]);

  return (
    <Center position={[0, height / 2 - 4, 0]}>
      <group>
        <primitive object={flower.scene} />
      </group>
    </Center>
  );
}

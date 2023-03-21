import {
  Center,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from '@react-three/drei';
import React, { useEffect, useState, useRef } from 'react';
import { Box3, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

const GLTF_URL = [
  'mario_flower/scene.gltf',
  'glowing_flower/scene.gltf',
  'dinosaur/scene.gltf',
];

function FlowerThree({ type }: { type: number }) {
  const ref = useRef();
  const grass = useGLTF('/grass/scene.gltf');
  useEffect(() => {
    grass.scene.traverse(node => (node.receiveShadow = true));
  }, [grass]);

  return (
    <>
      <ambientLight intensity={0.1} />
      <spotLight castShadow position={[-5, 10, 3]} intensity={1.5} />
      <PerspectiveCamera makeDefault position={[0, 10, 10]} ref={ref} />
      <OrbitControls
        camera={ref.current}
        maxDistance={30}
        minDistance={10}
        maxPolarAngle={degToRad(60)}
      />
      <Environment background files={'/sky.hdr'} />

      <group scale={3}>
        <primitive object={grass.scene} />
      </group>

      {type >= 0 && <Flower type={type} />}
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
    <Center top>
      <primitive object={flower.scene} />
    </Center>
  );
}

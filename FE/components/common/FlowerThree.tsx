import {
  Center,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import selectedFlowerAtom from 'store/garden/selectedFlowerAtom';
import { Box3, Vector3 } from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import { FLOWERS_LIST } from 'utils/flowerDataList';

function FlowerThree() {
  const flower = useRecoilValue(selectedFlowerAtom);
  const ref = useRef();

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

      <mesh receiveShadow rotation={[degToRad(-90), 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshNormalMaterial />
      </mesh>

      {flower && <Flower />}
    </>
  );
}

export default FlowerThree;

function Flower() {
  const flower = useRecoilValue(selectedFlowerAtom);

  const { scene } = useGLTF(FLOWERS_LIST[1]);

  const bbox = new Box3().setFromObject(scene);
  const center = bbox.getCenter(new Vector3());
  const size = bbox.getSize(new Vector3());

  const maxAxis = Math.max(size.x, size.y, size.z);
  scene.scale.multiplyScalar(5 / maxAxis);
  bbox.setFromObject(scene);
  bbox.getCenter(center);
  bbox.getSize(size);
  scene.position.copy(center).multiplyScalar(-1);

  useEffect(() => {
    scene.traverse(node => {
      node.castShadow = true;
    });
  }, [scene]);

  return (
    <Center top>
      <primitive object={scene} />
    </Center>
  );
}

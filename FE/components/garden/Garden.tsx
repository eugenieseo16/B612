import {
  OrbitControls,
  useGLTF,
  useAnimations,
  Center,
  PerspectiveCamera,
} from '@react-three/drei';
import { LayoutCamera } from 'framer-motion-3d';
import { degToRad } from 'three/src/math/MathUtils';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Group } from 'three';
import { useRecoilValue } from 'recoil';
import selectedFlowerAtom from 'store/garden/selectedFlowerAtom';
import { useThree } from '@react-three/fiber';

function Garden() {
  const ref = useRef<Group | null>(null);
  const { scene, animations } = useGLTF(
    'https://res.cloudinary.com/dohkkln9r/image/upload/v1680346947/garden.glb'
  );
  const selectedFlower = useRecoilValue(selectedFlowerAtom);
  const { actions } = useAnimations(animations, ref);
  actions['prop|Cylinder.001Action']?.play();
  useEffect(() => {
    scene.traverse(node => (node.receiveShadow = true));
  }, [scene]);
  useThree(({ camera }) => {
    camera.position.set(0, 12 , 16);
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <spotLight castShadow position={[10, 20, 5]} intensity={1} />

      {!selectedFlower && (
        <OrbitControls
          enablePan={false}
          maxPolarAngle={degToRad(65)}
          maxDistance={80}
        />
      )}

      <Center top receiveShadow>
        <group ref={ref}>
          <primitive object={scene} />
        </group>
      </Center>
    </>
  );
}

export default Garden;

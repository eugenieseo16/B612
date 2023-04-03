import {
  OrbitControls,
  useGLTF,
  useAnimations,
  Center,
} from '@react-three/drei';
import { LayoutCamera } from 'framer-motion-3d';
import { degToRad } from 'three/src/math/MathUtils';
import { useRef } from 'react';
import { useEffect } from 'react';
import SelectPanel from './SelectPanel';
import { useRecoilValue } from 'recoil';
import gardenIndexAtom from 'store/garden/gardenIndexAtom';

function Garden() {
  const ref = useRef<any>();
  const { scene, animations } = useGLTF(
    'https://res.cloudinary.com/dohkkln9r/image/upload/v1680346947/garden.glb'
  );
  const { actions } = useAnimations(animations, ref);
  actions['prop|Cylinder.001Action']?.play();
  useEffect(() => {
    scene.traverse(node => (node.receiveShadow = true));
  }, [scene]);

  return (
    <>
      <ambientLight intensity={0.1} />
      <spotLight castShadow position={[10, 20, 5]} intensity={1} />

      <OrbitControls
        enablePan={false}
        maxPolarAngle={degToRad(65)}
        maxDistance={80}
      />
      <LayoutCamera position={[0, 15, 25]} />

      <Center top receiveShadow>
        <group ref={ref}>
          <primitive object={scene} />
        </group>
      </Center>
      <SelectPanel />
    </>
  );
}

export default Garden;

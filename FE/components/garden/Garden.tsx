import {
  OrbitControls,
  useGLTF,
  useAnimations,
  Center,
} from '@react-three/drei';
import { LayoutCamera } from 'framer-motion-3d';
import { degToRad } from 'three/src/math/MathUtils';
import { useRef } from 'react';

function Garden() {
  const ref = useRef<any>();
  const { scene, animations } = useGLTF(
    'https://res.cloudinary.com/dohkkln9r/image/upload/v1680346947/garden.glb'
  );
  const { actions } = useAnimations(animations, ref);
  actions['prop|Cylinder.001Action']?.play();
  return (
    <>
      <ambientLight />
      <OrbitControls
        enablePan={false}
        maxPolarAngle={degToRad(65)}
        maxDistance={80}
      />
      <LayoutCamera position={[0, 15, 25]}  />

      <Center top>
        <group ref={ref}>
          <primitive object={scene} />
        </group>
      </Center>
    </>
  );
}

export default Garden;

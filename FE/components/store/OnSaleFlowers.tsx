import { Center, useGLTF, useAnimations } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { Box3, LoopOnce, Vector3 } from 'three';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import boxAnimateAtom from 'store/store/boxAnimateAtom';

const RandomBox = () => {
  const ref = useRef<any>(null);
  const { scene, animations } = useGLTF(
    'https://res.cloudinary.com/dohkkln9r/image/upload/v1680502259/box.glb'
  );

  const animate = useRecoilValue(boxAnimateAtom);
  const { actions } = useAnimations(animations, ref);
  const bbox = new Box3().setFromObject(scene);
  const center = bbox.getCenter(new Vector3());
  const size = bbox.getSize(new Vector3());

  const maxAxis = Math.max(size.x, size.y, size.z);
  scene.scale.multiplyScalar(2 / maxAxis);
  bbox.setFromObject(scene);
  bbox.getCenter(center);
  bbox.getSize(size);
  scene.position.copy(center).multiplyScalar(-1);
  scene.position.y -= size.y * 0.5;
  useEffect(() => {
    actions['Take 001']?.setDuration(1.5);
    actions['Take 001']?.setLoop(LoopOnce, 1);
  }, []);
  useEffect(() => {
    if (animate) {
      actions['Take 001']?.play();
      setTimeout(() => {
        actions['Take 001']?.startAt(800);
      }, 1200);
    }
  }, [animate]);
  return (
    <motion.group
      ref={ref}
      position={[0, 0, 2]}
      transition={{ duration: 0.4, ease: 'linear' }}
    >
      <Center>
        <primitive object={scene} />
      </Center>
    </motion.group>
  );
};
export default RandomBox;

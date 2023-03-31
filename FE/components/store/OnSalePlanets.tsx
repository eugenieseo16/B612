import { Center, PresentationControls, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import onSalePlanetsAtom from 'store/store/onSalePlanetsAtom';
import storeIndexAtom from 'store/store/storeIndexAtom';
import { PLANETS_LIST } from 'utils/utils';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { Box3, Vector3 } from 'three';
import storeAnimateAtom from 'store/store/storeAnimateAtom';

function OnSalePlanets() {
  const onSalePlanets = useRecoilValue(onSalePlanetsAtom);
  const { index, page } = useRecoilValue(storeIndexAtom);
  const curPlanetsLength =
    onSalePlanets.length - page * 5 > 4 ? 5 : onSalePlanets.length - page * 5;

  return (
    <>
      {onSalePlanets.map((planet, i) => {
        const deg =
          (Math.PI * 2 * (i - (index % curPlanetsLength))) / curPlanetsLength;
        if (i > curPlanetsLength - 1) return;

        return (
          <Planet key={i} data={onSalePlanets[i + page * 5]} deg={deg} />
          // <motion.mesh
          //   key={i}
          //   animate={{ x: 10 * Math.sin(deg), z: 10 * Math.cos(deg) - 8 }}
          //   transition={{ duration: 0.4, ease: 'linear' }}
          // >
          //   <sphereGeometry />
          //   <meshStandardMaterial
          //     color={`#${planet.planetColor.slice(0, 6)}`}
          //   />
          // </motion.mesh>
        );
      })}
    </>
  );
}

export default OnSalePlanets;

const Planet = ({ data, deg }: any) => {
  const scene = useGLTF(PLANETS_LIST[+data.planetType]);
  const clone = SkeletonUtils.clone(scene.scene);
  const setAnimate = useSetRecoilState(storeAnimateAtom);

  const bbox = new Box3().setFromObject(clone);
  const center = bbox.getCenter(new Vector3());
  const size = bbox.getSize(new Vector3());

  const maxAxis = Math.max(size.x, size.y, size.z);
  clone.scale.multiplyScalar(1 / maxAxis);
  bbox.setFromObject(clone);
  bbox.getCenter(center);
  bbox.getSize(size);
  clone.position.copy(center).multiplyScalar(-1);
  clone.position.y -= size.y * 0.5;

  return (
    <motion.group
      scale={3}
      animate={{ x: 10 * Math.sin(deg), z: 10 * Math.cos(deg) - 8 }}
      transition={{ duration: 0.4, ease: 'linear' }}
      onAnimationStart={() => setAnimate(true)}
      onAnimationComplete={() => setAnimate(false)}
    >
      <Center>
        <primitive object={clone} />
      </Center>
    </motion.group>
  );
};

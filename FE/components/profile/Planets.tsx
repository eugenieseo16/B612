import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion-3d';
import { useGLTF } from '@react-three/drei';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { useRecoilState, useRecoilValue } from 'recoil';
import selectedPlanetAtom from 'store/profile/selectedPlanet';
import roomIndexAtom from 'store/profile/roomIndexAtom';
import { Box3, Vector3 } from 'three';
import {
  usePlanetContract,
  usePlanetTokenContract,
} from '@components/contracts/planetToken';
import planetAtom from 'store/planetsAtom';

function Planets({ memberAddress }: { memberAddress: string }) {
  const planets = useRecoilValue(planetAtom);
  const getRandom = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  return (
    <>
      <motion.group>
        {planets?.map((planet, i) => (
          <Planet
            key={i}
            data={planet}
            planetId={i}
            pos={[-20 + 10 * i, getRandom(15, 35), getRandom(-30, -10)]}
            time={getRandom(10, 15)}
          />
        ))}
      </motion.group>
    </>
  );
}

export default Planets;

// eslint-disable-next-line
function Planet({ data, planetId, time, pos }: any) {
  const [selected, setSelected] = useRecoilState(selectedPlanetAtom);
  const [roomIndex, setRoomIndex] = useRecoilState(roomIndexAtom);

  const scene = useGLTF(
    'https://res.cloudinary.com/dohkkln9r/image/upload/v1679556189/cprsxurbqcea7uk6p2vf.glb'
  );
  const clone = SkeletonUtils.clone(scene.scene);

  //3D 모델링 리사이즈
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

  const [y, setY] = useState(2);

  useEffect(() => {
    const id = setTimeout(() => {
      setY(-y);
    }, time * 1000);
    return () => clearTimeout(id);
  }, [y, time]);
  const handleClick = () => {
    if (roomIndex !== 2) setRoomIndex(2);
    setSelected(planetId);
  };

  useEffect(() => {
    if (roomIndex !== 2) setSelected(-1);
    else setSelected(0);
  }, [roomIndex, setSelected]);

  return (
    <React.Fragment>
      <motion.group
        animate={{
          x: selected === planetId ? 0 : selected === -1 ? pos[0] : pos[0] * 3,
          y: selected === planetId ? 35 : pos[1],
          z:
            selected === planetId
              ? -30
              : selected === -1
              ? pos[2]
              : pos[0] === 0
              ? -60
              : pos[2],
          scale: selected === planetId ? 3 : 1,
        }}
      >
        <motion.group
          scale={8}
          animate={{ y: selected === planetId ? 0 : y }}
          transition={{
            ease: 'linear',
            duration: selected === planetId ? 1 : time,
          }}
          onClick={handleClick}
        >
          <primitive object={clone} />
        </motion.group>
      </motion.group>
    </React.Fragment>
  );
}

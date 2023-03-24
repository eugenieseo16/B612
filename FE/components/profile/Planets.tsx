import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion-3d';
import { useGLTF } from '@react-three/drei';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { useRecoilState } from 'recoil';
import selectedPlanetAtom from 'store/profile/selectedPlanet';
import roomIndexAtom from 'store/profile/roomIndexAtom';

function Planets() {
  const getRandom = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };
  return (
    <>
      <motion.group>
        {[1, 2, 3, 4, 5].map((e, i) => (
          <Planet
            key={e}
            index={i}
            planetId={e}
            pos={[-16 + 8 * i, getRandom(15, 35), getRandom(-75, -5)]}
            time={getRandom(10, 15)}
          />
        ))}
      </motion.group>
    </>
  );
}

export default Planets;

// eslint-disable-next-line
function Planet({ planetId, time, pos }: any) {
  const scene = useGLTF(
    'https://res.cloudinary.com/dohkkln9r/image/upload/v1679556189/cprsxurbqcea7uk6p2vf.glb'
  );
  const clone = SkeletonUtils.clone(scene.scene);
  const [selected, setSelected] = useRecoilState(selectedPlanetAtom);
  const [roomIndex, setRoomIndex] = useRecoilState(roomIndexAtom);

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
  }, [roomIndex, setSelected]);

  console.log(selected === planetId);
  return (
    <React.Fragment>
      <motion.group
        animate={{
          x: selected === planetId ? 0 : pos[0],
          y: selected === planetId ? 0 : pos[1],
          z: selected === planetId ? -40 : pos[2],
          scale: selected === planetId ? 2 : 1,
        }}
      >
        <motion.group
          scale={5}
          animate={{ y }}
          transition={{ ease: 'linear', duration: time }}
          onClick={handleClick}
        >
          <primitive object={clone} />
        </motion.group>
      </motion.group>
    </React.Fragment>
  );
}

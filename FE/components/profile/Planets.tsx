import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion-3d';
import { degToRad } from 'three/src/math/MathUtils';

function Planets({ index }: { index: number }) {
  const [time, setTime] = useState(1);
  const [selected, setSeleted] = useState(-1);

  useEffect(() => {
    const id = setTimeout(() => {
      setTime(time + 1);
    }, 15000);
    return () => clearTimeout(id);
  }, [time]);

  return (
    <>
      <motion.group>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(e => (
          <Planet
            selected={selected === e}
            setSeleted={setSeleted}
            key={e}
            index={index}
            planetId={e}
          />
        ))}
      </motion.group>
    </>
  );
}

export default Planets;

function Planet({ index, selected, setSeleted, planetId }: any) {
  function getRandom(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  const [y, setY] = useState(5);
  const [pos, setPos] = useState({
    x: getRandom(-200, 200),
    y: getRandom(-100, 100),
    z: getRandom(-600, -800),
  });
  const [rotateY, setRotateY] = useState(degToRad(getRandom(-360, 360)));

  useEffect(() => {
    const id = setTimeout(() => {
      setPos({
        x: getRandom(-200, 200),
        y: getRandom(-100, 100),
        z: getRandom(-600, -800),
      });
      setRotateY(degToRad(getRandom(-360, 360)));
    }, 30000);

    return () => clearTimeout(id);
  }, [pos]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (y > 0) setY(-5);
      else setY(5);
    }, 2000);
    return () => clearTimeout(id);
  }, [y]);

  return (
    <motion.mesh
      animate={{ y, z: index === 2 ? 0 : -1000 }}
      transition={{ duration: 2 }}
      position={[0, 0, -1000]}
    >
      <motion.mesh
        animate={{
          ...pos,
          rotateY,
        }}
        transition={{ ease: 'linear', duration: 30 }}
        onClick={() => setSeleted(planetId)}
        position={[
          getRandom(-200, 200),
          getRandom(-100, 100),
          getRandom(-600, -800),
        ]}
      >
        <boxGeometry args={[32, 32, 32]} />
        <motion.meshStandardMaterial
          animate={{
            opacity: selected ? 1 : index === 2 ? 0.6 : 0,
            color: selected ? 'blue' : 'red',
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.mesh>
    </motion.mesh>
  );
}

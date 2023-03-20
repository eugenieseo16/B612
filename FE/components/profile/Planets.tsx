import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion-3d';
import { degToRad } from 'three/src/math/MathUtils';

function Planets({ index }: { index: number }) {
  const [time, setTime] = useState(1);
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
          <Planet key={e} index={index} />
        ))}
      </motion.group>
    </>
  );
}

export default Planets;

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function Planet({ index }: { index: number }) {
  const [hover, setHover] = useState(false);

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
        onClick={() => setHover(!hover)}
        position={[
          getRandom(-200, 200),
          getRandom(-100, 100),
          getRandom(-600, -800),
        ]}
      >
        <boxGeometry args={[32, 32, 32]} />
        <motion.meshStandardMaterial
          animate={{
            opacity: index === 2 ? 1 : 0,
            color: hover ? 'blue' : 'red',
          }}
          transition={{ duration: 2 }}
        />
      </motion.mesh>
    </motion.mesh>
  );
}

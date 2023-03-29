import { useThree } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { useRecoilValue } from 'recoil';
import onSalePlanetsAtom from 'store/store/onSalePlanetsAtom';
import storeIndexAtom from 'store/store/storeIndexAtom';

function OnSalePlanets() {
  const onSalePlanets = useRecoilValue(onSalePlanetsAtom);
  const { index } = useRecoilValue(storeIndexAtom);

  return (
    <>
      {onSalePlanets.map((planet, i) => {
        const deg = (Math.PI * 2 * (i - index)) / 6;

        return (
          <motion.mesh
            key={i}
            animate={{ x: 10 * Math.sin(deg), z: 10 * Math.cos(deg) - 8 }}
            transition={{ duration: 0.4, ease: 'linear' }}
          >
            <sphereGeometry />
            <meshStandardMaterial color={`#${planet.planetColor.slice(1)}`} />
          </motion.mesh>
        );
      })}
    </>
  );
}

export default OnSalePlanets;

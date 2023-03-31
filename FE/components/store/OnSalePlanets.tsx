import { motion } from 'framer-motion-3d';
import { useRecoilValue } from 'recoil';
import onSalePlanetsAtom from 'store/store/onSalePlanetsAtom';
import storeIndexAtom from 'store/store/storeIndexAtom';

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
        if (i > 4) return;
        return (
          <motion.mesh
            key={i}
            animate={{ x: 10 * Math.sin(deg), z: 10 * Math.cos(deg) - 8 }}
            transition={{ duration: 0.4, ease: 'linear' }}
          >
            <sphereGeometry />
            <meshStandardMaterial
              color={`#${planet.planetColor.slice(0, 6)}`}
            />
          </motion.mesh>
        );
      })}
    </>
  );
}

export default OnSalePlanets;

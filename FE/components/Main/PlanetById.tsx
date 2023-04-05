import { Center, Html, useGLTF } from '@react-three/drei';
import { useRouter } from 'next/router';
import { colors } from 'styles/colors';
import { Box3, Vector3 } from 'three';
import { planetNameParser } from 'utils/planetUtil';
import { PLANETS_LIST } from 'utils/utils';

const PlanetById = ({ planet }: { planet: IPlanet }) => {
  const router = useRouter();
  const { scene } = useGLTF(PLANETS_LIST[+planet.planetType]);

  //3D 모델링 리사이즈
  const bbox = new Box3().setFromObject(scene);
  const center = bbox.getCenter(new Vector3());
  const size = bbox.getSize(new Vector3());

  const maxAxis = Math.max(size.x, size.y, size.z);
  scene.scale.multiplyScalar(2.5 / maxAxis);
  bbox.setFromObject(scene);
  bbox.getCenter(center);
  bbox.getSize(size);
  scene.position.copy(center).multiplyScalar(-1);

  return (
    <>
      <Center position={[6, 4, 0]}>
        <group>
          <primitive object={scene} />
        </group>
      </Center>
      <Html position={[6, 4, 0]}>
        <div
          onClick={() => router.push(`/planet/${planet.planetTokenId}`)}
          style={{
            cursor: 'pointer',
            width: '13rem',
            backgroundColor: colors.purple,
            padding: '1rem',
            borderRadius: '1rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <p style={{ color: '#fff' }}>
            {planetNameParser(planet.planetName)[1]}에 머무르기🌏
          </p>
          <span></span>
        </div>
      </Html>
    </>
  );
};
export default PlanetById;

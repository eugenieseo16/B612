import styled from '@emotion/styled';
import { useMobile } from '@hooks/useMobile';
import { Center, Html, useGLTF } from '@react-three/drei';
import { useRouter } from 'next/router';
import { colors } from 'styles/colors';
import { Box3, Vector3 } from 'three';
import { planetNameParser } from 'utils/planetUtil';
import { PLANETS_LIST } from 'utils/utils';

const PlanetById = ({ planet }: { planet: IPlanet }) => {
  const isMobile = useMobile();
  const router = useRouter();
  const { scene } = useGLTF(PLANETS_LIST[+planet.planetType]);

  //3D 모델링 리사이즈
  const bbox = new Box3().setFromObject(scene);
  const center = bbox.getCenter(new Vector3());
  const size = bbox.getSize(new Vector3());

  const maxAxis = Math.max(size.x, size.y, size.z);
  scene.scale.multiplyScalar(4.5 / maxAxis);
  bbox.setFromObject(scene);
  bbox.getCenter(center);
  bbox.getSize(size);
  scene.position.copy(center).multiplyScalar(-1);
  const pos = !isMobile ? new Vector3(6, 4, 0) : new Vector3(3, 4, 0);
  const htmlPos = !isMobile ? new Vector3(6, 4, 0) : new Vector3(0, 3, 0);
  return (
    <>
      <Center position={pos}>
        <group>
          <primitive object={scene} />
        </group>
      </Center>
      <Html position={htmlPos}>
        <InnerHtml
          onClick={() => router.push(`/planet/${planet.planetTokenId}`)}
        >
          <p style={{ color: '#fff' }}>
            {planetNameParser(planet.planetName)[1]}에 머무르기🌏
          </p>
        </InnerHtml>
      </Html>
    </>
  );
};
export default PlanetById;

export const InnerHtml = styled.div`
  cursor: pointer;
  width: 13rem;
  background-color: ${colors.purple};
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  @media (max-width: 500px) {
    border-radius: 0.5rem;
    padding: 0.5rem;
    width: 8rem;
    p {
      font-size: 0.8rem;
    }
  }
`;

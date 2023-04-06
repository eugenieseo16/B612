import React, { useEffect, useState } from 'react';
import { useGLTF, OrbitControls, Center } from '@react-three/drei';
import { useRouter } from 'next/router';

import { PLANETS_LIST } from 'utils/utils';
import { usePlanetContract } from '@components/contracts/planetToken';
import { Box3, Vector3 } from 'three';

function Model({ data }: { data: IPlanet }) {
  const { scene } = useGLTF(PLANETS_LIST[+data.planetType]);

  //3D 모델링 리사이즈
  const bbox = new Box3().setFromObject(scene);
  const center = bbox.getCenter(new Vector3());
  const size = bbox.getSize(new Vector3());

  const maxAxis = Math.max(size.x, size.y, size.z);
  scene.scale.multiplyScalar(4 / maxAxis);
  bbox.setFromObject(scene);
  bbox.getCenter(center);
  bbox.getSize(size);

  return <primitive object={scene} />;
}

function PlanetModel() {
  const router = useRouter();
  const planetId = router.query?.planetId;

  const planetContract = usePlanetContract();
  const [planetDetail, setPlanetDetail] = useState<IPlanet | null>(null);

  useEffect(() => {
    if (!planetId) return;
    planetContract?.methods
      .b612AddressMap(planetId)
      .call()
      .then((data: IPlanet) => {
        setPlanetDetail(data);
      });
  }, [planetContract, planetId]);

  return (
    <>
      <OrbitControls />
      <ambientLight />
      {planetDetail && (
        <Center>
          <Model data={planetDetail} />
        </Center>
      )}
    </>
  );
}

export default PlanetModel;

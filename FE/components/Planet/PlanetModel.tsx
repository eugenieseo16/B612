import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';
import { useRouter } from 'next/router';

import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';

import { PLANETS_LIST } from 'utils/utils';
import { usePlanetContract } from '@components/contracts/planetToken';

function Model(props: any) {
  const user = useRecoilValue(userAtom);

  // console.log(user);

  const router = useRouter();
  const planetId = router.query?.planetId;

  // planet type
  const planetContract = usePlanetContract();
  const [planetDetail, setPlanetDetail] = useState(null);

  useEffect(() => {
    if (!planetId) return;
    planetContract?.methods
      .b612AddressMap(planetId)
      .call()
      .then((data: any) => {
        setPlanetDetail(data?.planetType);
      });
  }, [planetContract, planetId]);

  const { scene } = useGLTF(PLANETS_LIST[planetDetail || 1]);

  return <primitive object={scene} {...props} />;
}

function PlanetTest() {
  return (
    <Canvas dpr={[1, 2]} camera={{ fov: 45 }} style={{ position: 'fixed' }}>
      <PresentationControls>
        <Stage environment="studio">
          <Model scale={0.01} />
        </Stage>
      </PresentationControls>
    </Canvas>
  );
}

export default PlanetTest;

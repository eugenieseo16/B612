import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';
import { useRouter } from 'next/router';

import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';

import { PLANETS_LIST } from 'utils/utils';

function Model(props: any) {
  const user = useRecoilValue(userAtom);

  console.log(user?.planets);

  const router = useRouter();
  const planetId = router.query;

  // planet id 를 보내서 Web3로 planet type  받아오기
  const planetType = '3';

  const { scene } = useGLTF(PLANETS_LIST[planetType]);

  console.log(PLANETS_LIST[planetType]);

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

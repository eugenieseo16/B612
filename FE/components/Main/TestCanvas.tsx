import { Canvas, useFrame } from '@react-three/fiber';
import { Box3, Vector3 } from 'three';
import { Stats, Environment, Center, useGLTF, Html } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { usePlanetContract } from '@components/contracts/planetToken';
import { useMyRandomPlanetAPI, useRandomUserAPI } from 'API/planetAPIs';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import { PLANETS_LIST } from 'utils/utils';
import { SkeletonUtils } from 'three-stdlib';
import router, { useRouter } from 'next/router';

import styled from '@emotion/styled';

// import Button from './Button'

const vec = new Vector3();

function Rig() {
  return useFrame(({ camera, mouse }) => {
    vec.set(mouse.x * 2, mouse.y * 2, camera.position.z);
    camera.position.lerp(vec, 0.005);
    camera.lookAt(0, 0, 0);
  });
}

function Square(props: any) {
  const { scene } = useGLTF('/planet/square_preview.glb');
  return <primitive object={scene} {...props} />;
}

function Rocket(props: any) {
  const { scene } = useGLTF('/rocket/rocket.glb');
  return <primitive object={scene} {...props} />;
}

function Planet(props: any) {
  // 내 행성 랜덤 id 가져오기
  const user = useRecoilValue(userAtom);
  const myRandomPlanetId = useMyRandomPlanetAPI(user?.memberId);

  const planetContract = usePlanetContract();
  const [planetDetail, setPlanetDetail] = useState(null);

  useEffect(() => {
    if (!myRandomPlanetId) return;
    planetContract?.methods
      .b612AddressMap(myRandomPlanetId)
      .call()
      .then((data: any) => {
        setPlanetDetail(data?.planetType);
      });
  }, [planetContract, myRandomPlanetId]);

  const { scene } = useGLTF(PLANETS_LIST[planetDetail || 1]);

  return <primitive object={scene} {...props} />;
}

export default function App() {
  const router = useRouter();
  const user = useRecoilValue(userAtom);

  // 랜덤 프로필 id
  const randomUserId = useRandomUserAPI(
    user?.memberId === undefined ? -1 : user?.memberId
  );

  // 나의 랜덤 행성 id
  const myRandomPlanetId = useMyRandomPlanetAPI(
    user?.memberId === undefined ? 1 : user?.memberId
  );

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Environment preset="sunset" />
      <Center>
        <Square
          scale={[0.03, 0.03, 0.03]}
          position={[2, -1, 0]}
          onClick={() => router.push(`/square`)}
        />{' '}
        <Html>
          <FloatingTag className="label">
            <h3>광장으로 가기</h3>
          </FloatingTag>
        </Html>
        <Html>
          <div className="label">Torus</div>
        </Html>
        <Html>
          <div className="label">Torus</div>
        </Html>
        <Rocket
          scale={[0.2, 0.2, 0.2]}
          position={[-1, 0, -1]}
          onClick={() => router.push(`/profile/${randomUserId}`)}
        />
        <Planet
          position={[6, 1, 0]}
          onClick={() => router.push(`/planet/${myRandomPlanetId}`)}
        />
      </Center>
      <Rig />
      <Stats />
    </Canvas>
  );
}

const FloatingTag = styled.div`
  width: 300px;
  /* text-alignment: center; */
  background-color: pink;
  border-radius: 3rem;
`;

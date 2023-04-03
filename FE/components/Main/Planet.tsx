import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Stats, useGLTF } from '@react-three/drei';
import styled from '@emotion/styled';
import router, { useRouter } from 'next/router';
import { useMyRandomPlanetAPI } from 'API/planetAPIs';
import userAtom from 'store/userAtom';
import { useRecoilValue } from 'recoil';
import { PLANETS_LIST } from 'utils/utils';
import { usePlanetContract } from '@components/contracts/planetToken';

function Model(props: any) {
  // 내 행성 랜덤 id 가져오기
  const user = useRecoilValue(userAtom);
  const myRandomPlanetId = useMyRandomPlanetAPI(
    user?.memberId === undefined ? 1 : user?.memberId
  );
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

const Torus = (props: JSX.IntrinsicElements['mesh']) => {
  const groupRef = useRef<any>();

  useFrame(() => {
    groupRef.current.rotation.x += 0.005;
    groupRef.current.rotation.y += 0.005;
  });

  const router = useRouter();
  const user = useRecoilValue(userAtom);

  // 나의 랜덤 행성 id
  const myRandomPlanetId = useMyRandomPlanetAPI(
    user?.memberId === undefined ? 1 : user?.memberId
  );

  return (
    <group ref={groupRef}>
      <mesh {...props}>
        <Model
          // position={[6, 1, 0]}
          scale={[0.005, 0.005, 0.005]}
          onClick={() => router.push(`/planet/${myRandomPlanetId}`)}
        />
        {/* <torusGeometry args={[1, 0.2, 12, 36]} />
        <meshStandardMaterial color={'red'} /> */}
        <Html>
          <FloatingTag className="label">
            <p>내 행성 가꾸기</p>
          </FloatingTag>
        </Html>
      </mesh>
    </group>
  );
};
function Rocket() {
  const router = useRouter();
  const user = useRecoilValue(userAtom);

  // 나의 랜덤 행성 id
  const myRandomPlanetId = useMyRandomPlanetAPI(
    user?.memberId === undefined ? 1 : user?.memberId
  );

  return (
    <>
      <pointLight position={[5, 5, 5]} />
      <Torus
        position={[2, 0, 0]}
        onClick={() => router.push(`/planet/${myRandomPlanetId}`)}
      />
    </>
  );
}

export default Rocket;

const FloatingTag = styled.div`
  width: 200px;

  background-color: pink;
  border-radius: 3rem;
  height: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

import { Canvas, useFrame } from '@react-three/fiber';
import { Box3, Vector3 } from 'three';
import { Html, Environment, Center, useGLTF } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { usePlanetContract } from '@components/contracts/planetToken';
import { useMyRandomPlanetAPI, useRandomUserAPI } from 'API/planetAPIs';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import { PLANETS_LIST } from 'utils/utils';
import { SkeletonUtils } from 'three-stdlib';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

// import Button from './Button'

const vec = new Vector3();

function Square(props: any) {
  const { scene } = useGLTF(
    'https://res.cloudinary.com/dohkkln9r/image/upload/v1680596386/square.glb'
  );
  return <primitive object={scene} {...props} />;
}

function Rocket(props: any) {
  const { scene } = useGLTF(
    'https://res.cloudinary.com/dohkkln9r/image/upload/v1680596386/rocket.glb'
  );
  return <primitive object={scene} {...props} />;
}

function Planet(props: any) {
  // 내 행성 랜덤 id 가져오기
  const user = useRecoilValue(userAtom);
  const myRandomPlanetId = useMyRandomPlanetAPI(
    user?.memberId === undefined ? -1 : user?.memberId
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
  const clone = SkeletonUtils.clone(scene);

  //3D 모델링 리사이즈
  const bbox = new Box3().setFromObject(clone);
  const center = bbox.getCenter(new Vector3());
  const size = bbox.getSize(new Vector3());

  const maxAxis = Math.max(size.x, size.y, size.z);
  clone.scale.multiplyScalar(4.5 / maxAxis);
  bbox.setFromObject(clone);
  bbox.getCenter(center);
  bbox.getSize(size);
  clone.position.copy(center).multiplyScalar(-1);
  clone.position.y -= size.y * 0.5;

  return <primitive object={clone} {...props} />;
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
    user?.memberId === undefined ? -1 : user?.memberId
  );

  return (
    <Canvas camera={{ position: [0, 0, 5] }} style={{ position: 'fixed' }}>
      <Environment preset="sunset" />
      <Html>
        <SquareTag className="label">
          <p>광장에서 놀기</p>
        </SquareTag>
        <PlanetTag className="label">
          <p>행성 머무르기</p>
        </PlanetTag>
        <RocketTag className="label">
          <p>모험하기</p>
        </RocketTag>
      </Html>
      <Center position={[0, -1, 0]}>
        <Square
          scale={[0.04, 0.04, 0.04]}
          onClick={() => router.push(`/square`)}
        />
      </Center>

      <Rocket
        scale={[0.3, 0.3, 0.3]}
        position={[-5, -1, 0]}
        onClick={() => router.push(`/profile/${randomUserId}`)}
      />

      <Planet
        position={[5.5, 1.5, 0]}
        onClick={() => router.push(`/planet/${myRandomPlanetId}`)}
      />
    </Canvas>
  );
}

const PlanetTag = styled.div`
  transform: translate(450px, -100px);

  width: 180px;

  background-color: pink;
  border-radius: 3rem;
  height: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SquareTag = styled.div`
  transform: translate(-150px, 350px);
  width: 200px;

  background-color: pink;
  border-radius: 3rem;
  height: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const RocketTag = styled.div`
  transform: translate(-650px, 50px);

  width: 130px;

  background-color: pink;
  border-radius: 3rem;
  height: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

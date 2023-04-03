import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Stats, useGLTF } from '@react-three/drei';
import styled from '@emotion/styled';
import router, { useRouter } from 'next/router';
import { useRandomUserAPI } from 'API/planetAPIs';
import userAtom from 'store/userAtom';
import { useRecoilValue } from 'recoil';

function Model(props: any) {
  const { scene } = useGLTF('/rocket/rocket.glb');
  return <primitive object={scene} {...props} />;
}

const Torus = (props: JSX.IntrinsicElements['mesh']) => {
  const router = useRouter();
  const user = useRecoilValue(userAtom);

  // 랜덤 프로필 id
  const randomUserId = useRandomUserAPI(
    user?.memberId === undefined ? -1 : user?.memberId
  );

  const groupRef = useRef<any>();

  useFrame(() => {
    groupRef.current.rotation.x -= 0.02;
    groupRef.current.rotation.y -= 0.02;
  });

  return (
    <group ref={groupRef}>
      <Model
        scale={[0.4, 0.4, 0.4]}
        // position={[3, 3, 6]}
        onClick={() => router.push(`/profile/${randomUserId}`)}
      />
      <mesh {...props}>
        <Html>
          <FloatingTag className="label">
            <p>먼 이웃 행성 탐험</p>
          </FloatingTag>
        </Html>
      </mesh>
    </group>
  );
};

function Rocket() {
  const router = useRouter();
  const user = useRecoilValue(userAtom);

  // 랜덤 프로필 id
  const randomUserId = useRandomUserAPI(
    user?.memberId === undefined ? -1 : user?.memberId
  );

  return (
    <>
      <pointLight position={[5, 5, 5]} />
      <Torus
        position={[0, 1, 1]}
        onClick={() => router.push(`/profile/${randomUserId}`)}
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
  cursor: pointer;
`;

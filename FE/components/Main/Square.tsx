import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Stats, useGLTF } from '@react-three/drei';
import styled from '@emotion/styled';
import router from 'next/router';

function Model(props: any) {
  const { scene } = useGLTF(
    'https://res.cloudinary.com/dohkkln9r/image/upload/v1680596386/square.glb'
  );
  return <primitive object={scene} {...props} />;
}

const Torus = (props: JSX.IntrinsicElements['mesh']) => {
  const groupRef = useRef<any>();

  return (
    <group ref={groupRef}>
      <mesh {...props}>
        <Model
          scale={[0.03, 0.03, 0.03]}
          onClick={() => router.push(`/square`)}
        />

        <Html>
          <FloatingTag className="label">
            <p>광장으로 이동</p>
          </FloatingTag>
        </Html>
      </mesh>
    </group>
  );
};

function Rocket() {
  return (
    <>
      <pointLight position={[5, 5, 5]} />
      <Torus position={[2, 0, 0]} onClick={() => router.push(`/square`)} />
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

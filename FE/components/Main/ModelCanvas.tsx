/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';

import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';

import { useRouter } from 'next/navigation';
import { Canvas } from '@react-three/fiber';
import {
  useGLTF,
  Stage,
  PresentationControls,
  OrbitControls,
} from '@react-three/drei';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { Box3, Vector3 } from 'three';

import { PLANETS_LIST } from 'utils/utils';
import { Center } from '@react-three/drei';
import { useMyRandomPlanetAPI, useRandomUserAPI } from 'API/planetAPIs';
import { usePlanetContract } from '@components/contracts/planetToken';

import { Stats } from '@react-three/drei';

function Rocket(props: any) {
  const { scene } = useGLTF('/rocket/rocket.glb');
  return <primitive object={scene} {...props} />;

  // const gltf = useGLTF('/rocket/rocket.glb');
  // const model = gltf.scene;
  // model.scale.set(0.005, 0.005, 0.005); // set the scale to 50% of the original size
  // return <primitive object={model} {...props} />;
}

function Square(props: any) {
  const { scene } = useGLTF('/planet/square_preview.glb');
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

  console.log(planetDetail);

  const { scene } = useGLTF(PLANETS_LIST[planetDetail || 1]);
  return <primitive object={scene} {...props} />;
}

function RocketModel() {
  const router = useRouter();
  const user = useRecoilValue(userAtom);

  // 랜덤 프로필 id
  const randomUserId = useRandomUserAPI(user?.memberId);

  // 나의 랜덤 행성 id
  const myRandomPlanetId = useMyRandomPlanetAPI(user?.memberId);

  return (
    <Canvas style={{ position: 'fixed' }}>
      {/* <OrbitControls makeDefault /> */}
      <ambientLight />
      <Stats></Stats>
      <OrbitControls target={[0, 1, 0]} maxPolarAngle={Math.PI / 2} />

      {/* <Rocket scale={[0.4, 0.4, 0.4]} position={[0, 0, 0]} /> */}
      {/* <Square scale={[0.07, 0.07, 0.07]} position={[0, -2, 0]} /> */}
      <Planet scale={[0.009, 0.009, 0.009]} position={[0, 0, 0]} />
    </Canvas>
  );
}

export default RocketModel;

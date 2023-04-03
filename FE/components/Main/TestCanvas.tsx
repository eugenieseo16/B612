import { Canvas, useFrame } from '@react-three/fiber';
import { Box3, Vector3 } from 'three';
import { Stats, Environment, Center, useGLTF } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { usePlanetContract } from '@components/contracts/planetToken';
import { useMyRandomPlanetAPI, useRandomUserAPI } from 'API/planetAPIs';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import { PLANETS_LIST } from 'utils/utils';
import { SkeletonUtils } from 'three-stdlib';
import router, { useRouter } from 'next/router';

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
  const clone = SkeletonUtils.clone(scene);

  //3D 모델링 리사이즈
  const bbox = new Box3().setFromObject(clone);
  const center = bbox.getCenter(new Vector3());
  const size = bbox.getSize(new Vector3());

  const maxAxis = Math.max(size.x, size.y, size.z);
  clone.scale.multiplyScalar(4 / maxAxis);
  bbox.setFromObject(clone);
  bbox.getCenter(center);
  bbox.getSize(size);
  clone.position.copy(center).multiplyScalar(-1);
  clone.position.y -= size.y * 4;

  return <primitive object={clone} {...props} />;
}

export default function App() {
  const router = useRouter();
  const user = useRecoilValue(userAtom);

  // 랜덤 프로필 id
  const randomUserId = useRandomUserAPI(user?.memberId);

  // 나의 랜덤 행성 id
  const myRandomPlanetId = useMyRandomPlanetAPI(user?.memberId);

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Environment preset="sunset" />
      <Center>
        {/* {[...Array(5).keys()].map((x) =>
          [...Array(3).keys()].map((y) => <Button key={x + y * 5} position={[x * 2.5, y * 2.5, 0]} />)
        )} */}
        <Square
          scale={[0.03, 0.03, 0.03]}
          position={[2, -1, 0]}
          onClick={() => router.push(`/square`)}
        />
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

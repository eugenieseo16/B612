import { usePlanetContract } from '@components/contracts/planetToken';
import { useMyRandomPlanetAPI } from 'API/planetAPIs';
import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import userAtom from 'store/userAtom';
import { useGLTF } from '@react-three/drei';
import { PLANETS_LIST } from 'utils/utils';
import { Box3, Vector3 } from 'three';

export default function Planet() {
  // 내 행성 랜덤 id 가져오기
  const user = useRecoilValue(userAtom);
  const myRandomPlanetId = useMyRandomPlanetAPI(
    user?.memberId === undefined ? -1 : user?.memberId
  );

  const planetContract = usePlanetContract();
  const [planetDetail, setPlanetDetail] = useState(null);

  console.log(myRandomPlanetId);

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

  //3D 모델링 리사이즈
  const bbox = new Box3().setFromObject(scene);
  const center = bbox.getCenter(new Vector3());
  const size = bbox.getSize(new Vector3());

  const maxAxis = Math.max(size.x, size.y, size.z);
  scene.scale.multiplyScalar(4.5 / maxAxis);
  bbox.setFromObject(scene);
  bbox.getCenter(center);
  bbox.getSize(size);
  scene.position.copy(center).multiplyScalar(-1);
  scene.position.y -= size.y * 0.5;

  return (
    <group>
      <primitive object={scene} />
    </group>
  );
}

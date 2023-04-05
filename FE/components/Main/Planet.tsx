import { usePlanetContract } from '@components/contracts/planetToken';
import { useMyRandomPlanetAPI } from 'API/planetAPIs';
import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import userAtom from 'store/userAtom';
import { Center, Html, useGLTF } from '@react-three/drei';
import { PLANETS_LIST } from 'utils/utils';
import { Box3, Vector3 } from 'three';
import { planetNameParser } from 'utils/planetUtil';
import { colors } from 'styles/colors';
import PlanetById from './PlanetById';

export default function Planet() {
  // 내 행성 랜덤 id 가져오기
  const user = useRecoilValue(userAtom);
  const planetContract = usePlanetContract();
  const [planetDetail, setPlanetDetail] = useState<IPlanet | null>(null);

  const myRandomPlanetId = useMyRandomPlanetAPI(
    user?.memberId === undefined ? -1 : user?.memberId
  );

  const getRandom = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  useEffect(() => {
    if (!planetContract) return;
    (async function () {
      const totalSupply = await planetContract?.methods.totalSupply().call();
      const planetData = await planetContract?.methods
        .b612AddressMap(getRandom(totalSupply) + 1)
        .call();
      setPlanetDetail(planetData);
    })();
  }, [planetContract, myRandomPlanetId]);

  return <>{planetDetail ? <PlanetById planet={planetDetail} /> : null}</>;
}

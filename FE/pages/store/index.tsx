import { usePlanetContract } from '@components/contracts/planetToken';
import OnSalePlanets from '@components/store/OnSalePlanets';
import PlanetCard from '@components/store/PlanetCard';
import StoreNav from '@components/store/StoreNav';
import { Canvas } from '@react-three/fiber';
import { MotionCanvas } from 'framer-motion-3d';
import React, { useEffect } from 'react';
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilState,
} from 'recoil';
import onSalePlanetsAtom from 'store/store/onSalePlanetsAtom';

function StorePage() {
  const planetContract = usePlanetContract();
  const [onSalePlanets, setOnSalePlanets] = useRecoilState(onSalePlanetsAtom);

  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  useEffect(() => {
    planetContract?.methods
      .getOnSalePlanet()
      .call()
      .then((data: any) => {
        console.log('HHHH', data);
        setOnSalePlanets(data);
      });
  }, [planetContract]);

  return (
    <div>
      <StoreNav />
      <PlanetCard />
      <MotionCanvas style={{ height: '100vh', width: '100%' }}>
        <RecoilBridge>
          <ambientLight />
          <OnSalePlanets />
          {/* <StoreCamera /> */}
        </RecoilBridge>
      </MotionCanvas>
      <Canvas style={{ display: 'none' }}>
        <mesh />
      </Canvas>
    </div>
  );
}

export default StorePage;

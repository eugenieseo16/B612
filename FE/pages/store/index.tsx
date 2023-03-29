import { usePlanetContract } from '@components/contracts/planetToken';
import OnSalePlanets from '@components/store/OnSalePlanets';
import PlanetCard from '@components/store/PlanetCard';
import StoreCamera from '@components/store/StoreCamera';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { MotionCanvas } from 'framer-motion-3d';
import React, { useEffect } from 'react';
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilState,
} from 'recoil';
import onSalePlanetsAtom from 'store/store/onSalePlanetsAtom';
import storeIndexAtom from 'store/store/storeIndexAtom';

function StorePage() {
  const planetContract = usePlanetContract();
  const [onSalePlanets, setOnSalePlanets] = useRecoilState(onSalePlanetsAtom);
  const [storeIndex, setStoreIndex] = useRecoilState(storeIndexAtom);

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
      <button
        onClick={() => {
          if (storeIndex.index <= 0) return;
          setStoreIndex({ ...storeIndex, index: storeIndex.index - 1 });
        }}
      >
        prev
      </button>
      <button
        onClick={() => {
          if (storeIndex.index >= onSalePlanets.length - 1) return;
          setStoreIndex({ ...storeIndex, index: storeIndex.index + 1 });
        }}
      >
        next
      </button>
      <PlanetCard />
      <MotionCanvas style={{ height: 'calc(100vh - 5rem)', width: '100%' }}>
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

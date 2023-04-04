import { usePlanetContract } from '@components/contracts/planetToken';
import { useFlowerContract } from '@components/contracts/roseToken';
import FlowerCard from '@components/store/FlowerCard';
import RandomBox from '@components/store/OnSaleFlowers';
import OnSaleFlowers from '@components/store/OnSaleFlowers';
import OnSalePlanets from '@components/store/OnSalePlanets';
import PlanetCard from '@components/store/PlanetCard';
import StoreNav from '@components/store/StoreNav';
import StorePagination from '@components/store/StorePagination';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { LayoutCamera, MotionCanvas } from 'framer-motion-3d';
import React, { useEffect } from 'react';
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import onSaleFlowersAtom from 'store/store/onSaleFlowersAtom';
import onSalePlanetsAtom from 'store/store/onSalePlanetsAtom';
import onSaleTypeAtom from 'store/store/onSaleTypeAtom';

function StorePage() {
  const planetContract = usePlanetContract();

  const setOnSalePlanets = useSetRecoilState(onSalePlanetsAtom);
  const storeType = useRecoilValue(onSaleTypeAtom);

  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  useEffect(() => {
    planetContract?.methods
      .getOnSalePlanet()
      .call()
      .then((data: IPlanet[]) => {
        setOnSalePlanets(data);
      });
  }, [planetContract, setOnSalePlanets]);

  return (
    <div>
      <StoreNav />
      {storeType === 'planet' && <StorePagination />}
      {storeType === 'planet' ? <PlanetCard /> : <FlowerCard />}
      <MotionCanvas style={{ height: '100vh', width: '100%' }}>
        <RecoilBridge>
          <OrbitControls
            target={[0, 0, 2]}
            minDistance={1}
            maxDistance={80}
            enablePan={false}
          />
          <LayoutCamera
            animate={{ x: 0, y: 0, z: 6, rotateX: 0, rotateY: 0, rotateZ: 0 }}
          />
          <ambientLight />
          {storeType === 'planet' ? <OnSalePlanets /> : <RandomBox />}
        </RecoilBridge>
      </MotionCanvas>
      <Canvas style={{ display: 'none' }}>
        <mesh />
      </Canvas>
    </div>
  );
}

export default StorePage;

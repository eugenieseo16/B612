import { usePlanetContract } from '@components/contracts/planetToken';
import OnSalePlanets from '@components/store/OnSalePlanets';
import PlanetCard from '@components/store/PlanetCard';
import styled from '@emotion/styled';
import { Canvas } from '@react-three/fiber';
import { MotionCanvas } from 'framer-motion-3d';
import React, { useEffect } from 'react';
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilState,
} from 'recoil';
import onSalePlanetsAtom from 'store/store/onSalePlanetsAtom';
import storeIndexAtom from 'store/store/storeIndexAtom';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { colors } from 'styles/colors';

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
      <Button
        onClick={() => {
          if (storeIndex.index <= 0) {
            setStoreIndex({ ...storeIndex, index: onSalePlanets.length - 1 });
          } else {
            setStoreIndex({ ...storeIndex, index: storeIndex.index - 1 });
          }
        }}
        style={{ left: '20%' }}
      >
        <NavigateBeforeIcon
          sx={{
            fontSize: '8rem',
            color: colors.skyBlue,
            filter: 'drop-shadow(0px 0px 5px #fff)',
          }}
        />
      </Button>
      <Button
        onClick={() => {
          if (storeIndex.index >= onSalePlanets.length - 1)
            setStoreIndex({ ...storeIndex, index: 0 });
          else {
            setStoreIndex({ ...storeIndex, index: storeIndex.index + 1 });
          }
        }}
        style={{ right: '20%' }}
      >
        <NavigateNextIcon
          sx={{
            fontSize: '8rem',
            color: colors.skyBlue,
            filter: 'drop-shadow(0px 0px 5px #fff)',
          }}
        />
      </Button>
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
const Button = styled.button`
  position: absolute;
  top: 50%;
  z-index: 99;
  background: none;
  border: none;
  cursor: pointer;
`;

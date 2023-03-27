import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { usePlanetTokenContract } from './contracts/planetToken';
import planetAtom from 'store/planetsAtom';
import userAtom from 'store/userAtom';

function PlanetController({ userAddress }: { userAddress: string }) {
  const planetTokenContract = usePlanetTokenContract();
  const setPlanet = useSetRecoilState(planetAtom);

  useEffect(() => {
    // eslint-disable-next-line
    const handleAccount = async () => {
      if (!userAddress) return;
      const memberAddress = await window.ethereum?.selectedAddress;

      if (!memberAddress || window.ethereum.networkVersion != 5) return;

      let planets = [];
      try {
        planets = await planetTokenContract.methods
          .getPlanetTokens(userAddress)
          .call();
        setPlanet(planets);
      } catch (error) {}
    };
    handleAccount();
  }, [planetTokenContract, userAddress]);
  console.log('HELLO');
  return <></>;
}

export default PlanetController;

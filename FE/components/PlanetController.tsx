import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { usePlanetTokenContract } from './contracts/planetToken';
import planetAtom from 'store/planetsAtom';
import userAtom from 'store/userAtom';

function PlanetController() {
  const planetTokenContract = usePlanetTokenContract();
  const setPlanet = useSetRecoilState(planetAtom);
  const me = useRecoilValue(userAtom);

  useEffect(() => {
    // eslint-disable-next-line
    const handleAccount = async () => {
      const memberAddress = await window.ethereum?.selectedAddress;

      if (!memberAddress || window.ethereum.networkVersion != 5) return;

      let planets = [];
      try {
        planets = await planetTokenContract.methods
          .getPlanetTokens(me?.memberAddress)
          .call();
        setPlanet(planets);
      } catch (error) {}
    };
    handleAccount();
  }, [planetTokenContract, me]);
  return <></>;
}

export default PlanetController;

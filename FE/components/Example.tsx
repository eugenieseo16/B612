import React, { useEffect, useState, useCallback } from 'react';
import { usePlanetTokenContract } from './contracts/planetToken';

const account = '0x96714BD2760d8FF4C10a913F18FB9b2541577937';
function Example() {
  const [myPlanetLength, setMyPlanetLength] = useState(0);
  const planetTokenContract = usePlanetTokenContract();

  const getTokens = useCallback(async () => {
    const balanceLength = await planetTokenContract.methods
      .balanceOf(account)
      .call();
    setMyPlanetLength(balanceLength);
  }, [planetTokenContract]);

  useEffect(() => {
    if (planetTokenContract) getTokens();
  }, [planetTokenContract, getTokens]);

  return <div>나의 planet Token : {myPlanetLength} </div>;
}

export default Example;

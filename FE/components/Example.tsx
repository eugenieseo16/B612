import React, { useEffect, useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import { usePlanetTokenContract } from './contracts/planetToken';
import { useSsafyToken } from './contracts/ssafyToken';

function Example() {
  const user = useRecoilValue(userAtom);
  const [myPlanetLength, setMyPlanetLength] = useState(0);
  const [ssafy, setSsafy] = useState(0);
  const [total, setTotal] = useState(0);
  const planetTokenContract = usePlanetTokenContract();
  const ssafyToken = useSsafyToken();

  const getTokens = useCallback(async () => {
    if (!user) return;
    const balanceLength = await planetTokenContract.methods
      .balanceOf(user)
      .call();
    setMyPlanetLength(balanceLength);
    const temp = await ssafyToken.methods.balanceOf(user).call();
    const total = await ssafyToken.methods.totalSupply().call();
    setSsafy(temp);
    setTotal(total);
  }, [planetTokenContract, ssafyToken, user]);

  useEffect(() => {
    if (planetTokenContract) getTokens();
  }, [planetTokenContract, getTokens]);

  return (
    <div>
      <h2>나의 planet Token : {myPlanetLength}</h2>
      <h3>내가 가진 SSAFY 코인 : {ssafy}</h3>
      <h3>총 발급된 SSAFY 코인 : {total}</h3>
    </div>
  );
}

export default Example;

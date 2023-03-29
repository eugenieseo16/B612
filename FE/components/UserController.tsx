import React, { useEffect } from 'react';
import userAtom from 'store/userAtom';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { usePlanetContract } from './contracts/planetToken';

function UserController() {
  const setUser = useSetRecoilState(userAtom);
  const planetContract = usePlanetContract();
  useEffect(() => {
    // eslint-disable-next-line
    const handleAccount = async () => {
      const memberAddress = await window.ethereum?.selectedAddress;

      if (!memberAddress || window.ethereum.networkVersion != 5) {
        setUser(null);
        return;
      }
      const { data } = await axios.post('http://127.0.0.1:8080/api/member', {
        memberAddress,
      });
      const planetContractAddress =
        '0xeab8b1e0cd0de0c9e07928d8d8c9aab166ae983e';
      let isApproved = false;

      isApproved = await planetContract?.methods
        .isApprovedForAll(memberAddress, planetContractAddress)
        .call();

      const eth = (
        parseInt(
          await window.ethereum.request({
            method: 'eth_getBalance',
            params: [memberAddress, 'latest'],
          }),
          16
        ) *
        10 ** -18
      ).toFixed(4);

      setUser({ ...data.responseData, isApproved, eth: +eth });
    };

    handleAccount();
    window.ethereum?.on('accountsChanged', handleAccount);
    window.ethereum?.on('chainChanged', handleAccount);
    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccount);
      window.ethereum?.removeListener('chainChanged', handleAccount);
    };
  }, [planetContract]);

  return <></>;
}

export default UserController;

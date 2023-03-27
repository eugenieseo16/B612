import React, { useEffect } from 'react';
import userAtom from 'store/userAtom';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { usePlanetTokenContract } from './contracts/planetToken';
import { useRouter } from 'next/router';

function UserController() {
  const setUser = useSetRecoilState(userAtom);
  const router = useRouter();

  const planetTokenContract = usePlanetTokenContract();

  useEffect(() => {
    // eslint-disable-next-line
    const handleAccount = async () => {
      const memberAddress = await window.ethereum?.selectedAddress;

      if (!memberAddress || window.ethereum.networkVersion != 5) {
        setUser(null);
      } else {
        const { data } = await axios.post(
          'https://j8a208.p.ssafy.io/api/member',
          {
            memberAddress,
          }
        );
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
        let planets = [];
        try {
          planets = await planetTokenContract.methods
            .getPlanetTokens('0x4a3d1539c3800e411C9925E37703d6993383aad1')
            .call();
        } catch (error) {}
        setUser({ ...data.responseData, eth: +eth, planets });
      }
    };

    handleAccount();
    window.ethereum?.on('accountsChanged', handleAccount);
    window.ethereum?.on('chainChanged', handleAccount);
    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccount);
      window.ethereum?.removeListener('chainChanged', handleAccount);
    };
  }, [setUser, router.pathname]);

  return <></>;
}

export default UserController;

import React, { useEffect } from 'react';
import userAtom from 'store/userAtom';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';

function UserController() {
  const setUser = useSetRecoilState(userAtom);

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

      setUser({ ...data.responseData, eth: +eth });
    };

    handleAccount();
    window.ethereum?.on('accountsChanged', handleAccount);
    window.ethereum?.on('chainChanged', handleAccount);
    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccount);
      window.ethereum?.removeListener('chainChanged', handleAccount);
    };
  }, []);

  return <></>;
}

export default UserController;

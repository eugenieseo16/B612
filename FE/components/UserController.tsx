import React, { useEffect } from 'react';
import userAtom from 'store/userAtom';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
const config = { headers: { 'Content-Type': 'application/json' } };
function UserController() {
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    // eslint-disable-next-line
    const handleAccount = async () => {
      const memberAddress = await window.ethereum?.selectedAddress;
      if (!memberAddress || window.ethereum.networkVersion != 31221) {
        setUser(null);
      } else {
        const { data } = await axios.post(
          'http://70.12.247.194:8080/member',
          { memberAddress },
          config
        );
        console.log(data.responseData.memberAddress);
        setUser(data.responseData);
      }
    };

    handleAccount();
    window.ethereum?.on('accountsChanged', handleAccount);
    window.ethereum?.on('chainChanged', handleAccount);
    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccount);
      window.ethereum?.removeListener('chainChanged', handleAccount);
    };
  }, [setUser]);

  return <></>;
}

export default UserController;

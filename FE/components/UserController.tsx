import React, { useEffect } from 'react';
import userAtom from 'store/userAtom';
import { useSetRecoilState } from 'recoil';

function UserController() {
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    // eslint-disable-next-line
    const handleAccount = async () => {
      let newUser = await window.ethereum?.selectedAddress;
      if (!newUser || window.ethereum.networkVersion != 31221) newUser = '';
      setUser(newUser);
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

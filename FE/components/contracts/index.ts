import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import userAtom from 'store/userAtom';

export default function useWeb3() {
  const user = useRecoilValue(userAtom);
  // eslint-disable-next-line
  const [ether, setEther] = useState<any>();

  useEffect(() => {
    if (!user)
      setEther(
        new Web3(
          new Web3.providers.HttpProvider('https://goerli.infura.io/v3/')
        )
      );
    else setEther(new Web3(window.ethereum));
  }, [user]);

  return ether;
}

// const web3 = new Web3(window.ethereum);
// export default web3;

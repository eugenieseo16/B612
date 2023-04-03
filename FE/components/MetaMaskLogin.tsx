import React from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import Web3 from 'web3';

import { LoginButton } from '../components/MetaMaskLoginEmotion';

function MetaMaskLogin() {
  const account = useRecoilValue(userAtom);

  const handleNetwork = async () => {
    const chainId = 5; // ssafy mainnet 주소
    if (window.ethereum?.networkVersion !== chainId) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: Web3.utils.toHex(chainId) }],
        });
        // eslint-disable-next-line
      } catch (err: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName: 'Goerli TestNet',
                chainId: Web3.utils.toHex(chainId),
                nativeCurrency: {
                  name: 'ssafy_coin',
                  decimals: 18,
                  symbol: 'GoerliETH',
                },
                rpcUrls: ['https://goerli.infura.io/v3/'],
              },
            ],
          });
        }
      }
    }
  };
  const handleLogin = async () => {
    if (window.ethereum) {
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
    } else {
      alert('Install Metamask!');
      window.open('https://metamask.io/download/', 'blank');
    }
  };

  return (
    <LoginButton
      onClick={() => {
        handleNetwork();
        handleLogin();
      }}
      disabled={Boolean(account)}
    >
      <img
        src="https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
        alt="metamask login"
      />
      <h4>LOGIN</h4>
    </LoginButton>
  );
}

export default MetaMaskLogin;

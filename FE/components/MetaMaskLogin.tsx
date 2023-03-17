import React from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import Web3 from 'web3';

function MetaMaskLogin() {
  const account = useRecoilValue(userAtom);

  const handleNetwork = async () => {
    const chainId = 31221; // ssafy mainnet 주소
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
                chainName: 'SSAFY Mainnet',
                chainId: Web3.utils.toHex(chainId),
                nativeCurrency: {
                  name: 'ssafy_coin',
                  decimals: 18,
                  symbol: 'SSF',
                },
                rpcUrls: ['https://rpc.ssafy-blockchain.com'],
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
    }
  };

  return (
    <button
      onClick={() => {
        handleNetwork();
        handleLogin();
      }}
      disabled={Boolean(account)}
    >
      MetaMaskLogin
    </button>
  );
}

export default MetaMaskLogin;

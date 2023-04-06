import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import Web3 from 'web3';

import { LoginButton } from '../components/MetaMaskLoginEmotion';
import { usePlanetContract } from './contracts/planetToken';
import { useFlowerContract } from './contracts/roseToken';
import axios from 'axios';
import { apiBaseUrl } from 'API/apiURLs';

const handleNetwork = async () => {
  const chainId = 11155111; // ssafy mainnet 주소
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
              chainName: '세폴리아',
              chainId: Web3.utils.toHex(chainId),
              nativeCurrency: {
                name: 'ETH',
                decimals: 18,
                symbol: 'ETH',
              },
              rpcUrls: ['https://sepolia.infura.io/v3/'],
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

export const handleMetamaskLogin = () => {
  handleNetwork();
  handleLogin();
};

function MetaMaskLogin() {
  const handleAccount = async () => {
    const memberAddress = await window.ethereum?.selectedAddress;

    if (!memberAddress || window.ethereum.networkVersion != 11155111) {
      setAccount(null);
      return;
    }
    const { data } = await axios.post('https://j8a208.p.ssafy.io/api/member', {
      memberAddress,
    });

    const id = data.responseData.memberId;
    const planetContractAddress = '0x03DD8A0273a3ED1C15Dad07ec87f74861e6e355C';
    let isApproved = false;

    isApproved = await planetContract?.methods
      .isApprovedForAll(memberAddress, planetContractAddress)
      .call();
    let planets = [];
    planets = await planetContract?.methods
      .getPlanetTokens(memberAddress)
      .call();

    const newPlanets = planets?.map((planet: IPlanet) => ({
      createdAt: planet.createdAt,
      onSale: planet.onSale,
      ownerMemberId: id,
      planetLikesCount: 0,
      planetName: planet.planetName,
      planetNftId: planet.planetTokenId,
      planetType: planet.planetType,
    }));
    if (newPlanets)
      axios.post(`${apiBaseUrl}/member/reload/${id}`, newPlanets, {
        headers: { 'Content-Type': 'application/json' },
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

    const chainData: IRose[] = await flowerContract?.methods
      .getRoseTokens(memberAddress)
      .call();

    const {
      data: { responseData: allFlowers },
    } = await axios.get(`${apiBaseUrl}/member/${id}/flowers`);
    const allFlowersMap = allFlowers?.map(
      (flower: IRose) => flower.flowerNftId
    );

    const filteredData = chainData?.filter(
      flower => !allFlowersMap?.includes(+flower.roseTokenId)
    );

    filteredData?.forEach(flower => {
      axios.post(`${apiBaseUrl}/flower`, {
        createdAt: flower.createdAt,
        flowerNftId: flower.roseTokenId,
        flowerType: +flower.roseType,
        onSale: flower.onSale,
        ownerMemberId: data.responseData.memberId,
      });
    });

    setAccount({ ...data.responseData, planets, isApproved, eth: +eth });
  };

  const onClick = async () => {
    if (!window.ethereum) {
      alert('Install Metamask!');
      window.open('https://metamask.io/download/', 'blank');
      return;
    }
    handleNetwork();
    handleAccount();
  };
  const planetContract = usePlanetContract();
  const flowerContract = useFlowerContract();
  const [account, setAccount] = useRecoilState(userAtom);

  return (
    <LoginButton onClick={onClick} disabled={Boolean(account)}>
      <img
        src="https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
        alt="metamask login"
      />
      <h4>LOGIN</h4>
    </LoginButton>
  );
}

export default MetaMaskLogin;

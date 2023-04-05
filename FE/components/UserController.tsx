import React, { useEffect } from 'react';
import userAtom from 'store/userAtom';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { usePlanetContract } from './contracts/planetToken';
import { useFlowerContract } from './contracts/roseToken';
import { apiBaseUrl } from 'API/apiURLs';

function UserController() {
  const setUser = useSetRecoilState(userAtom);
  const planetContract = usePlanetContract();
  const flowerContract = useFlowerContract();
  useEffect(() => {
    // eslint-disable-next-line
    const handleAccount = async () => {
      const memberAddress = await window.ethereum?.selectedAddress;

      if (!memberAddress || window.ethereum.networkVersion != 5) {
        setUser(null);
        return;
      }
      const { data } = await axios.post(
        'https://j8a208.p.ssafy.io/api/member',
        {
          memberAddress,
        }
      );
      const planetContractAddress =
        '0xeab8b1e0cd0de0c9e07928d8d8c9aab166ae983e';
      let isApproved = false;

      isApproved = await planetContract?.methods
        .isApprovedForAll(memberAddress, planetContractAddress)
        .call();
      let planets = [];
      planets = await planetContract?.methods
        .getPlanetTokens(memberAddress)
        .call();

      // planets.forEach((planet: IPlanet) => {
      //   axios.post(`${apiBaseUrl}/planet/regist`, {
      //     createdAt: planet.createdAt,
      //     onSale: planet.onSale,
      //     ownerMemberId: data.responseData.memberId,
      //     planetName: planet.planetName,
      //     planetNftId: planet.planetTokenId,
      //     planetType: planet.planetType,
      //   });
      // });

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

      const chainData: any[] = await flowerContract?.methods
        .getRoseTokens(memberAddress)
        .call();

      console.log('채인데이터', chainData);
      const {
        data: { responseData: allFlowers },
      } = await axios.get(
        `https://j8a208.p.ssafy.io/api/member/${data.responseData.memberId}/flowers`
      );
      const allFlowersMap = allFlowers?.map(
        (flower: any) => flower.flowerNftId
      );

      const filteredData = chainData?.filter(
        flower => !allFlowersMap?.includes(+flower.roseTokenId)
      );

      filteredData?.forEach(flower => {
        axios.post('https://j8a208.p.ssafy.io/api/flower', {
          createdAt: flower.createdAt,
          flowerNftId: flower.roseTokenId,
          flowerType: +flower.roseType,
          onSale: flower.onSale,
          ownerMemberId: data.responseData.memberId,
        });
      });

      setUser({ ...data.responseData, planets, isApproved, eth: +eth });
    };

    handleAccount();
    window.ethereum?.on('accountsChanged', handleAccount);
    window.ethereum?.on('chainChanged', handleAccount);
    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccount);
      window.ethereum?.removeListener('chainChanged', handleAccount);
    };
  }, [planetContract, flowerContract, setUser]);
  console.log('USER CONTROLLER');
  return <></>;
}

export default UserController;

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
      await setTimeout(() => {}, 1000);
      const memberAddress = await window.ethereum?.selectedAddress;

      if (!memberAddress || window.ethereum.networkVersion != 11155111) {
        console.log('리턴 잘 대나?');
        setUser(null);
        return;
      }
      const { data } = await axios.post(
        'https://j8a208.p.ssafy.io/api/member',
        {
          memberAddress,
        }
      );
      const id = data.responseData.memberId;
      const planetContractAddress =
        '0x03DD8A0273a3ED1C15Dad07ec87f74861e6e355C';
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
      } = await axios.get(`https://j8a208.p.ssafy.io/api/member/${id}/flowers`);
      const allFlowersMap = allFlowers?.map(
        (flower: IRose) => flower.flowerNftId
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
  return <></>;
}

export default UserController;

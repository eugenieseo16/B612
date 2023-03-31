import axios from 'axios';

import { planetAPIUrls } from './apiURLs';
import { useMyQuery } from '../hooks/useMyQuery';
// import { usePlanetContract } from '@components/contracts/planetToken';

// export const usePlanetDetailAPI = async (planetId: string) => {
//   const planetContract = usePlanetContract();
//   const planetDetail = await planetContract?.methods
//     .b612AddressMap(planetId)
//     .call();

//   return planetDetail;
// };

// 랜덤 사용자 id
export const useRandomUserAPI = (memberId: any) => {
  const response = useMyQuery(
    `${planetAPIUrls.getPlanetAPIUrl}/random/${memberId}`
  );
  return response?.responseData?.memberId;
};

// 나의 랜덤 행성 nft id
export const useMyRandomPlanetAPI = (memberId: any) => {
  const response = useMyQuery(
    `${planetAPIUrls.getPlanetAPIUrl}/${memberId}/planet/random`
  );
  return response?.responseData?.planetNftId;
};

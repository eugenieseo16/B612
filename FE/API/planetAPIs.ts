import axios from 'axios';

import { planetAPIUrls } from './apiURLs';
import { useMyQuery } from '../hooks/useMyQuery';

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

  // 보유 행성이 없을 때
  if (response?.responseData === null) {
    return 1;
  } else {
    return response?.responseData?.planetNftId;
  }
};

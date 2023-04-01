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

// 행성 좋아요/싫어요
export const likePlanetAPI = (data: any) => {
  const response = axios.post(`${planetAPIUrls.likePlanetAPIUrl}`, data);
  return response;
};

export const useIsLikedPlanetAPI = (memberId: any, planetId: any) => {
  const response = useMyQuery(
    `${planetAPIUrls.isLikedPlanetAPIUrls}?memberId=${memberId}&planetId=${planetId}`
  );
  return response?.responseData;
};

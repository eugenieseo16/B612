import axios from 'axios';

import { planetAPIUrls } from './apiURLs';
import { useMyQuery } from '../hooks/useMyQuery';
import { useQuery } from 'react-query';

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

export const useIsLikedPlanetAPI = (memberId: number, planetId: number) => {
  const url = `${planetAPIUrls.isLikedPlanetAPIUrls}?memberId=${memberId}&planetId=${planetId}`;
  const { data } = useQuery(url, () => {
    if (!memberId || !planetId) return { responseData: false };
    return fetch(url).then(res => res.json());
  });
  return data?.responseData;
};

// 행성 소유주 정보
export const usePlanetOwnerAPI = (memberAddress?: string | null) => {
  const url = `${planetAPIUrls.getPlanetAPIUrl}?memberAddress=${memberAddress}`;
  const { data } = useQuery(url, () => {
    if (!memberAddress) return { responseData: null };
    return fetch(url).then(res => res.json());
  });
  return data?.responseData;
};

// 행성 정보
export const usePlanetDetailAPI = (planetId: any) => {
  const response = useMyQuery(
    `${planetAPIUrls.getPlanetDetailAPIUrl}/${planetId}`
  );
  return response?.responseData;
};

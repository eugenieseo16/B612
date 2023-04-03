import axios from 'axios';

import { useMyQuery } from '../hooks/useMyQuery';
import { rankingAPIUrls } from './apiURLs';

export const PlanetRankingAPI = () => {
  const response = useMyQuery(rankingAPIUrls.planetRankingAPIUrl);
  return response;
};

export const MemberRankingAPI = () => {
  const response = useMyQuery(rankingAPIUrls.memberRankingAPIUrl);
  return response;
};

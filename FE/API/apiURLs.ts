export const apiBaseUrl = 'https://j8a208.p.ssafy.io/api';

export const rankingAPIUrls = {
  memberRankingAPIUrl: `${apiBaseUrl}/member/ranking?page=0&size=100`,
  planetRankingAPIUrl: `${apiBaseUrl}/planet/ranking?page=0&size=100`,
};

export const friendAPIUrls = {
  getFriendsAPIUrl: `${apiBaseUrl}/friend/`,
};

export const planetAPIUrls = {
  getPlanetAPIUrl: `${apiBaseUrl}/member`,
  // getMyRandomPlanetUrl: `${apiBaseUrl}/member`,
};

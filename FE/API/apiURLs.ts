export const apiBaseUrl = 'https://j8a208.p.ssafy.io/api';

export const rankingAPIUrls = {
  memberRankingAPIUrl: `${apiBaseUrl}/member/ranking?page=0&size=100`,
  planetRankingAPIUrl: `${apiBaseUrl}/planet/ranking?page=0&size=100`,
};

export const friendAPIUrls = {
  getFriendsAPIUrl: `${apiBaseUrl}/friend`,
  requestFriendAPIUrl: `${apiBaseUrl}/friend`,
  isFriend: `${apiBaseUrl}/friend`,
  requestedFriendAPIUrl: `${apiBaseUrl}/friend/unresponse`,
  deleteFriendUrl: `${apiBaseUrl}/friend`,
  acceptFriendUrl: `${apiBaseUrl}/friend/accept`,
  unresponseFriendAPIUrl: `${apiBaseUrl}/friend/request`,
};
export const memberAPIUrls = {
  putNicknameAPIUrl: `${apiBaseUrl}/member/nickname`,
  searchByNameAPIUrl: `${apiBaseUrl}/member/search`,
};

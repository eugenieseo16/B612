import { friendAPIUrls } from 'API/apiURLs';
import { useQuery } from 'react-query';
import axios from 'axios';

import { useMyQuery } from '../hooks/useMyQuery';

export const useFriendAPI = (memberId?: number) => {
  const url = `${friendAPIUrls.getFriendsAPIUrl}/${memberId}?page=0&size=100`;

  const { data: userData } = useQuery(url, async () => {
    if (!memberId) return { responseData: [] };
    return fetch(url).then(res => res.json());
  });
  return userData;
};

export const useIsFriendAPI = (requestId?: number, responseId?: number) => {
  const { data: userData } = useQuery(
    `${friendAPIUrls.isFriend}?requestId=${requestId}&responseId=${responseId}`,
    () => {
      if (!requestId || !responseId) return false;
      return fetch(
        `${friendAPIUrls.isFriend}?requestId=${requestId}&responseId=${responseId}`
      ).then(res => res.json());
    }
  );

  if (userData?.responseData) {
    if (userData?.responseData.friendAccepted === 1) {
      return 'friend';
    } else {
      return 'notAccepted';
    }
  } else if (userData?.responseData === false) {
    return 'notLogin';
  } else {
    return 'notRequest';
  }
};

export const requestFriendAPI = async (
  friendRequestMemberId?: number,
  friendResponseMemberId?: number
) => {
  if (!friendRequestMemberId || !friendResponseMemberId) return;
  const { data } = await axios.post(`${friendAPIUrls.requestFriendAPIUrl}`, {
    friendRequestMemberId,
    friendResponseMemberId,
  });
  return data;
};

export const useRequestedFriendsListAPI = (memberId?: number) => {
  const url = `${friendAPIUrls.requestedFriendAPIUrl}/${memberId}?page=0&size=100`;
  const { data: userData } = useQuery(url, async () => {
    if (!memberId) return { responseData: [] };
    return fetch(url).then(res => res.json());
  });
  return userData?.responseData;
};

export const deleteFriend = (friendMemberId?: number, myId?: number) => {
  if (!friendMemberId || !myId) return;
  axios.delete(`${friendAPIUrls.deleteFriendUrl}`, {
    params: { friendMemberId, myId },
  });
};

export const useUnresponseFriend = (memberId?: number) => {
  const url = `${friendAPIUrls.unresponseFriendAPIUrl}/${memberId}?page=0&size=100`;
  const { data: userData } = useQuery(url, async () => {
    if (!memberId) return { responseData: [] };
    return fetch(url).then(res => res.json());
  });
  return userData?.responseData;
};

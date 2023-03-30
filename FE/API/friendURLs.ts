import axios from 'axios';

import { useMyQuery } from '../hooks/useMyQuery';
import { friendAPIUrls } from './apiURLs';

export const useFriendAPI = (memberId: any) => {
  const response = useMyQuery(
    `${friendAPIUrls.getFriendsAPIUrl}/${memberId}?page=0&size=100`
  );
  return response;
};

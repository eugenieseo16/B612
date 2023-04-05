import axios from 'axios';

import { useMyQuery } from '../hooks/useMyQuery';
import { memberAPIUrls } from './apiURLs';
import { useQuery } from 'react-query';

type Props = {
  changedNickname: string;
  memberId: number;
};
export const changeNickNameAPI = async (income: Props) => {
  const { data } = await axios.put(
    `${memberAPIUrls.putNicknameAPIUrl}`,
    income
  );
  return data;
};
export const useSearchByNameAPI = (name: string) => {
  const response = useMyQuery(
    `${memberAPIUrls.searchByNameAPIUrl}/${name ? name : 1}`
  );
  return response;
};

export const useUserById = (memberId?: number | string | string[]) => {
  const { data } = useQuery(`user/${memberId}`, () => {
    if (!memberId) return;
    return fetch(`${memberAPIUrls.userByIdUrl}/${memberId}`).then(res =>
      res.json()
    );
  });
  return data?.responseData;
};

export const useFlowersById = (memberId?: number | string) => {
  const { data } = useQuery(`user/${memberId}/flowers`, () => {
    if (!memberId) return;
    return fetch(`${memberAPIUrls.userByIdUrl}/${memberId}/flowers`).then(res =>
      res.json()
    );
  });
  return data?.responseData;
};

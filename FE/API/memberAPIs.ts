import axios from 'axios';

import { useMyQuery } from '../hooks/useMyQuery';
import { memberAPIUrls } from './apiURLs';

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

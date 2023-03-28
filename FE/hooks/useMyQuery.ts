import { fetchDataWithUrl } from '../utils/utils';
import { useQuery } from 'react-query';

export const useMyQuery = (url: string) => {
  const { data } = useQuery(url, fetchDataWithUrl(url));
  return data ? data.data : data;
};

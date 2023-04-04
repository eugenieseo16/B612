import { useQuery } from 'react-query';
import { apiBaseUrl } from './apiURLs';

export const useMyInventory = (memberId?: number | string) => {
  const { data } = useQuery(
    `${apiBaseUrl}/member/${memberId}/inventory`,
    () => {
      if (!memberId) return { responseData: [] };
      return fetch(`${apiBaseUrl}/member/${memberId}/inventory`).then(res =>
        res.json()
      );
    }
  );
  return data?.responseData;
};

export const usePlantedFlowers = (memberId?: number | string) => {
  const { data } = useQuery(`${apiBaseUrl}/flower/field/${memberId}`, () => {
    if (!memberId) return { responseData: [] };
    return fetch(`${apiBaseUrl}/flower/field/${memberId}`).then(res =>
      res.json()
    );
  });
  return data?.responseData;
};

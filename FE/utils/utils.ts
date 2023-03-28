import axios from 'axios';

export const fetchDataWithUrl = (url: string) => async () => await axios(url);

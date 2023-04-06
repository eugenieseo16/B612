import axios from 'axios';

export const fetchDataWithUrl = (url: string) => async () => await axios(url);
export const PLANETS_LIST = [
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680075866/1.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680075786/2.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680587681/cake.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680587592/cube.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680075592/5.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680076957/6.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680076957/7.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680076263/8.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680075782/3.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680075792/11.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1679556189/10.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1679556100/12.glb',
];

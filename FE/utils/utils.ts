import axios from 'axios';

export const fetchDataWithUrl = (url: string) => async () => await axios(url);
export const PLANETS_LIST = [
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680826429/wp4lryjfab7b2uz6zrtq.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680075786/2.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680587681/cake.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680587592/cube.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680075592/5.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680826428/wapyi45vb2ektjgs2ep0.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680076957/7.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680076263/8.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680075782/3.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680826428/zvzumr1ixicpuupdlone.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680075792/11.glb',
  'https://res.cloudinary.com/dohkkln9r/image/upload/v1680787380/diamond_planet.glb',
];

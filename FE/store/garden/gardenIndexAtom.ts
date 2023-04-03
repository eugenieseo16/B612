import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const gardenIndexAtom = atom({
  key: `gardenIndexAtomKey_${uuidv4()}`,
  default: -1,
});

export default gardenIndexAtom;

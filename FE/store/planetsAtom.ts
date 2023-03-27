import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const planetAtom = atom<IPlanet[]>({
  key: `planetAtomKey_${uuidv4()}`,
  default: [],
});

export default planetAtom;

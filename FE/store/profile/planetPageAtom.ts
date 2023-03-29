import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
const planetPageAtom = atom({
  key: `planetPageAtomKey_${uuidv4()}`,
  default: 0,
});

export default planetPageAtom;

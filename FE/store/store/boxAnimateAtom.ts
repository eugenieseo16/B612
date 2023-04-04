import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const boxAnimateAtom = atom({
  key: `boxAnimateAtomKey_${uuidv4()}`,
  default: false,
});

export default boxAnimateAtom;

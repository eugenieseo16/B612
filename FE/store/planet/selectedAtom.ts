import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const selectedAtom = atom({
  key: `selectedAtomKey_${uuidv4()}`,
  default: false,
});

export default selectedAtom;

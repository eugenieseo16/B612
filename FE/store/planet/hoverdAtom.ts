import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const hoverdAtom = atom({
  key: `hoverdAtomKey_${uuidv4()}`,
  default: false,
});

export default hoverdAtom;

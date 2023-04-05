import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const loadingAtom = atom({
  key: `loadingAtomKey_${uuidv4()}`,
  default: false,
});

export default loadingAtom;

import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const storeAnimateAtom = atom({
  key: `storeAnimateAtomKey_${uuidv4()}`,
  default: false,
});

export default storeAnimateAtom;

import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const storeIndexAtom = atom({
  key: `storeIndexAtomKey_${uuidv4()}`,
  default: { page: 0, index: 0 },
});

export default storeIndexAtom;

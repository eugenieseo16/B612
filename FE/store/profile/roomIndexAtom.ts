import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
const roomIndexAtom = atom({
  key: `roomIndexAtomKey_${uuidv4()}`,
  default: 0,
});

export default roomIndexAtom;

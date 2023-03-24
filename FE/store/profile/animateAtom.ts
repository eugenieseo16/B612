import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
const animateAtom = atom({
  key: `animateAtomKey_${uuidv4()}`,
  default: false,
});

export default animateAtom;

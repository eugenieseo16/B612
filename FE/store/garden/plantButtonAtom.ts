import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const plantButtonAtom = atom({
  key: `plantButtonAtomKey_${uuidv4()}`,
  default: { show: false, hold: false },
});

export default plantButtonAtom;

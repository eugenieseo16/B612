import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const tetrisModalAtom = atom({
  key: `tetrisModalAtomKey_${uuidv4()}`,
  default: false,
});

export default tetrisModalAtom;

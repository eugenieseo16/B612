import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const storeCameraPosAtom = atom({
  key: `storeCameraPosAtomKey_${uuidv4()}`,
  default: [],
});

export default storeCameraPosAtom;

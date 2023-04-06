import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const digTargetAtom = atom<IFlower | null>({
  key: `digTargetAtomKey_${uuidv4()}`,
  default: null,
});

export default digTargetAtom;

import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const selectedFlowerAtom = atom<IFlower | null>({
  key: `selectedFlowerAtomKey_${uuidv4()}`,
  default: null,
});

export default selectedFlowerAtom;

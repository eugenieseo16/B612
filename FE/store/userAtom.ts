import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const userAtom = atom<IUser | null>({
  key: `userAtomKey_${uuidv4()}`,
  default: null,
});

export default userAtom;

import { atom } from 'recoil';
const userAtom = atom<IUser | null>({
  key: 'userAtom',
  default: null,
});

export default userAtom;

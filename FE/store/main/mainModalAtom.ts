import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

interface IModal {
  friend: boolean;
  certificate: boolean;
}

const mainModalAtom = atom<IModal>({
  key: `mainModalAtomKey_${uuidv4()}`,
  default: { friend: false, certificate: false },
});

export default mainModalAtom;

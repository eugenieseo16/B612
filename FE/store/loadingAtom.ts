import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

interface ILoading {
  loading: boolean;
  type: string;
  message?: string;
}

const loadingAtom = atom<ILoading>({
  key: `loadingAtomKey_${uuidv4()}`,
  default: { loading: false, type: 'none' },
});

export default loadingAtom;

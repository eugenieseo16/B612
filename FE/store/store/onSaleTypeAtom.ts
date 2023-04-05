import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const onSaleTypeAtom = atom<'planet' | 'flower'>({
  key: `onSaleTypeAtomKey_${uuidv4()}`,
  default: 'planet',
});

export default onSaleTypeAtom;

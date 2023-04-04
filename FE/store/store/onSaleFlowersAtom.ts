import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const onSaleFlowersAtom = atom<IFlower[]>({
  key: `onSaleFlowersAtomKey_${uuidv4()}`,
  default: [],
});

export default onSaleFlowersAtom;

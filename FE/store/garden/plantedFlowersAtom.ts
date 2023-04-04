import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const plantedFlowersAtom = atom<IFlower[]>({
  key: `plantedFlowersAtomKey_${uuidv4()}`,
  default: [],
});

export default plantedFlowersAtom;

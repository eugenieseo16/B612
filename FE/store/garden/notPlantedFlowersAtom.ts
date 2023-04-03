import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const notPlantedFlowersAtom = atom<IFlower[]>({
  key: `notPlantedFlowersAtomKey_${uuidv4()}`,
  default: [],
});

export default notPlantedFlowersAtom;

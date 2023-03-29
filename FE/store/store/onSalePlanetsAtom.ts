import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const onSalePlanetsAtom = atom<IPlanet[]>({
  key: `onSalePlanetsAtomKey_${uuidv4()}`,
  default: [],
});

export default onSalePlanetsAtom;

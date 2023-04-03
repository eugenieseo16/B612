import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const selectedPlanetAtom = atom({
  key: `selectedPlanetAtomKey_${uuidv4()}`,
  default: -1,
});

export default selectedPlanetAtom;

import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

const positionAtom = atom<{ x: number; y: number; z: number }>({
  key: `positionAtomKey_${uuidv4()}`,
  default: { x: 0, y: 0, z: 0 },
});

export default positionAtom;

import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

interface Position {
  x: number;
  z: number;
}

const positionAtom = atom<Position>({
  key: `positionAtomKey_${uuidv4()}`,
  default: { x: 0, z: 0 },
});

export { positionAtom };
export type { Position };

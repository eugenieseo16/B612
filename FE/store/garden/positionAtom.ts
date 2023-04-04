import { atom } from 'recoil';
import { Vector3 } from 'three';
import { v4 as uuidv4 } from 'uuid';

const positionAtom = atom<Vector3>({
  key: `positionAtomKey_${uuidv4()}`,
  default: new Vector3(),
});

export default positionAtom;

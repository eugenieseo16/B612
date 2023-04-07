import { atom } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
  selected: boolean;
  hoverd: boolean;
}
const likeButtonAtom = atom<IProps>({
  key: `likeButtonAtomKey_${uuidv4()}`,
  default: { selected: false, hoverd: false },
});

export default likeButtonAtom;

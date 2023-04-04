import { useState, useEffect } from 'react';

export const UseInput = () => {
  const [input, setInput] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    shift: false,
    // jump: false,
  });

  const keys: any = {
    KeyW: 'forward',
    KeyS: 'backward',
    KeyA: 'left',
    KeyD: 'right',
    ShiftLeft: 'shift',
    // Space: 'jump',
  };

  const findKey = (key: string) => {
    if (Object.keys(keys).includes(key)) {
      return keys[key];
    }
    return;
  };

  useEffect(() => {
    // 키보드가 눌리면 눌린 키에 해당하는 코드가 있는 지 찾고, false를 true로 바꾼다
    const handleKeyDown = (e: KeyboardEvent) => {
      setInput(m => ({ ...m, [findKey(e.code)]: true }));
    };
    // 키보드가 떼지면 다시 false 로 변경
    const handleKeyUp = (e: KeyboardEvent) => {
      setInput(m => ({ ...m, [findKey(e.code)]: false }));
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return input;
};

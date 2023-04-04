// 캐릭터가 갈수있는 영역좌표 설정하기
const isInAllowedArea = (x: number, z: number): boolean => {
  if (x < -8 && x >= -23) {
    if ((z >= 16 && z <= 40) || (z >= -48 && z <= -16)) {
      return true;
    }
  } else if (x >= -8 && x <= 26) {
    if (z >= -23 && z <= 40) {
      return true;
    }
  } else if (x > 26 && x <= 48) {
    if (z >= -48 && z <= -17) {
      return true;
    }
  } else if (x > 48 && x < 106) {
    if (z >= -48 && z <= 40) {
      return true;
    }
  }
  return false;
};

// directionOffset 함수에 전달되는 인자의 타입
type DirectionOffsetProps = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
};

const directionOffset = ({
  forward,
  backward,
  left,
  right,
}: DirectionOffsetProps) => {
  var directionOffset = 0; // w
  if (forward) {
    if (left) {
      directionOffset = Math.PI / 4; // w+a
    } else if (right) {
      directionOffset = -Math.PI / 4; // w+d
    }
  } else if (backward) {
    if (left) {
      directionOffset = Math.PI / 4 + Math.PI / 2; // s+a
    } else if (right) {
      directionOffset = -Math.PI / 4 - Math.PI / 2; // s+d
    } else {
      directionOffset = Math.PI; // s
    }
  } else if (left) {
    directionOffset = Math.PI / 2; // a
  } else if (right) {
    directionOffset = -Math.PI / 2; // d
  }

  return directionOffset;
};

// modal 영역 설정하기 (테트리스)
const isTetrisModalArea = (x: number, z: number): boolean => {
  if (x <= -18 && x >= -23 && z >= -48 && z <= -45) {
    return true;
  } else if (x <= 38 && x >= 33 && z >= -45 && z <= -43) {
    return true;
    // } else if (x <= -18 && x >= -23 && z >= 16 && z <= 20) {
    //   return true;
  }
  return false;
};

// modal 영역 설정하기 (사과게임)
const isAppleModalArea = (x: number, z: number): boolean => {
  if (x <= 29 && x >= 27 && z >= -48 && z <= -45) {
    return true;
  }
  return false;
};

// modal 영역 설정하기 (바오밥)
const isBaobabModalArea = (x: number, z: number): boolean => {
  if (x <= 72 && x >= 67 && z >= -6 && z <= -3) {
    return true;
  }
  return false;
};

export {
  isInAllowedArea,
  directionOffset,
  isTetrisModalArea,
  isAppleModalArea,
  isBaobabModalArea,
};

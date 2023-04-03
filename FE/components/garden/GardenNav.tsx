import React from 'react';
import styled from '@emotion/styled';
import GlowingButton from '@components/common/GlowingButton';
import { useSetRecoilState } from 'recoil';
import gardenIndexAtom from 'store/garden/gardenIndexAtom';

function GardenNav() {
  const setGardenIndex = useSetRecoilState(gardenIndexAtom);
  return (
    <FloatingButtons>
      <GlowingButton
        onClick={() => setGardenIndex(0)}
        icon="item"
        bgColor="#000"
      />
    </FloatingButtons>
  );
}

export default GardenNav;

const FloatingButtons = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 9;

  > div {
    padding: 1rem 0rem;
  }
`;

import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  ButtonBase,
} from '@mui/material';
import roomIndexAtom from 'store/profile/roomIndexAtom';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import GlowingButton from '@components/common/GlowingButton';

const FloatingButtons = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 9;

  > div {
    padding: 1rem 0rem;
  }
`;

function RoomNav() {
  const ROOM = ['HOME', 'DESKTOP', 'PLANETS', 'GARDEN'];
  const [roomIndex, setRoomIndex] = useRecoilState(roomIndexAtom);
  return (
    <FloatingButtons>
      <GlowingButton
        onClick={() => setRoomIndex(0)}
        selected={roomIndex === 0}
        icon={'friend'}
      />
      <GlowingButton
        onClick={() => setRoomIndex(1)}
        selected={roomIndex === 1}
        icon={'friend'}
      />
      <GlowingButton
        onClick={() => setRoomIndex(2)}
        selected={roomIndex === 2}
        icon={'planet'}
      />
      <GlowingButton
        onClick={() => setRoomIndex(3)}
        selected={roomIndex === 3}
        icon={'plant'}
      />
    </FloatingButtons>
  );
}

export default RoomNav;

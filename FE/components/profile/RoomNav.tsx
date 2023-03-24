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

function RoomNav() {
  const ROOM = ['HOME', 'DESKTOP', 'PLANETS', 'GARDEN'];
  const [roomIndex, setRoomIndex] = useRecoilState(roomIndexAtom);
  return (
    <div
      style={{
        position: 'fixed',
        right: '0',
        top: '5rem',
        padding: '0 1rem',
        width: '20rem',
        maxWidth: '30%',
        height: '100%',
        background: '#fff',
      }}
    >
      <List component="nav" aria-label="mailbox folders">
        {ROOM.map((text, i) => (
          <div key={i}>
            <ButtonBase sx={{ width: '100%' }} onClick={() => setRoomIndex(i)}>
              <ListItem>
                <ListItemText>{text}</ListItemText>
              </ListItem>
            </ButtonBase>
            <Divider />
          </div>
        ))}
      </List>
      {roomIndex}
    </div>
  );
}

export default RoomNav;

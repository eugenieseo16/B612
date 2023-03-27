import { useEffect } from 'react';
import styled from '@emotion/styled';
import { colors } from 'styles/colors';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import defaultImg from 'assets/imgs/cryptoPunk1.png';
import { useSetRecoilState } from 'recoil';

import RoomNav from './RoomNav';
import { rgba } from 'emotion-rgba';
import roomIndexAtom from 'store/profile/roomIndexAtom';

function ProfileModal({ user }: { user: IUser | null }) {
  const setRoomIndex = useSetRecoilState(roomIndexAtom);

  return (
    <Container>
      <RoomNav />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <AvatarContainer>
          <button onClick={() => setRoomIndex(0)}>이전</button>

          <Avatar
            src={user?.memberImage}
            sx={{ width: '4rem', height: '4rem' }}
          />

          <h1>{user?.memberNickname}</h1>
        </AvatarContainer>
      </div>

      <div>
        <p>친구목록</p>
        <List
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '50% 50%',
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(el => (
            <ListItem key={el}>
              <ListItemAvatar>
                <Avatar src={defaultImg.src}>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
          ))}
        </List>
      </div>
    </Container>
  );
}

export default ProfileModal;

const AvatarContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 5vh 5vw 15vh 5vw;
  background-color: ${rgba(colors.blue, 0.4)};
  h1,
  span,
  p,
  a {
    font-family: 'pixel';
  }
  a {
    color: ${colors.blue};
  }
`;

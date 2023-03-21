import styled from '@emotion/styled';
import { colors } from 'styles/colors';
import {
  Avatar,
  AvatarGroup,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

import { useRecoilValue } from 'recoil';
import roomIndexAtom from 'store/profile/roomIndexAtom';
import defaultImg from 'assets/imgs/cryptoPunk1.png';

function ProfileModal() {
  const roomIndex = useRecoilValue(roomIndexAtom);
  return (
    <Container>
      <AvatarContainer>
        <Avatar src={defaultImg.src} sx={{ width: '4rem', height: '4rem' }} />
        <h1>내이름</h1>
      </AvatarContainer>
      <p>보유 코인 : 11.12980 GoerliETH</p>
      <div>
        <span>충전하러 가기 </span>
        <a>https://goerlifaucet.com/</a>
      </div>

      <div>
        <p>받은 친구요청</p>
        <div style={{ display: 'flex', margin: '1rem 0' }}>
          <AvatarGroup max={4}>
            <Avatar alt="Remy Sharp" src={defaultImg.src} />
            <Avatar alt="Travis Howard" src={defaultImg.src} />
            <Avatar alt="Cindy Baker" src={defaultImg.src} />
            <Avatar alt="Agnes Walker" src={defaultImg.src} />
            <Avatar alt="Trevor Henderson" src={defaultImg.src} />
          </AvatarGroup>
        </div>
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 5vh 0 0 5vw;
  color: #fff;
  h1,
  span,
  p,
  a {
    color: #fff;
    font-family: 'pixel';
  }
  a {
    color: ${colors.blue};
  }
`;

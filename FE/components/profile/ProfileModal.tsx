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
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useState } from 'react';

import RoomNav from './RoomNav';
import { rgba } from 'emotion-rgba';
import roomIndexAtom from 'store/profile/roomIndexAtom';
import left from '../../assets/imgs/buttonIcons/chevron-left.svg';
import { requestFriendAPI, useFriendAPI, useIsFriendAPI } from 'API/friendURLs';
import userAtom from 'store/userAtom';

function ProfileModal({ user }: { user: IUser | null }) {
  const me = useRecoilValue(userAtom);
  const [submit, setSubmit] = useState(false);
  const setRoomIndex = useSetRecoilState(roomIndexAtom);
  const friends = useFriendAPI(user?.memberId);
  const isFriend = useIsFriendAPI(me?.memberId, user?.memberId);
  console.log('IS FRIENDS', friends?.responseData);

  const requestFriend = () => {
    if (submit) return;
    setSubmit(true);
    requestFriendAPI(me?.memberId, user?.memberId);
  };
  return (
    <>
      <RoomNav />
      <Container>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <AvatarContainer>
            <Button onClick={() => setRoomIndex(0)}>
              <img
                src={left.src}
                alt=""
                style={{ width: '2rem', height: '2rem' }}
              />
            </Button>

            <Avatar
              src={user?.memberImage}
              sx={{ width: '4rem', height: '4rem' }}
            />

            <h1>{user?.memberNickname}</h1>
          </AvatarContainer>
          {isFriend === 'notRequest' && !submit ? (
            <FriendButton onClick={requestFriend}>친구신청</FriendButton>
          ) : isFriend === 'notAccepted' || submit ? (
            <FriendButton disabled style={{ background: 'grey' }}>
              수락대기중
            </FriendButton>
          ) : isFriend === 'friend' ? (
            <Button
              style={{
                width: '3rem',
                backgroundColor: colors.yellow,
                borderRadius: '8px',
              
              }}
            >
              친구
            </Button>
          ) : null}
        </div>

        {friends?.responseData.length > 0 ? (
          <div>
            <p>친구목록</p>
            <List
              sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '50% 50%',
              }}
            >
              {friends?.responseData.map((user: IUser) => (
                <ListItem key={user?.memberAddress}>
                  <ListItemAvatar>
                    <Avatar src={user.memberImage}>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.memberNickname}
                    secondary={user.memberTierName}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        ) : (
          <h2>친구 좀 나가서 사귀세요,,, ㅡ,ㅡ</h2>
        )}
      </Container>
    </>
  );
}

export default ProfileModal;
const Button = styled.button`
  background: none;
  border: none;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FriendButton = styled(Button)`
  width: 5rem;
  background-color: ${colors.purple};
  border-radius: 1rem;
`;
const AvatarContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
const Container = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
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

  @media (max-width: 500px) {
    padding: 2rem 1rem 2rem 1rem;
  }
`;

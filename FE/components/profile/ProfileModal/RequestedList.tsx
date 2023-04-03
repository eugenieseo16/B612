import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

import {
  deleteFriend,
  requestFriendAPI,
  useRequestedFriendsListAPI,
} from 'API/friendURLs';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import styled from '@emotion/styled';
import { useState } from 'react';

function RequestedList() {
  const me = useRecoilValue(userAtom);
  const requestedFriends = useRequestedFriendsListAPI(me?.memberId);
  const [deletedList, setDeletedList] = useState<number[]>([]);

  const cancelRequest = (friend: IUser) => () => {
    deleteFriend(friend.memberId, me?.memberId);
    setDeletedList([...deletedList, friend.memberId]);
  };

  const allowRequest = (friend: IUser) => () => {
    requestFriendAPI(me?.memberId, friend.memberId);
    setDeletedList([...deletedList, friend.memberId]);
  };

  return (
    <div>
      <p>받은 친구요청</p>
      {requestedFriends?.length > 0 ? (
        <List
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '50% 50%',
          }}
        >
          {requestedFriends.map((friend: IUser) => {
            if (deletedList.includes(friend.memberId)) return;
            return (
              <ListItem key={friend.memberAddress}>
                <ListItemAvatar>
                  <Avatar src={friend.memberImage} />
                </ListItemAvatar>
                <ListItemText primary={friend.memberNickname} />
                <div style={{ display: 'flex' }}>
                  <Button
                    onClick={cancelRequest(friend)}
                    style={{ background: 'tomato' }}
                  >
                    <ClearIcon fontSize="small" sx={{ color: 'white' }} />
                  </Button>
                  <Button
                    onClick={allowRequest(friend)}
                    style={{ background: 'green' }}
                  >
                    <DoneIcon fontSize="small" sx={{ color: 'white' }} />
                  </Button>
                </div>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <div>받은 친구 요청이 없습니다</div>
      )}
    </div>
  );
}

export default RequestedList;
const Button = styled.button`
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
`;

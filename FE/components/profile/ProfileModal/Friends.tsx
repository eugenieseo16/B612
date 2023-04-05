import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import { useRouter } from 'next/router';
import { useFriendAPI } from 'API/friendAPIs';

function Friends() {
  const me = useRecoilValue(userAtom);
  const friends = useFriendAPI(me?.memberId);
  const router = useRouter();

  return (
    <>
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
                <ListItemAvatar
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/profile/${user.memberId}`)}
                >
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
    </>
  );
}

export default Friends;

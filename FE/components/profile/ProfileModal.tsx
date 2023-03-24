import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { colors } from 'styles/colors';
import {
  Avatar,
  AvatarGroup,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Input,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import defaultImg from 'assets/imgs/cryptoPunk1.png';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import axios from 'axios';

interface IEditData {
  memberNickname: string;
  memberImage?: string;
}
function ProfileModal({ user }: { user: IUser | null }) {
  const [me, setMe] = useRecoilState(userAtom);

  const defaultData: IEditData = {
    memberNickname: me?.memberNickname ? me?.memberNickname : '',
    memberImage: me?.memberImage,
  };

  const [imageData, setImageData] = useState<File | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(defaultData);

  useEffect(() => {
    return () => {
      if (!me) return;
      setMe({ ...me, ...editValue });
    };
  }, []);
  console.log(editValue);

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <AvatarContainer>
          {!isEdit ? (
            <Avatar
              src={me?.memberImage}
              sx={{ width: '4rem', height: '4rem' }}
            />
          ) : (
            <>
              <label htmlFor="upload-profile">
                <Avatar
                  src={editValue.memberImage}
                  sx={{ width: '4rem', height: '4rem', cursor: 'pointer' }}
                />
              </label>
              <input
                onChange={e => {
                  setEditValue({
                    ...editValue,
                    memberImage: URL.createObjectURL(e.target.files[0]),
                  });
                  setImageData(e.target.files[0]);
                }}
                type="file"
                id="upload-profile"
                style={{ display: 'none' }}
              />
            </>
          )}
          {!isEdit ? (
            <h1>{editValue?.memberNickname}</h1>
          ) : (
            <Input
              onChange={e =>
                setEditValue({ ...editValue, memberNickname: e.target.value })
              }
              defaultValue={editValue?.memberNickname}
              inputProps={{ 'aria-label': 'description' }}
              sx={{ fontSize: '2.5rem', fontFamily: 'pixel' }}
            />
          )}
        </AvatarContainer>
        {!isEdit ? (
          <button onClick={() => setIsEdit(true)}>수정</button>
        ) : (
          <div>
            <button
              onClick={() => {
                setIsEdit(false);
                setEditValue(defaultData);
              }}
            >
              취소
            </button>
            <button
              onClick={() => {
                // axios
                setEditValue({ ...me, ...editValue });

                setIsEdit(false);
              }}
            >
              등록
            </button>
          </div>
        )}
      </div>
      {me?.memberAddress === user?.memberAddress && (
        <>
          <p>보유 코인 : {user?.eth} GoerliETH</p>
          <div>
            <span>충전하러 가기 </span>
            <a>https://goerlifaucet.com/</a>
          </div>
        </>
      )}

      <div>
        {me?.memberAddress === user?.memberAddress && (
          <>
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
          </>
        )}
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
  padding: 5vh 0 15vh 5vw;
  background-color: rgba(255, 255, 255, 0.6);
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

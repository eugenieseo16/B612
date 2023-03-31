import { useState } from 'react';
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
import { useRecoilState, useSetRecoilState } from 'recoil';
import userAtom from 'store/userAtom';
import RoomNav from './RoomNav';
import { rgba } from 'emotion-rgba';
import roomIndexAtom from 'store/profile/roomIndexAtom';
import { usePlanetContract } from '@components/contracts/planetToken';
import { changeNickNameAPI } from 'API/memberAPIs';
import left from '../../assets/imgs/buttonIcons/chevron-left.svg';

interface IEditData {
  memberNickname: string;
  memberImage?: string;
}
function MyProfileModal() {
  const setRoomIndex = useSetRecoilState(roomIndexAtom);
  const planetContract = usePlanetContract();

  const [me, setMe] = useRecoilState(userAtom);

  const defaultData: IEditData = {
    memberNickname: me?.memberNickname ? me?.memberNickname : '',
    memberImage: me?.memberImage,
  };

  const [imageData, setImageData] = useState<File | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(defaultData);

  const toggleApproval = () => {
    planetContract.methods
      .setApprovalForAll(
        '0xeab8b1e0cd0de0c9e07928d8d8c9aab166ae983e',
        !me?.isApproved
      )
      .send({ from: me?.memberAddress });
  };

  return (
    <Container>
      <RoomNav />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <AvatarContainer>
          <Button onClick={() => setRoomIndex(0)}>
            <img
              src={left.src}
              alt=""
              style={{ width: '2rem', height: '2rem' }}
            />
          </Button>
          {!isEdit ? (
            <Avatar
              src={editValue?.memberImage}
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
                  if (!e.target.files) return;
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
          <FriendButton onClick={() => setIsEdit(true)}>수정</FriendButton>
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
                if (!me) return;
                setEditValue({ ...me, ...editValue });
                setIsEdit(false);
                setMe({ ...me, ...editValue });

                changeNickNameAPI({
                  changedNickname: editValue.memberNickname,
                  memberId: me.memberId,
                });
                console.log(imageData);
              }}
            >
              등록
            </button>
          </div>
        )}
      </div>
      <>
        <p>보유 코인 : {me?.eth} GoerliETH</p>
        <div>
          <span>충전하러 가기 </span>
          <a>https://goerlifaucet.com/</a>
        </div>
        <p>Approval : {me?.isApproved ? '수락' : '거부'}</p>
        <button onClick={toggleApproval}>toggle Approval</button>
      </>
      <div>
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

export default MyProfileModal;

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

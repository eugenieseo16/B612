import React from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';

import styled from '@emotion/styled';
import { GetFriendAPI } from 'API/friendAPIs';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import Divider from '@mui/material/Divider';

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  background-color: rgba(188, 240, 250, 0.7);
  border: none;
  border-radius: 30px;
  padding: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  .friend {
    display: flex;
    margin-top: 2rem;
    width: 90%;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 2rem;
    }
  }
`;

function FriendsModal() {
  const user = useRecoilValue(userAtom);
  const data = GetFriendAPI(user?.memberId);

  return (
    <Modal>
      {/* 검색바 */}
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '90%',
          maxWidth: '100%',
        }}
      >
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="닉네임으로 검색해주세요"
          inputProps={{ 'aria-label': '닉네임으로 검색해주세요' }}
        />
      </Paper>

      {/* 친구 목록 */}
      {data?.responseData?.map((friend: any) => (
        <div key={friend.memberId} className="friend">
          <img src={friend.memberImage} alt="" />
          <div>
            <h2>{friend.memberNickname}</h2>
            <h6>{friend.memberTierName}</h6>
          </div>
          <Divider />
        </div>
      ))}
    </Modal>
  );
}

export default FriendsModal;

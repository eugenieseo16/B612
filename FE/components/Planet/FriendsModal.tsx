import React, { memo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';

import styled from '@emotion/styled';
import { useFriendAPI } from 'API/friendAPIs';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import Divider from '@mui/material/Divider';
import { useRouter } from 'next/router';
import { useSearchByNameAPI } from 'API/memberAPIs';
import axios from 'axios';
import { friendAPIUrls } from 'API/apiURLs';

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  overflow-y: scroll;
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

const FriendsModal = memo(function SomComponent() {
  const user = useRecoilValue(userAtom);
  const data = useFriendAPI(user?.memberId);
  const router = useRouter();
  const [search, setSearch] = useState('');
  const searchResults = useSearchByNameAPI(search);

  const ff: any = {};
  searchResults?.responseData?.forEach(
    (friend: IUser) => (ff[friend.memberId] = true)
  );
  data?.responseData?.forEach((friend: IUser) => (ff[friend.memberId] = false));

  const addFriend = async (friendResponseMemberId: number) => {
    const { data } = await axios.post(friendAPIUrls.requestFriendAPIUrl, {
      friendRequestMemberId: user?.memberId,
      friendResponseMemberId,
    });
    console.log(data);
  };

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
          onChange={e => setSearch(e.target.value)}
          value={search}
        />
      </Paper>
      {/* 검색결과 이미 친구인 사람은 return null*/}
      {searchResults?.responseData?.map((friend: IUser) => {
        if (!ff[friend.memberId] || !search) return;
        return (
          <div
            key={friend.memberId}
            className="friend"
            onClick={() => router.push(`/profile/${friend.memberId}`)}
          >
            <img src={friend.memberImage} alt="" />
            <div>
              <h2>{friend.memberNickname}</h2>
              <h6>{friend.memberTierName}</h6>
              <button onClick={() => addFriend(friend.memberId)}>
                친구추가
              </button>
            </div>
            <Divider />
          </div>
        );
      })}
      {/* 친구 목록 */}
      <h2 style={{ padding: '3rem 0 2rem 0 ' }}>여기부턴 이미 찡꾸찡꾸👅👅</h2>
      {data?.responseData?.map((friend: IUser) => (
        <div
          key={friend.memberId}
          className="friend"
          onClick={() => router.push(`/profile/${friend.memberId}`)}
        >
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
});

export default FriendsModal;

import { useState } from 'react';
import styled from '@emotion/styled';
import { colors } from 'styles/colors';

import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import RoomNav from './RoomNav';
import { rgba } from 'emotion-rgba';
import AvatarContainer from './ProfileModal/AvatarContainer';
import Approval from './ProfileModal/Approval';
import RequestedList from './ProfileModal/RequestedList';
import Friends from './ProfileModal/Friends';

function MyProfileModal() {
  const me = useRecoilValue(userAtom);

  return (
    <Container>
      <RoomNav />
      <AvatarContainer />
      <p>보유 코인 : {me?.eth} GoerliETH</p>
      <div>
        <span>충전하러 가기 </span>
        <a>https://goerlifaucet.com/</a>
      </div>
      <Approval />
      <RequestedList />
      <Friends />
    </Container>
  );
}

export default MyProfileModal;

const Container = styled.div`
  position: relative;
  display: flex;
  min-height: 100vh;
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

import React, { useState } from 'react';
import MetaMaskLogin from '@components/MetaMaskLogin';
import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import Example from '@components/Example';
import Link from 'next/link';

import styled from '@emotion/styled';

import BlueGlowingButton from '@components/common/BlueGlowingButton';
import PurpleGlowingButton from '@components/common/PurpleGlowingButton';

import Modal from '@mui/material/Modal';

import FriendsModal from '@components/Planet/FriendsModal';
import QuestsModal from '@components/Planet/QuestsModal';
import planetAtom from 'store/planetsAtom';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '70%',
  bgcolor: '#BCF0FA',
  border: 'none',
  borderRadius: 5,

  p: 4,
};

const Home: NextPage = () => {
  const user = useRecoilValue(userAtom);

  const [openFriends, setOpenFriends] = useState(false);
  const handleOpenFriends = () => setOpenFriends(true);
  const handleCloseFriends = () => setOpenFriends(false);

  const [openQuests, setOpenQuests] = useState(false);
  const handleOpenQuests = () => setOpenQuests(true);
  const handleCloseQuests = () => setOpenQuests(false);

  const FloatingButtons = styled.div`
    position: fixed;
    bottom: 50px;
    right: 50px;

    .floating-button-items {
      padding: 1rem 0rem;
    }
  `;

  return (
    <div style={{ paddingTop: '4rem' }}>
      {!Boolean(user) ? (
        <></>
      ) : (
        <h1>{user?.memberNickname + '님, 환영해요!'}</h1>
      )}

      <Link href={`/profile/${user?.memberId}`}>myProfile</Link>
      <div>
        <Link href={`/square`}>광장으로 이동</Link>
      </div>
      <div>
        <Link href={`/planet/1`}>행성으로 이동</Link>
      </div>
      <Example />
      {!Boolean(user) ? <MetaMaskLogin /> : <h1>{user?.memberNickname}</h1>}

      <h1>h1 태그 입니다 - Heading 1 마요 체 (3rem)</h1>
      <h2>h2 태그 입니다 - Heading 2 마요 체 (2.5rem)</h2>
      <h3>h3 태그 입니다 - Heading 3 마요 체 (2rem)</h3>
      <h4>h4 태그 입니다 - Heading 4 마요 체 (1.5rem)</h4>
      <h5>h5 태그 입니다 - Heading 5 거친마요 체 (2rem)</h5>
      <h6>h6 태그 입니다 - Heading 6 거친마요 체 (1.5rem)</h6>
      <span>span tag - testtest (1.3rem)</span>
      <p>p tag - 이 글씨체보다 작을 필요가 있을까요?? (1.3rem)</p>

      <FloatingButtons>
        <div className="floating-button-items" onClick={handleOpenFriends}>
          <BlueGlowingButton icon={'friend'} />
        </div>
        <div className="floating-button-items" onClick={handleOpenQuests}>
          <PurpleGlowingButton icon={'quest'} />
        </div>
      </FloatingButtons>

      {/* 친구 목록 조회 */}
      <Modal open={openFriends} onClose={handleCloseFriends}>
        <FriendsModal />
      </Modal>

      {/* 퀘스트 목록 조회 */}
      <Modal open={openQuests} onClose={handleCloseQuests}>
        <QuestsModal />
      </Modal>
    </div>
  );
};

export default Home;

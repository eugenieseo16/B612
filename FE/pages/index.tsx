import React, { useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';

import TestCanvas from '@components/Main/TestCanvas';

import Modal from '@mui/material/Modal';

import BlueGlowingButton from '@components/common/BlueGlowingButton';
import YellowGlowingButton from '@components/common/YellowGlowingButton';

import { CertificateModal, FriendsModal } from '@components/Planet/index';
import { Canvas } from '@react-three/fiber';

const Home: NextPage = () => {
  const FloatingButtons = styled.div`
    position: fixed;
    bottom: 3rem;
    right: 3rem;

    .floating-button-items {
      padding: 1rem 0rem;
    }
  `;

  const [openFriends, setOpenFriends] = useState(false);
  const handleOpenFriends = () => setOpenFriends(true);
  const handleCloseFriends = () => setOpenFriends(false);

  const [openCertificate, setOpenCertificate] = useState(false);
  const handleOpenCertificate = () => setOpenCertificate(true);
  const handleCloseCertificate = () => setOpenCertificate(false);

  return (
    <div style={{ paddingTop: '4rem' }}>
      {/* {!Boolean(user) ? (
        <></>
      ) : (
        <h3>{user?.memberNickname + '님, 환영해요!'}</h3>
      )} */}
      <Canvas style={{ width: '100vw', height: 'calc(100vh - 4rem)' }}>
        <TestCanvas />
      </Canvas>

      <FloatingButtons>
        <div className="floating-button-items" onClick={handleOpenFriends}>
          <BlueGlowingButton icon={'friend'} />
        </div>

        <div className="floating-button-items" onClick={handleOpenCertificate}>
          <YellowGlowingButton icon={'certificate'} />
        </div>
      </FloatingButtons>

      {/* 친구 목록 조회 */}
      <Modal open={openFriends} onClose={handleCloseFriends}>
        <FriendsModal />
      </Modal>

      {/* 인증서 발급 */}
      <Modal open={openCertificate} onClose={handleCloseCertificate}>
        <CertificateModal />
      </Modal>
    </div>
  );
};

export default Home;

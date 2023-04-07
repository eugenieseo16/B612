import React, { memo, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';

import styled from '@emotion/styled';
import { Modal } from '@mui/material';
import { useRecoilState } from 'recoil';
import mainModalAtom from 'store/main/mainModalAtom';

import tier_certificate from '../../assets/imgs/certifications/tier_certificate.png';
import kakao from '../../assets/imgs/certifications/shareButtons/kakao.png';
import message from '../../assets/imgs/certifications/shareButtons/message.png';
import download from '../../assets/imgs/certifications/shareButtons/download.png';

import CreateCertificate from './CreateCertificate';

const CertificateModal = memo(function SomeComponent() {
  const [{ certificate }, setModalOpen] = useRecoilState(mainModalAtom);

  return (
    <Modal
      open={certificate}
      onClose={() => setModalOpen({ certificate: false, friend: false })}
    >
      <StyledModal>
        <h3>인증서 발급하기</h3>
        <p style={{ padding: '20px' }}>(인증서 발급 예시)</p>
        <img src={tier_certificate.src} alt="" style={{ width: '70%' }} />

        <CreateCertificate />
        {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ShareIcon
            src={kakao.src}
            alt=""
            // onClick={shareToKatalk}
          />
          <ShareIcon src={message.src} alt="" />
          <ShareIcon src={download.src} alt="" />
        </div> */}
      </StyledModal>
    </Modal>
  );
});

export default CertificateModal;
const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 90%;
  background-color: rgba(254, 228, 190, 0.7);
  border: none;
  border-radius: 30px;
  padding: 30px;
`;

const ShareIcon = styled.img`
  width: 7%;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-top: 3rem;
`;

import React from 'react';
import styled from '@emotion/styled';
import planet_certificate from '../../assets/imgs/certifications/planet_certificate.png';
import CreatePlanetCertificate from './CreatePlanetCertificate';

function ItemsModal() {
  return (
    <StyledModal>
      <h3>인증서 발급하기</h3>
      <p style={{ padding: '20px' }}>(인증서 발급 예시)</p>
      <img src={planet_certificate.src} alt="" style={{ width: '70%' }} />
      <CreatePlanetCertificate />
    </StyledModal>
  );
}

export default ItemsModal;

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

import React, { memo } from 'react';
import styled from '@emotion/styled';
import { Modal } from '@mui/material';
import { useRecoilState } from 'recoil';
import mainModalAtom from 'store/main/mainModalAtom';

const CertificateModal = memo(function SomeComponent() {
  const [{ certificate }, setModalOpen] = useRecoilState(mainModalAtom);

  return (
    <Modal
      open={certificate}
      onClose={() => setModalOpen({ certificate: false, friend: false })}
    >
      <StyledModal>
        <div>Certificate</div>
      </StyledModal>
    </Modal>
  );
});

export default CertificateModal;
const StyledModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  background-color: rgba(254, 228, 190, 0.7);
  border: none;
  border-radius: 30px;
  padding: 30px;
`;

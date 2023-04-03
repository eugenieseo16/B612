import React, { memo } from 'react';
import styled from '@emotion/styled';

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  background-color: rgba(244, 193, 174, 0.7);
  border: none;
  border-radius: 30px;
  padding: 30px;
`;

const PlanetsModal = memo(function SomeComponent() {
  return (
    <Modal>
      <div>Planets</div>
    </Modal>
  );
});

export default PlanetsModal;

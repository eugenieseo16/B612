import React, { memo } from 'react';
import styled from '@emotion/styled';
import CreateBaobab from './CreateBaobab';

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  background-color: #fdfcf3;
  border: none;
  border-radius: 30px;
  padding: 30px;
`;

const Testmodal = memo(function SomeComponent() {
  return (
    <Modal>
      <div>바오밥나무</div>
      <CreateBaobab />
    </Modal>
  );
});

export default Testmodal;

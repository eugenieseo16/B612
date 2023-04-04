import React, { memo } from 'react';
import styled from '@emotion/styled';

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 20%;
  background-color: #e57373;
  opacity: 0.7;
  border: none;
  border-radius: 3rem;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   padding: 3rem;
// `;
const Button = styled.button`
  background-color: #20d638;

  border: none;
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem;
  cursor: pointer;
`;

const AppleGameModal = memo(function SomeComponent() {
  const handleRedirect = () => {
    window.open('https://www.gamesaien.com/game/fruit_box_a/', '_blank');
  };

  return (
    <Modal>
      <Button onClick={handleRedirect}>
        <h3>사과 게임하러 이동!</h3>
      </Button>
    </Modal>
  );
});

export default AppleGameModal;

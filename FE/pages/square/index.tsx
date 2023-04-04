import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import Chatting from '@components/chatting/Chatting';
import styled from '@emotion/styled';

import {
  Lights,
  Ground,
  Tetris,
  AppleTreeModel,
  AvatarFinn,
  Tetris2,
  Baobab,
  Chatting,
} from '@components/square/index';

const SquareContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const ChattingContainer = styled.div`
  position: absolute;
  top: 10%;
  padding: 1rem;
  border-radius: 1rem;
  width: 20%;
  height: 30%;
`;

function Square() {
  // 개발중일때 , true 상태관리와 helper를 키고,끌수 있도록 함
  const testing = true;

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    e.stopPropagation();
    // ChattingContainer에서 발생한 키보드 이벤트 처리
    console.log('keydown event in ChattingContainer');
  }

  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    e.stopPropagation();
    // ChattingContainer에서 발생한 마우스 스크롤 이벤트 처리
    console.log('wheel event in ChattingContainer');
  }

  return (
    <SquareContainer>
      <Canvas
        style={{ backgroundImage: `url("/sky.png")`, backgroundSize: 'cover' }}
        shadows
        camera={{
          position: [0, 6, 14],
        }}
      >
        {/*testing = true : 왼쪽상단에 상태를 보여준다, helper 킨다 */}
        {testing ? <Stats /> : null}
        {testing ? <axesHelper args={[2]} /> : null}
        {testing ? <gridHelper args={[300, 300]} /> : null}

        <Ground />
        <Tetris />
        <Tetris2 />
        <AppleTreeModel position={[14, 0, -45]} />
        <Lights />
        <AvatarFinn />
        <Baobab />
      </Canvas>

      <ChattingContainer onKeyDown={handleKeyDown} onWheel={handleWheel}>
        <Chatting />
      </ChattingContainer>
    </SquareContainer>
  );
}

export default Square;

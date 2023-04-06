import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import styled from '@emotion/styled';
import { positionAtom } from 'store/square/positionAtom';
import {
  Lights,
  Ground,
  Tetris,
  AppleTreeModel,
  Avatar,
  Tetris2,
  Baobab,
  ChatBox,
} from '@components/square/index';

import { AvatarPosition } from '@components/avatar/AvatarPosition';
import { useRecoilCallback } from 'recoil';

const SquareContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const ChattingContainer = styled.div`
  position: absolute;
  bottom: 0px;
  padding: 1rem;
  border-radius: 1rem;
  width: 25%;
`;

function Square() {
  // 개발중일때 , true 상태관리와 helper를 키고,끌수 있도록 함
  const testing = false;

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
  const resetPosition = useRecoilCallback(({ set }) => () => {
    set(positionAtom, { x: 0, z: 0 });
  });

  useEffect(() => {
    return () => {
      resetPosition();
    };
  }, []);

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
        <Avatar />
        <Baobab />
        <AvatarPosition />
      </Canvas>

      <ChattingContainer onKeyDown={handleKeyDown} onWheel={handleWheel}>
        <ChatBox />
      </ChattingContainer>
    </SquareContainer>
  );
}

export default Square;

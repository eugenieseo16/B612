import React, { useState, useEffect } from 'react';
import { positionAtom } from 'store/square/positionAtom';
import type { Position } from 'store/square/positionAtom';
import { useRecoilValue } from 'recoil';
import userAtom from 'store/userAtom';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';

import { useGLTF } from '@react-three/drei';

import { AvatarCharacter } from './index';

type OtherAvatarProps = {
  type: string;
  sessionId: string;
  memberCharacter: number;
  x: number;
  z: number;
};

export const OtherAvatar = ({
  type,
  sessionId,
  memberCharacter,
  x,
  z,
}: OtherAvatarProps) => {
  const { scene } = useGLTF(AvatarCharacter[memberCharacter]);
  const clone = SkeletonUtils.clone(scene);

  return <primitive object={clone} position={[x, 0, z]} />;
};

export const AvatarPosition: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const sessionIdRef = React.useRef<string | null>(null); // sessionId 초기값을 null로 지정
  const position = useRecoilValue(positionAtom);
  const user = useRecoilValue(userAtom);
  const memberCharacterIndex = user?.memberCharacter ?? 1;

  const [otherPositions, setOtherPositions] = useState<
    Record<string, Position>
  >({});

  useEffect(() => {
    // 웹소켓 객체 생성 및 서버와 연결
    const ws = new WebSocket('wss://j8a208.p.ssafy.io/ws/move');

    ws.onopen = evt => {
      console.log('웹소켓 연결 성공!');
    };

    // 서버에서 데이터 수신 시 이벤트 핸들러
    ws.onmessage = evt => {
      console.log('evt.data:', evt.data);
      if (!sessionIdRef.current) {
        // sessionIdRef가 초기화되지 않은 경우에만 업데이트
        sessionIdRef.current = evt.data;
      }
      // 다른 유저의 정보 받기
      let data = evt.data;
      try {
        data = JSON.parse(evt.data);
      } catch (e) {
        return;
      }

      if (data.sessionId !== sessionIdRef.current && data.type === 'move') {
        setOtherPositions({
          ...otherPositions,
          [data.sessionId]: {
            x: data.x,
            z: data.z,
            memberCharacter: data.memberCharacter,
          },
        });
      }
    };

    ws.onerror = event => {
      console.error('웹소켓 연결 실패!', event);
    };

    // WebSocket 객체와의 연결 해제
    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendPositionToServer = (
    sessionId: string,
    position: Position,
    socket: WebSocket
  ) => {
    // 서버로 보낼 데이터 생성
    const message = {
      type: 'move',
      sessionId: sessionIdRef.current,
      memberCharacter: memberCharacterIndex,
      x: position.x,
      z: position.z,
    };
    // 서버로 데이터 전송
    socket?.send(JSON.stringify(message));
    console.log('메시지 전송 완료');
  };

  useEffect(() => {
    // 웹소켓이 연결되어 있고 sessionIdRef.current 변수가 존재하면 sendPositionToServer 함수 호출
    if (socket && sessionIdRef.current) {
      sendPositionToServer(sessionIdRef.current, position, socket);
    }
  }, [socket, position]);
  console.log('POS', otherPositions);
  console.log('POS', Object.entries(otherPositions));

  return (
    <>
      {Object.entries(otherPositions).map(([sessionId, position]) => (
        <OtherAvatar
          type="move"
          key={sessionId}
          sessionId={sessionId}
          memberCharacter={memberCharacterIndex}
          x={position.x}
          z={position.z}
        />
      ))}
    </>
  );
};

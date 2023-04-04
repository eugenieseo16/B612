import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { positionAtom } from 'store/square/positionAtom';
import type { Position } from 'store/square/positionAtom';

function AvatarPosition() {
  const [position, setPosition] = useRecoilState<Position>(positionAtom);
  let ws: WebSocket | null = null;

  useEffect(() => {
    ws = new WebSocket('wss://j8a208.p.ssafy.io/ws/chat');

    ws.addEventListener('open', () => {
      console.log('WebSocket connection established');
    });

    ws.addEventListener('message', event => {
      const message = JSON.parse(event.data);

      if (message.type === 'positionUpdate') {
        const { x, z } = message.position;
        setPosition({ x, z });
      }
    });

    return () => {
      if (ws !== null) {
        ws.close();
      }
    };
  }, [setPosition]);

  function sendPositionUpdate(position: Position) {
    if (ws !== null) {
      const message = JSON.stringify({
        type: 'positionUpdate',
        position,
      });

      ws.send(message);
    }
  }

  return null;
}

export default AvatarPosition;

import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import styled from '@emotion/styled';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

// 메시지의 내용과 송신 시간, 송신자를 담은 인터페이스
interface Message {
  content: string;
  timestamp: number;
  sentBy: 'user' | 'other' | 'server';
  username?: string;
}

// 채팅 컴포넌트의 스타일링
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000000;
  opacity: 0.7;
  width: 100%;
  height: 30vh;
`;

const ChatHeader = styled.header`
  padding: 1rem;
  color: #ffffff;
  width: 100%;
`;

const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;

  /* 스크롤바 스타일링 */
  ::-webkit-scrollbar {
    width: 1rem;
  }
  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

// 메시지를 왼쪽/오른쪽에 표시하기 위한 스타일링 & interface
interface MessageContainerProps {
  sent: boolean;
}

const MessageContainer = styled.div<MessageContainerProps>`
  display: flex;
  justify-content: ${({ sent }) => (sent ? 'flex-end' : 'flex-start')};
  padding: 0.5rem;
  width: 100%;
`;

// 송신자 별로 메시지에 적용할 스타일링
interface MessageBubbleProps {
  sentBy: 'user' | 'other' | 'server';
  sent: boolean;
}

const MessageBubble = styled.div<MessageBubbleProps>`
  padding: 1rem;
  background-color: ${({ sentBy }) =>
    sentBy === 'user' ? '#144906' : sentBy === 'other' ? '#ddd' : '#183852'};
  color: #fff;
  border-radius: 10px;
  max-width: 90%;
`;

const ChatInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  background-color: #000000;
  opacity: 0.7;
  width: 100%;
`;

const ChatInput = styled.input`
  background-color: #000000;
  color: #ffffff;
  margin-right: 0.5rem;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  width: 100%;
`;

const ChatButton = styled.button`
  padding: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #ffffff;
  color: #000;
  cursor: pointer;
`;

const LargeChatOutlinedIcon = styled(ChatOutlinedIcon)`
  font-size: 3rem;
  margin: 1rem;
`;

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const messageBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ws = new WebSocket('wss://j8a208.p.ssafy.io/ws/chat');

    ws.onopen = () => {
      console.log('WebSocket connected');

      // 페이지에 처음 접속했을 때 환영 문구 보내기
      const welcomeMessage: Message = {
        content: '환영합니다!',
        timestamp: Date.now(),
        sentBy: 'server',
      };
      setMessages(prevMessages => [...prevMessages, welcomeMessage]);
    };
    // WebSocket으로 메시지가 오면 목록에 추가
    ws.onmessage = evt => {
      const message: Message = JSON.parse(evt.data);
      setMessages(prevMessages => [...prevMessages, message]);
    };

    // WebSocket 객체와의 연결 해제
    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  // 메시지 전송 함수
  const sendMessage = () => {
    if (messageInput.trim() === '') return;

    const message: Message = {
      content: messageInput,
      timestamp: Date.now(),
      sentBy: 'user',
    };

    // WebSocket을 통해 메시지 전송
    socket?.send(JSON.stringify(message));

    // 목록에 추가하고 입력란 비우기
    setMessages(prevMessages => [...prevMessages, message]);
    setMessageInput('');
  };

  // 입력란의 내용 변경 시 state 업데이트
  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setMessageInput(evt.target.value);
  };

  // 엔터키 누르면 send버튼 누른 것과 똑같이 작동
  const handleKeyPress = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      sendMessage();
    }
  };
  // 메시지 업데이트 시 스크롤 최하단으로 이동
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  // 숨기기 버튼 누르면 숨기기
  const [isChatHidden, setIsChatHidden] = useState(false);

  const handleChatToggle = () => {
    setIsChatHidden(prevState => !prevState);
  };

  return (
    <div>
      {isChatHidden ? (
        <LargeChatOutlinedIcon onClick={handleChatToggle} />
      ) : (
        <div>
          <ChatContainer>
            <ChatHeader>
              <CloseFullscreenIcon onClick={handleChatToggle} />
            </ChatHeader>
            <ChatBody ref={messageBoxRef}>
              {messages.map((message, index) => (
                <MessageContainer key={index} sent={message.sentBy === 'user'}>
                  <MessageBubble
                    sentBy={message.sentBy}
                    sent={message.sentBy === 'user'}
                  >
                    {message.content}
                  </MessageBubble>
                </MessageContainer>
              ))}
            </ChatBody>
          </ChatContainer>
          <ChatInputContainer>
            <ChatInput
              type="text"
              placeholder="채팅을 입력해주세요"
              value={messageInput}
              onChange={handleInput}
              onKeyDown={handleKeyPress}
            />
            <ChatButton onClick={sendMessage}>Send</ChatButton>
          </ChatInputContainer>
        </div>
      )}
    </div>
  );
};
export default Chat;

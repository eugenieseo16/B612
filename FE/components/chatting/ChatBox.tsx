import React, { useState, useEffect, ChangeEvent, useRef } from 'react';

import { useRecoilValue } from 'recoil';

import userAtom from 'store/userAtom';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import type { Message } from './index';
import {
  ChatContainer,
  ChatHeader,
  ChatBody,
  MessageContainer,
  MessageBubble,
  ChatInputContainer,
  ChatInput,
  ChatButton,
  LargeChatOutlinedIcon,
} from './index';

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const ws = new WebSocket('wss://j8a208.p.ssafy.io/ws/chat');

    ws.onopen = () => {
      console.log('WebSocket connected');

      // 페이지에 처음 접속했을 때 환영 문구 보내기
      const welcomeMessage: Message = {
        content: '환영합니다!',
        timestamp: Date.now(),
        sentBy: 'server',
        memberNickname: 'B612',
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
      memberNickname: user?.memberNickname || 'guest',
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
              {messages.map((message, index) => {
                const isSentByMe =
                  user?.memberNickname === message.memberNickname;
                return (
                  <MessageContainer key={index} sent={isSentByMe}>
                    <MessageBubble
                      sentBy={message.sentBy}
                      sent={isSentByMe}
                      isCurrentUser={isSentByMe}
                    >
                      <span>
                        {isSentByMe
                          ? message.content
                          : `${message.memberNickname}: ${message.content}`}
                      </span>
                    </MessageBubble>
                  </MessageContainer>
                );
              })}
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
            <ChatButton onClick={sendMessage}>보내기</ChatButton>
          </ChatInputContainer>
        </div>
      )}
    </div>
  );
};
export default ChatBox;

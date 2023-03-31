import React, { useState, useEffect, ChangeEvent } from 'react';
import styled from '@emotion/styled';

interface Message {
  content: string;
  timestamp: number;
  sentBy: 'user' | 'server';
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #000000;
  opacity: 0.6;
`;

const ChatHeader = styled.header`
  padding: 20px;
  color: #ffffff;
  width: 100%;
`;

const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  width: 100%;
  height: 400px;
  overflow-y: scroll;
`;

interface MessageContainerProps {
  sent: boolean;
}

const MessageContainer = styled.div<MessageContainerProps>`
  display: flex;
  justify-content: ${({ sent }) => (sent ? 'flex-end' : 'flex-start')};
  margin: 10px;
`;

interface MessageBubbleProps {
  sent: boolean;
}

const MessageBubble = styled.div<MessageBubbleProps>`
  padding: 1rem;
  background-color: ${({ sent }) => (sent ? '#4CAF50' : '#ddd')};
  color: ${({ sent }) => (sent ? '#fff' : '#333')};
  border-radius: 10px;
  max-width: 70%;
`;

const ChatInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  background-color: #000000;
  opacity: 0.6;
`;

const ChatInput = styled.input`
  background-color: #000000;
  opacity: 0.6;
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

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('wss://j8a208.p.ssafy.io/ws/chat');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = evt => {
      const message: Message = JSON.parse(evt.data);
      setMessages(prevMessages => [...prevMessages, message]);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() === '') return;

    const message: Message = {
      content: messageInput,
      timestamp: Date.now(),
      sentBy: 'user',
    };

    socket?.send(JSON.stringify(message));
    setMessages(prevMessages => [...prevMessages, message]);
    setMessageInput('');
  };

  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setMessageInput(evt.target.value);
  };

  return (
    <>
      <ChatContainer>
        <ChatHeader>
          <p>아이콘 넣을거임</p>
        </ChatHeader>
        <ChatBody>
          <hr />
          {messages.map((message, index) => (
            <MessageContainer key={index} sent={message.sentBy === 'user'}>
              <MessageBubble sent={message.sentBy === 'user'}>
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
        />
        <ChatButton onClick={sendMessage}>Send</ChatButton>
      </ChatInputContainer>
    </>
  );
};
export default Chat;

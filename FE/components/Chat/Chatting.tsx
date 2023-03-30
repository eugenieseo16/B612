import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChatHeader = styled.header`
  padding: 20px;
  background-color: #000000;
  color: #fff;
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

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${({ sent }) => (sent ? 'flex-end' : 'flex-start')};
  margin: 10px;
`;

const MessageBubble = styled.div`
  padding: 10px;
  background-color: ${({ sent }) => (sent ? '#4CAF50' : '#ddd')};
  color: ${({ sent }) => (sent ? '#fff' : '#333')};
  border-radius: 10px;
  max-width: 70%;
`;

const ChatInput = styled.input`
  margin-top: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 100%;
`;

const ChatButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;
`;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('wss://j8a208.p.ssafy.io/ws/chat');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = evt => {
      const message = JSON.parse(evt.data);
      setMessages(prevMessages => [...prevMessages, message]);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() === '') return;

    const message = {
      content: messageInput,
      timestamp: Date.now(),
      sentBy: 'user',
    };

    socket.send(JSON.stringify(message));
    setMessages(prevMessages => [...prevMessages, message]);
    setMessageInput('');
  };

  const handleInput = evt => {
    setMessageInput(evt.target.value);
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <h1>Chat Room</h1>
      </ChatHeader>
      <ChatBody>
        {messages.map((message, index) => (
          <MessageContainer key={index} sent={message.sentBy === 'user'}>
            <MessageBubble sent={message.sentBy === 'user'}>
              {message.content}
            </MessageBubble>
          </MessageContainer>
        ))}
      </ChatBody>
      <ChatInput
        type="text"
        placeholder="Type your message here"
        value={messageInput}
        onChange={handleInput}
      />
      <ChatButton onClick={sendMessage}>Send</ChatButton>
    </ChatContainer>
  );
};

export default Chat;

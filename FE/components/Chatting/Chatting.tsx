import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://127.0.0.1:8080/api/chat');

const Chatting: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // 메시지 받아오기
    socket.on('message', (message: string) => {
      setMessages([...messages, message]);
    });

    // 연결 종료
    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Enter a message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatting;

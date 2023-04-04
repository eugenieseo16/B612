import styled from '@emotion/styled';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

// 메시지의 내용과 송신 시간, 송신자를 담은 인터페이스
interface Message {
  content: string;
  timestamp: number;
  sentBy: 'user' | 'server';
  memberNickname: string;
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
  sentBy: 'user' | 'server';
  sent: boolean;
  isCurrentUser: boolean;
}

const MessageBubble = styled.div<MessageBubbleProps>`
  padding: 1rem;
  background-color: ${({ sentBy, isCurrentUser }) =>
    sentBy === 'user' ? (isCurrentUser ? '#4caf50' : '#2196f3') : '#f44336'};
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

export type { Message, MessageContainerProps, MessageBubbleProps };
export {
  ChatContainer,
  ChatHeader,
  ChatBody,
  MessageContainer,
  MessageBubble,
  ChatInputContainer,
  ChatInput,
  ChatButton,
  LargeChatOutlinedIcon,
};

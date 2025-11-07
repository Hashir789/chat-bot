import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const ChatWindow = ({ messages, isTyping }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="chat-window">
      {messages.length === 0 ? (
        <div className="welcome-container">
          <div className="welcome-content">
            <h2 className="welcome-title">
              Welcome to YBA
            </h2>
            <p className="welcome-text">
              Start a conversation by typing a message below
            </p>
          </div>
        </div>
      ) : (
        <div>
          {messages.map((msg, index) => (
            <MessageBubble
              key={index}
              message={msg.text}
              isUser={msg.isUser}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;


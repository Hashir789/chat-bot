import { Bot } from 'lucide-react';

const TypingIndicator = () => {
  return (
    <div className="typing-indicator">
      <div className="message-avatar bot">
        <Bot className="message-avatar-icon bot" />
      </div>
      <div className="typing-dots">
        {[0, 1, 2].map((i) => (
          <div key={i} className="typing-dot" />
        ))}
      </div>
    </div>
  );
};

export default TypingIndicator;


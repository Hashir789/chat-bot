import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { User, Bot } from 'lucide-react';

const MessageBubble = ({ message, isUser }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`message-container message-fade-in ${isUser ? 'user' : 'bot'}`}
    >
      <div className={`message-avatar ${isUser ? 'user' : 'bot'}`}>
        {isUser ? (
          <User className={`message-avatar-icon user`} />
        ) : (
          <Bot className={`message-avatar-icon bot`} />
        )}
      </div>
      <div className="message-content">
        <div className="message-text">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p>{children}</p>,
              code: ({ children, className }) => {
                const isInline = !className;
                return isInline ? (
                  <code>{children}</code>
                ) : (
                  <pre><code>{children}</code></pre>
                );
              },
              pre: ({ children }) => <pre>{children}</pre>,
              ul: ({ children }) => <ul>{children}</ul>,
              ol: ({ children }) => <ol>{children}</ol>,
              li: ({ children }) => <li>{children}</li>,
              strong: ({ children }) => <strong>{children}</strong>,
            }}
          >
            {message}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;


import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

const InputBar = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  return (
    <div className="input-container">
      <div className="input-wrapper">
        <div className="input-box">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message YBA..."
            disabled={disabled}
            rows={1}
            className="input-textarea"
            style={{ minHeight: '24px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || disabled}
            className="input-send-button"
            aria-label="Send message"
          >
            <Send className="input-send-icon" />
          </button>
        </div>
        <p className="input-disclaimer">
          YBA can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
};

export default InputBar;


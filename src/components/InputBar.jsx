import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';

const InputBar = ({ onSendMessage, onFileUpload, disabled, uploadedFile }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

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

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="input-container">
      <div className="input-wrapper">
        <div className="input-box">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={handleFileSelect}
            className="file-input-hidden"
            disabled={disabled}
          />
          <button
            onClick={handleUploadClick}
            disabled={disabled}
            className="input-upload-button"
            aria-label="Upload file"
            type="button"
          >
            <Paperclip className="input-upload-icon" />
          </button>
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


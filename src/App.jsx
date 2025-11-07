import { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';

// Demo responses for the chatbot
const getBotResponse = (userMessage) => {
  const responses = [
    "That's an interesting question! Let me think about that...",
    "I understand what you're asking. Here's my perspective on that topic.",
    "Thanks for sharing that with me. Based on what you've said, I'd like to add that this is a demo response from YBA.",
    "I appreciate your input. This is a frontend demo, so I'm providing a simulated response. In a production version, this would connect to an AI model.",
    "That's a great point! As a demo chatbot, I'm here to showcase the YBA interface. In the full version, I'd provide more detailed and contextual responses.",
  ];
  
  // Simple keyword-based responses for demo
  const lowerMessage = userMessage.toLowerCase();
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! I'm YBA, your AI assistant. How can I help you today?";
  }
  if (lowerMessage.includes('help')) {
    return "I'm here to help! This is a demo version of YBA. You can ask me questions, and I'll provide simulated responses. In the full version, I'd be connected to an AI model for more intelligent conversations.";
  }
  if (lowerMessage.includes('name')) {
    return "I'm YBA! I'm designed to be a helpful AI assistant, similar to ChatGPT but with our own unique branding and interface.";
  }
  
  return responses[Math.floor(Math.random() * responses.length)];
};

function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first, otherwise default to light mode
    if (localStorage.getItem('darkMode') !== null) {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false; // Default to light mode
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const handleSendMessage = async (text) => {
    // Add user message
    const userMessage = { text, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate API delay
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  const handleNewChat = () => {
    setMessages([]);
    setIsTyping(false);
    setUploadedFile(null);
  };

  const handleFileUpload = (file) => {
    if (!file) return;
    
    // Allowed file types: PDF, Word (.doc, .docx), Excel (.xls, .xlsx)
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    // Also check by file extension as fallback
    const fileName = file.name.toLowerCase();
    const validExtension = fileName.endsWith('.pdf') || 
                          fileName.endsWith('.doc') || 
                          fileName.endsWith('.docx') ||
                          fileName.endsWith('.xls') ||
                          fileName.endsWith('.xlsx');
    
    if (!allowedTypes.includes(file.type) && !validExtension) {
      const errorMessage = { 
        text: 'Please upload a PDF, Word (.doc, .docx), or Excel (.xls, .xlsx) file.', 
        isUser: false 
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    // Determine file type for display
    let fileType = 'file';
    if (file.type === 'application/pdf' || fileName.endsWith('.pdf')) {
      fileType = 'PDF';
    } else if (file.type.includes('word') || fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
      fileType = 'Word document';
    } else if (file.type.includes('excel') || file.type.includes('spreadsheet') || fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) {
      fileType = 'Excel spreadsheet';
    }

    // Store file info
    setUploadedFile({
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    });

    // Show typing indicator
    setIsTyping(true);

    // Simulate processing delay
    setTimeout(() => {
      const fileSize = (file.size / 1024).toFixed(2); // Size in KB
      
      const botMessage = {
        text: `I've received your ${fileType}: **${file.name}** (${fileSize} KB).\n\nWhat would you like me to do with this file? You can ask me to:\n- Summarize the content\n- Extract specific information\n- Answer questions about the document\n- Or anything else you need!`,
        isUser: false
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <Header onNewChat={handleNewChat} darkMode={darkMode} setDarkMode={setDarkMode} />
      <ChatWindow messages={messages} isTyping={isTyping} />
      <InputBar 
        onSendMessage={handleSendMessage} 
        onFileUpload={handleFileUpload}
        disabled={isTyping}
        uploadedFile={uploadedFile}
      />
    </div>
  );
}

export default App;

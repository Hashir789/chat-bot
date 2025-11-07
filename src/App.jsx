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
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <Header onNewChat={handleNewChat} darkMode={darkMode} setDarkMode={setDarkMode} />
      <ChatWindow messages={messages} isTyping={isTyping} />
      <InputBar onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
}

export default App;

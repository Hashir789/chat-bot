import { Menu, Plus, Moon, Sun } from 'lucide-react';

const Header = ({ onNewChat, darkMode, setDarkMode }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button
            onClick={onNewChat}
            className="header-button"
            aria-label="New Chat"
          >
            <Menu className="header-icon" />
          </button>
          <h1 className="header-title">
            YBA
          </h1>
        </div>
        <div className="header-right">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="header-button"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="header-icon" />
            ) : (
              <Moon className="header-icon" />
            )}
          </button>
          <button
            onClick={onNewChat}
            className="new-chat-button"
          >
            <Plus className="header-icon" style={{ width: '16px', height: '16px' }} />
            New Chat
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;


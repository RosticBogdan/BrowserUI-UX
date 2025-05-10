import React, { useState } from 'react';
import AddressBar from '../navigation/AddressBar';
import ToolBar from '../navigation/ToolBar';
import { Settings, Moon, Sun, Bookmark } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleBookmarks: () => void;
  showBookmarks: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  isDarkMode, 
  toggleDarkMode, 
  toggleBookmarks,
  showBookmarks
}) => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  
  return (
    <div className={`px-4 py-3 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-sm z-10 transition-colors duration-300`}>
      <div className="flex items-center gap-4">
        <ToolBar isDarkMode={isDarkMode} />
        <div className="flex-grow">
          <AddressBar isDarkMode={isDarkMode} />
        </div>
        <div className="flex-none flex gap-2">
          <button
            onClick={toggleBookmarks}
            className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${showBookmarks ? 'text-blue-500' : ''}`}
            aria-label="Toggle bookmarks"
          >
            <Bookmark size={20} />
          </button>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
            aria-label="Settings"
          >
            <Settings size={20} />
            {showSettings && (
              <div className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <a href="#" className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`} role="menuitem">Settings</a>
                  <a href="#" className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`} role="menuitem">Extensions</a>
                  <a href="#" className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`} role="menuitem">History</a>
                  <a href="#" className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`} role="menuitem">Downloads</a>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Home, Menu } from 'lucide-react';

interface ToolBarProps {
  isDarkMode: boolean;
}

const ToolBar: React.FC<ToolBarProps> = ({ isDarkMode }) => {
  return (
    <div className="flex items-center gap-1">
      <button 
        className={`p-2 rounded-full ${
          isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
        } transition-colors`}
        aria-label="Back"
      >
        <ChevronLeft size={20} />
      </button>
      
      <button 
        className={`p-2 rounded-full ${
          isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
        } transition-colors`}
        aria-label="Forward"
      >
        <ChevronRight size={20} />
      </button>
      
      <button 
        className={`p-2 rounded-full ${
          isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
        } transition-colors`}
        aria-label="Reload"
      >
        <RotateCcw size={20} />
      </button>
      
      <button 
        className={`p-2 rounded-full ${
          isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
        } transition-colors`}
        aria-label="Home"
      >
        <Home size={20} />
      </button>
      
      <button 
        className={`p-2 rounded-full ${
          isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
        } transition-colors md:hidden`}
        aria-label="Menu"
      >
        <Menu size={20} />
      </button>
    </div>
  );
};

export default ToolBar;
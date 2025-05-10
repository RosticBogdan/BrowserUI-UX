import React from 'react';
import { Tab } from '../../types';
import HomePage from '../content/HomePage';

interface BrowserContentProps {
  activeTab: Tab;
  isDarkMode: boolean;
}

const BrowserContent: React.FC<BrowserContentProps> = ({ activeTab, isDarkMode }) => {
  // If the active tab has no URL, show the home page
  if (!activeTab.url) {
    return (
      <div className="flex-grow overflow-auto">
        <HomePage isDarkMode={isDarkMode} />
      </div>
    );
  }
  
  return (
    <div className={`flex-grow overflow-auto ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-2">Simulated browser content for:</p>
          <p className="font-medium text-xl mb-4 text-blue-500">{activeTab.url || 'New Tab'}</p>
          <div className="p-8 rounded-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
            <p className="mb-2">In a real browser, this would display:</p>
            <ul className="text-left list-disc pl-5 space-y-1">
              <li>The actual webpage content</li>
              <li>Rendered HTML from the URL</li>
              <li>Interactive elements</li>
              <li>Media content</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowserContent;
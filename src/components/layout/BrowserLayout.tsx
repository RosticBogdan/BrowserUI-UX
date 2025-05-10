import React, { useState } from 'react';
import Header from './Header';
import TabBar from '../navigation/TabBar';
import BookmarkBar from '../bookmarks/BookmarkBar';
import BrowserContent from './BrowserContent';
import StatusBar from './StatusBar';
import { Tab } from '../../types';
import { generateInitialTabs } from '../../utils/tabUtils';

const BrowserLayout: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>(generateInitialTabs());
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0].id);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [showBookmarks, setShowBookmarks] = useState<boolean>(true);
  
  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
  };
  
  const handleAddTab = () => {
    const newTab: Tab = {
      id: `tab-${Date.now()}`,
      title: 'New Tab',
      url: '',
      favicon: '',
      isLoading: false
    };
    
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };
  
  const handleRemoveTab = (tabId: string) => {
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    
    if (newTabs.length === 0) {
      // If we're removing the last tab, add a new one
      const newTab: Tab = {
        id: `tab-${Date.now()}`,
        title: 'New Tab',
        url: '',
        favicon: '',
        isLoading: false
      };
      setTabs([newTab]);
      setActiveTabId(newTab.id);
    } else if (activeTabId === tabId) {
      // If we're removing the active tab, set the active tab to the next one or the previous one
      const activeIndex = tabs.findIndex(tab => tab.id === tabId);
      const newActiveIndex = activeIndex === tabs.length - 1 ? activeIndex - 1 : activeIndex;
      setActiveTabId(tabs[newActiveIndex].id);
      setTabs(newTabs);
    } else {
      setTabs(newTabs);
    }
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const toggleBookmarks = () => {
    setShowBookmarks(!showBookmarks);
  };
  
  const activeTab = tabs.find(tab => tab.id === activeTabId) || tabs[0];
  
  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex-none">
        <Header 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
          toggleBookmarks={toggleBookmarks}
          showBookmarks={showBookmarks}
        />
        <TabBar 
          tabs={tabs} 
          activeTabId={activeTabId} 
          onTabChange={handleTabChange} 
          onAddTab={handleAddTab} 
          onRemoveTab={handleRemoveTab}
        />
        {showBookmarks && <BookmarkBar isDarkMode={isDarkMode} />}
      </div>
      <BrowserContent activeTab={activeTab} isDarkMode={isDarkMode} />
      <StatusBar url={activeTab.url} isDarkMode={isDarkMode} />
    </div>
  );
};

export default BrowserLayout;
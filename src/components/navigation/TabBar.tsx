import React, { useRef, useState, useEffect } from 'react';
import { Tab } from '../../types';
import { Plus, X, RefreshCw } from 'lucide-react';

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  onAddTab: () => void;
  onRemoveTab: (tabId: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ 
  tabs, 
  activeTabId, 
  onTabChange, 
  onAddTab, 
  onRemoveTab 
}) => {
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [showTabScrollButtons, setShowTabScrollButtons] = useState<boolean>(false);
  const [showLeftScroll, setShowLeftScroll] = useState<boolean>(false);
  const [showRightScroll, setShowRightScroll] = useState<boolean>(false);

  // Check if tabs overflow and show scroll buttons accordingly
  useEffect(() => {
    const checkOverflow = () => {
      if (tabsContainerRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = tabsContainerRef.current;
        const hasOverflow = scrollWidth > clientWidth;
        
        setShowTabScrollButtons(hasOverflow);
        setShowLeftScroll(scrollLeft > 0);
        setShowRightScroll(scrollLeft + clientWidth < scrollWidth);
      }
    };

    checkOverflow();
    
    // Scroll to active tab
    if (tabsContainerRef.current) {
      const activeTabElement = tabsContainerRef.current.querySelector(`[data-tab-id="${activeTabId}"]`);
      if (activeTabElement) {
        activeTabElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }
    }

    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [tabs, activeTabId]);

  const handleScroll = () => {
    if (tabsContainerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = tabsContainerRef.current;
      
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scrollLeft = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative flex items-center bg-gray-100 dark:bg-gray-800 h-10">
      {showTabScrollButtons && showLeftScroll && (
        <button 
          onClick={scrollLeft}
          className="absolute left-0 z-10 px-1 h-10 bg-gradient-to-r from-gray-100 via-gray-100 to-transparent dark:from-gray-800 dark:via-gray-800 flex items-center justify-center"
        >
          <div className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
        </button>
      )}
      
      <div 
        ref={tabsContainerRef}
        className="flex-grow flex overflow-x-auto scrollbar-hide"
        onScroll={handleScroll}
      >
        {tabs.map((tab) => (
          <div
            key={tab.id}
            data-tab-id={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative flex items-center min-w-[180px] max-w-[240px] h-10 px-3 cursor-pointer ${
              activeTabId === tab.id 
                ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center gap-2 flex-grow min-w-0">
              {tab.favicon ? (
                <img src={tab.favicon} alt="" className="w-4 h-4" />
              ) : (
                <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              )}
              <span className="truncate">{tab.title}</span>
            </div>
            
            <div className="flex items-center ml-2">
              {tab.isLoading ? (
                <RefreshCw size={16} className="animate-spin text-blue-500" />
              ) : (
                <button
                  onClick={(e) => { e.stopPropagation(); onRemoveTab(tab.id); }}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            
            {/* Tab shape with rounded corners */}
            {activeTabId === tab.id && (
              <>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-lg bg-white dark:bg-gray-700"></div>
              </>
            )}
          </div>
        ))}
      </div>
      
      {showTabScrollButtons && showRightScroll && (
        <button 
          onClick={scrollRight}
          className="absolute right-10 z-10 px-1 h-10 bg-gradient-to-l from-gray-100 via-gray-100 to-transparent dark:from-gray-800 dark:via-gray-800 flex items-center justify-center"
        >
          <div className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </button>
      )}
      
      <button
        onClick={onAddTab}
        className="flex-none p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ml-2 mr-2 transition-colors"
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

export default TabBar;
import React, { useEffect, useRef } from 'react';
import { Tab } from '../../types';
import HomePage from '../content/HomePage';

// Safe electron import
const electron = window && (window as any).require ? (window as any).require('electron') : null;
const ipcRenderer = electron ? electron.ipcRenderer : null;

interface BrowserContentProps {
  activeTab: Tab;
  isDarkMode: boolean;
  onTitleChange: (tabId: string, title: string) => void;
  onUrlChange: (tabId: string, url: string) => void;
}

const BrowserContent: React.FC<BrowserContentProps> = ({ 
  activeTab, 
  isDarkMode,
  onTitleChange,
  onUrlChange
}) => {
  const webviewRef = useRef<Electron.WebviewTag>(null);

  useEffect(() => {
    if (webviewRef.current && activeTab.url) {
      const webview = webviewRef.current;

      webview.addEventListener('page-title-updated', (e: any) => {
        onTitleChange(activeTab.id, e.title);
      });

      webview.addEventListener('did-navigate', (e: any) => {
        onUrlChange(activeTab.id, e.url);
        
        // Save to history only if in Electron environment
        if (ipcRenderer) {
          ipcRenderer.send('save-history', {
            title: webview.getTitle(),
            url: e.url,
            timestamp: new Date().toISOString()
          });
        }
      });
    }
  }, [activeTab.id, activeTab.url]);

  if (!activeTab.url) {
    return (
      <div className="flex-grow overflow-auto">
        <HomePage isDarkMode={isDarkMode} />
      </div>
    );
  }

  return (
    <div className="flex-grow">
      <webview
        ref={webviewRef}
        src={activeTab.url}
        style={{ width: '100%', height: '100%' }}
        allowpopups="true"
      />
    </div>
  );
};

export default BrowserContent;
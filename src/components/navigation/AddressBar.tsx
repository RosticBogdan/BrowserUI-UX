import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Mic, Camera } from 'lucide-react';
const { ipcRenderer } = window.require('electron');

interface AddressBarProps {
  isDarkMode: boolean;
  currentUrl: string;
  onNavigate: (url: string) => void;
}

const AddressBar: React.FC<AddressBarProps> = ({ isDarkMode, currentUrl, onNavigate }) => {
  const [address, setAddress] = useState<string>(currentUrl || '');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    setAddress(currentUrl || '');
  }, [currentUrl]);

  useEffect(() => {
    const settings = ipcRenderer.sendSync('get-settings');
    setSettings(settings);
  }, []);

  const handleNavigate = (url: string) => {
    let finalUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      if (url.includes('.')) {
        finalUrl = `https://${url}`;
      } else {
        // Use selected search engine
        const searchEngine = settings?.searchEngine || 'Google';
        const searchUrls = {
          'Google': `https://www.google.com/search?q=${encodeURIComponent(url)}`,
          'DuckDuckGo': `https://duckduckgo.com/?q=${encodeURIComponent(url)}`,
          'Yandex': `https://yandex.com/search/?text=${encodeURIComponent(url)}`
        };
        finalUrl = searchUrls[searchEngine];
      }
    }
    onNavigate(finalUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNavigate(address);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className={`flex items-center h-10 px-3 rounded-full border ${
        isDarkMode 
          ? 'bg-gray-700 border-gray-600 text-white focus-within:bg-gray-800 focus-within:border-blue-500' 
          : 'bg-gray-100 border-gray-200 focus-within:bg-white focus-within:border-blue-400'
        } transition-all duration-200`}
      >
        <Search size={16} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mr-2`} />
        
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search or enter website name"
          className="flex-grow bg-transparent outline-none text-sm h-full"
        />
        
        <div className="flex items-center gap-2">
          {address && (
            <button 
              type="button"
              onClick={() => setAddress('')}
              className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
            >
              <X size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
            </button>
          )}
          
          <button 
            type="button"
            className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
          >
            <Mic size={16} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>
          
          <button 
            type="button"
            className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
          >
            <Camera size={16} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddressBar;
import React, { useState } from 'react';
import { Search, X, ArrowRight, Mic, Camera } from 'lucide-react';

interface AddressBarProps {
  isDarkMode: boolean;
}

const AddressBar: React.FC<AddressBarProps> = ({ isDarkMode }) => {
  const [address, setAddress] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleFocus = () => {
    setIsFocused(true);
    // Simulate search suggestions
    setSuggestions([
      'facebook.com',
      'github.com',
      'stackoverflow.com',
      'youtube.com',
      'amazon.com'
    ]);
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      setIsFocused(false);
      setSuggestions([]);
    }, 200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    // Simulate filtered suggestions based on input
    if (e.target.value) {
      setSuggestions([
        `${e.target.value}.com`,
        `search for ${e.target.value}`,
        `${e.target.value} latest news`,
        `${e.target.value} shop online`
      ]);
    } else {
      setSuggestions([]);
    }
  };

  const clearAddress = () => {
    setAddress('');
    setSuggestions([]);
  };

  return (
    <div className="relative">
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
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search or enter website name"
          className="flex-grow bg-transparent outline-none text-sm h-full"
        />
        
        <div className="flex items-center gap-2">
          {address && (
            <button 
              onClick={clearAddress}
              className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
            >
              <X size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
            </button>
          )}
          
          <button className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}>
            <Mic size={16} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>
          
          <button className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}>
            <Camera size={16} className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>
        </div>
      </div>
      
      {isFocused && suggestions.length > 0 && (
        <div className={`absolute top-full left-0 right-0 mt-1 rounded-lg shadow-lg overflow-hidden z-50 ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        }`}>
          {suggestions.map((suggestion, index) => (
            <div 
              key={index}
              className={`px-4 py-2 flex items-center gap-3 cursor-pointer ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <Search size={16} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
              <span className="flex-grow">{suggestion}</span>
              <ArrowRight size={16} className="text-gray-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressBar;
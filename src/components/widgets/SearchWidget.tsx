import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface SearchWidgetProps {
  isDarkMode: boolean;
}

const SearchWidget: React.FC<SearchWidgetProps> = ({ isDarkMode }) => {
  const [searchEngine, setSearchEngine] = useState('Google');
  const [showEngines, setShowEngines] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const engines = ['Google', 'Yandex', 'Bing', 'DuckDuckGo'];
  
  const handleEngineChange = (engine: string) => {
    setSearchEngine(engine);
    setShowEngines(false);
  };
  
  const getSearchEngineLogo = () => {
    switch (searchEngine) {
      case 'Google':
        return (
          <div className="text-lg font-medium">
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-green-500">l</span>
            <span className="text-red-500">e</span>
          </div>
        );
      case 'Yandex':
        return <div className="text-lg font-medium text-red-500">Yandex</div>;
      case 'Bing':
        return <div className="text-lg font-medium text-blue-600">Bing</div>;
      case 'DuckDuckGo':
        return <div className="text-lg font-medium text-orange-500">DuckDuckGo</div>;
      default:
        return <div className="text-lg font-medium">Search</div>;
    }
  };
  
  return (
    <div className="w-full max-w-2xl">
      <div className="flex justify-center mb-5">
        {getSearchEngineLogo()}
      </div>
      
      <div className={`relative ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        <div className={`flex items-center h-12 px-4 rounded-full border-2 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700 focus-within:border-blue-500' 
            : 'bg-white border-gray-200 focus-within:border-blue-400'
        } shadow-sm`}>
          <div className="relative">
            <button
              className="flex items-center gap-1 pr-3 border-r border-gray-300 dark:border-gray-600"
              onClick={() => setShowEngines(!showEngines)}
            >
              <span className="text-sm">{searchEngine}</span>
              <ChevronDown size={14} />
            </button>
            
            {showEngines && (
              <div className={`absolute top-full left-0 mt-1 py-1 rounded-lg shadow-lg z-20 ${
                isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}>
                {engines.map((engine) => (
                  <button
                    key={engine}
                    className={`block w-full text-left px-4 py-2 ${
                      isDarkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-100'
                    } ${searchEngine === engine ? 'font-medium' : ''}`}
                    onClick={() => handleEngineChange(engine)}
                  >
                    {engine}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-3 py-2 bg-transparent outline-none text-sm"
            placeholder="Search the web"
          />
          
          <button className={`p-2 rounded-full ${
            isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}>
            <Search size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchWidget;
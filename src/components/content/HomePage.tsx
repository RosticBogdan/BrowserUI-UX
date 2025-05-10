import React from 'react';
import SearchWidget from '../widgets/SearchWidget';
import QuickLinks from '../widgets/QuickLinks';
import NewsWidget from '../widgets/NewsWidget';
import WeatherWidget from '../widgets/WeatherWidget';

interface HomePageProps {
  isDarkMode: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isDarkMode }) => {
  return (
    <div className={`min-h-full p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-8 pt-12">
          <SearchWidget isDarkMode={isDarkMode} />
        </div>
        
        <div className="mb-8">
          <QuickLinks isDarkMode={isDarkMode} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NewsWidget isDarkMode={isDarkMode} />
          <WeatherWidget isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
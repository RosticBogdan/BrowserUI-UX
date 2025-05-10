import React from 'react';
import { Newspaper } from 'lucide-react';

interface NewsWidgetProps {
  isDarkMode: boolean;
}

const NewsWidget: React.FC<NewsWidgetProps> = ({ isDarkMode }) => {
  const news = [
    {
      title: 'New Browser Features Released',
      source: 'Tech News',
      time: '2 hours ago',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: 'Study Shows Increased Browser Usage During Pandemic',
      source: 'Web Insights',
      time: '5 hours ago',
      image: 'https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: 'Security Researchers Identify New Browser Vulnerabilities',
      source: 'Cyber Security Today',
      time: '1 day ago',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];
  
  return (
    <div className={`p-4 rounded-lg ${
      isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'
    }`}>
      <div className="flex items-center gap-2 mb-4">
        <Newspaper size={20} className="text-blue-500" />
        <h2 className="text-lg font-medium">Latest News</h2>
      </div>
      
      <div className="space-y-4">
        {news.map((item, index) => (
          <div key={index} className="flex gap-3">
            <div className="flex-none w-20 h-16 rounded overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium text-sm mb-1">{item.title}</h3>
              <div className="flex text-xs gap-2">
                <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>{item.source}</span>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>•</span>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className={`w-full mt-4 py-2 text-center text-sm ${
        isDarkMode 
          ? 'text-blue-400 hover:text-blue-300' 
          : 'text-blue-600 hover:text-blue-700'
      }`}>
        View more news
      </button>
    </div>
  );
};

export default NewsWidget;
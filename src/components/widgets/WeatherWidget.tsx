import React from 'react';
import { Cloud, CloudRain, Sun, Thermometer } from 'lucide-react';

interface WeatherWidgetProps {
  isDarkMode: boolean;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ isDarkMode }) => {
  return (
    <div className={`p-4 rounded-lg ${
      isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Thermometer size={20} className="text-blue-500" />
          <h2 className="text-lg font-medium">Weather</h2>
        </div>
        <span className="text-sm">New York, NY</span>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Sun size={40} className="text-yellow-500" />
          <div>
            <div className="text-3xl font-medium">72°F</div>
            <div className="text-sm">Sunny</div>
          </div>
        </div>
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <div>H: 78°F</div>
          <div>L: 65°F</div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 text-center">
        {[
          { day: 'Tue', icon: <Sun size={20} className="text-yellow-500" />, temp: '75°' },
          { day: 'Wed', icon: <Cloud size={20} className="text-gray-500" />, temp: '70°' },
          { day: 'Thu', icon: <CloudRain size={20} className="text-blue-400" />, temp: '65°' },
          { day: 'Fri', icon: <Sun size={20} className="text-yellow-500" />, temp: '72°' }
        ].map((day, index) => (
          <div key={index} className={`p-2 rounded-lg ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <div className="text-sm mb-1">{day.day}</div>
            <div className="flex justify-center mb-1">{day.icon}</div>
            <div className="text-sm font-medium">{day.temp}</div>
          </div>
        ))}
      </div>
      
      <button className={`w-full mt-4 py-2 text-center text-sm ${
        isDarkMode 
          ? 'text-blue-400 hover:text-blue-300' 
          : 'text-blue-600 hover:text-blue-700'
      }`}>
        View detailed forecast
      </button>
    </div>
  );
};

export default WeatherWidget;
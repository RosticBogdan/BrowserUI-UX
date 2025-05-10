import React from 'react';
import { Youtube, Github, Mail, ShoppingCart, Coffee, FileText, Map, Calendar } from 'lucide-react';

interface QuickLinksProps {
  isDarkMode: boolean;
}

const QuickLinks: React.FC<QuickLinksProps> = ({ isDarkMode }) => {
  const links = [
    { title: 'YouTube', icon: <Youtube size={24} className="text-red-500" /> },
    { title: 'GitHub', icon: <Github size={24} /> },
    { title: 'Gmail', icon: <Mail size={24} className="text-blue-500" /> },
    { title: 'Amazon', icon: <ShoppingCart size={24} className="text-amber-500" /> },
    { title: 'Medium', icon: <FileText size={24} className="text-emerald-500" /> },
    { title: 'Maps', icon: <Map size={24} className="text-green-500" /> },
    { title: 'Calendar', icon: <Calendar size={24} className="text-indigo-500" /> },
    { title: 'Coffee', icon: <Coffee size={24} className="text-yellow-700" /> }
  ];
  
  return (
    <div className="px-4">
      <h2 className={`mb-4 text-lg font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Quick Links</h2>
      
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
        {links.map((link, index) => (
          <a
            key={index}
            href="#"
            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-transform hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-white hover:bg-gray-50 shadow-sm'
            }`}
          >
            <div className={`flex items-center justify-center h-12 w-12 rounded-full mb-2 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              {link.icon}
            </div>
            <span className="text-sm">{link.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
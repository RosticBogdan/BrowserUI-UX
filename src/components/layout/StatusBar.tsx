import React from 'react';
import { Lock, Info, Shield } from 'lucide-react';

interface StatusBarProps {
  url: string;
  isDarkMode: boolean;
}

const StatusBar: React.FC<StatusBarProps> = ({ url, isDarkMode }) => {
  const isSecure = url && (url.startsWith('https://') || url === '');
  
  return (
    <div className={`h-6 px-4 flex items-center text-xs border-t ${
      isDarkMode 
        ? 'bg-gray-800 text-gray-300 border-gray-700' 
        : 'bg-gray-50 text-gray-600 border-gray-200'
    }`}>
      <div className="flex-none flex items-center gap-1">
        {isSecure ? (
          <>
            <Lock size={12} className="text-green-500" />
            <span className="text-green-500">Secure</span>
          </>
        ) : url ? (
          <>
            <Info size={12} className="text-amber-500" />
            <span className="text-amber-500">Not Secure</span>
          </>
        ) : (
          <>
            <Shield size={12} className="text-blue-500" />
            <span className="text-blue-500">Browser</span>
          </>
        )}
      </div>
      <div className="flex-grow text-center truncate">
        {url ? url : 'New Tab'}
      </div>
      <div className="flex-none">
        {url && <span>100% rendered</span>}
      </div>
    </div>
  );
};

export default StatusBar;
import React, { useState } from 'react';
import { Folder, ChevronRight, Star, Youtube, Github, Mail, ShoppingCart } from 'lucide-react';

interface BookmarkBarProps {
  isDarkMode: boolean;
}

const BookmarkBar: React.FC<BookmarkBarProps> = ({ isDarkMode }) => {
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  
  const toggleFolder = (folderId: string) => {
    if (activeFolder === folderId) {
      setActiveFolder(null);
    } else {
      setActiveFolder(folderId);
    }
  };

  // Sample bookmark data
  const bookmarks = [
    { id: 'bm1', title: 'GitHub', icon: <Github size={16} /> },
    { id: 'bm2', title: 'YouTube', icon: <Youtube size={16} className="text-red-500" /> },
    { id: 'bm3', title: 'Gmail', icon: <Mail size={16} className="text-blue-500" /> },
    { id: 'bm4', title: 'Amazon', icon: <ShoppingCart size={16} className="text-amber-500" /> },
    { 
      id: 'folder1', 
      title: 'Social Media', 
      isFolder: true,
      children: [
        { id: 'bm5', title: 'Twitter', icon: <Star size={16} className="text-blue-400" /> },
        { id: 'bm6', title: 'Facebook', icon: <Star size={16} className="text-blue-600" /> },
        { id: 'bm7', title: 'Instagram', icon: <Star size={16} className="text-pink-500" /> }
      ]
    },
    { 
      id: 'folder2', 
      title: 'News', 
      isFolder: true,
      children: [
        { id: 'bm8', title: 'BBC', icon: <Star size={16} /> },
        { id: 'bm9', title: 'CNN', icon: <Star size={16} /> },
        { id: 'bm10', title: 'The Guardian', icon: <Star size={16} /> }
      ]
    }
  ];
  
  return (
    <div className={`flex items-center h-9 px-2 text-sm overflow-x-auto border-b ${
      isDarkMode 
        ? 'bg-gray-800 text-gray-200 border-gray-700' 
        : 'bg-gray-50 text-gray-700 border-gray-200'
    }`}>
      {bookmarks.map((bookmark) => (
        <React.Fragment key={bookmark.id}>
          {bookmark.isFolder ? (
            <div className="relative">
              <button
                onClick={() => toggleFolder(bookmark.id)}
                className={`flex items-center gap-1 px-3 h-7 rounded whitespace-nowrap ${
                  isDarkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-200'
                }`}
              >
                <Folder size={14} className="text-blue-400" />
                <span>{bookmark.title}</span>
                <ChevronRight size={14} className={`transition-transform ${activeFolder === bookmark.id ? 'rotate-90' : ''}`} />
              </button>
              
              {activeFolder === bookmark.id && (
                <div className={`absolute top-full left-0 mt-1 py-1 rounded-lg shadow-lg z-20 min-w-[200px] ${
                  isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}>
                  {bookmark.children?.map((child) => (
                    <a
                      key={child.id}
                      href="#"
                      className={`flex items-center gap-2 px-4 py-2 ${
                        isDarkMode 
                          ? 'hover:bg-gray-700' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {child.icon}
                      <span>{child.title}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <a
              href="#"
              className={`flex items-center gap-2 px-3 h-7 rounded whitespace-nowrap ${
                isDarkMode 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-200'
              }`}
            >
              {bookmark.icon}
              <span>{bookmark.title}</span>
            </a>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BookmarkBar;
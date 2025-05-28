import React, { createContext, useContext, useState } from 'react';

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState({});

  const isBookmarked = (recipeId) => {
    return bookmarks[recipeId] || false;
  };

  const toggleBookmark = (recipeId) => {
    setBookmarks(prev => ({
      ...prev,
      [recipeId]: !prev[recipeId]
    }));
  };

  return (
    <BookmarkContext.Provider value={{ isBookmarked, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmark must be used within a BookmarkProvider');
  }
  return context;
}; 
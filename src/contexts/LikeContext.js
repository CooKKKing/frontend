import React, { createContext, useContext, useState } from 'react';

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likes, setLikes] = useState({});

  const isLiked = (recipeId) => {
    return likes[recipeId] || false;
  };

  const toggleLike = (recipeId) => {
    setLikes(prev => ({
      ...prev,
      [recipeId]: !prev[recipeId]
    }));
  };

  return (
    <LikeContext.Provider value={{ isLiked, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLike = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error('useLike must be used within a LikeProvider');
  }
  return context;
}; 
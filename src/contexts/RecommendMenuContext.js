import React, { createContext, useContext, useState } from 'react';

const RecommendMenuContext = createContext();

export const RecommendMenuProvider = ({ children }) => {
  const [recommendMenu, setRecommendMenu] = useState(null);

  return (
    <RecommendMenuContext.Provider value={{ recommendMenu, setRecommendMenu }}>
      {children}
    </RecommendMenuContext.Provider>
  );
};

export const useRecommendMenu = () => {
  const context = useContext(RecommendMenuContext);
  if (!context) {
    throw new Error('useRecommentMenu must be used within a RecommentMenuProvider');
  }
  return context;
}; 
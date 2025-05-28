import React, { createContext, useContext, useState } from 'react';

const ShowDetailContext = createContext();

export const ShowDetailProvider = ({ children }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <ShowDetailContext.Provider value={{ showDetail, setShowDetail }}>
      {children}
    </ShowDetailContext.Provider>
  );
};

export const useShowDetail = () => {
  const context = useContext(ShowDetailContext);
  if (!context) {
    throw new Error('useShowDetail must be used within a ShowDetailProvider');
  }
  return context;
}; 
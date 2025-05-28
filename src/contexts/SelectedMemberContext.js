import React, { createContext, useContext, useState } from 'react';

const SelectedMemberContext = createContext();

export const SelectedMemberProvider = ({ children }) => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <SelectedMemberContext.Provider value={{ selectedMember, setSelectedMember }}>
      {children}
    </SelectedMemberContext.Provider>
  );
};

export const useSelectedMember = () => {
  const context = useContext(SelectedMemberContext);
  if (!context) {
    throw new Error('useSelectedMember must be used within a SelectedMemberProvider');
  }
  return context;
}; 
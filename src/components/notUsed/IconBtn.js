import React from 'react';

const IconBtn = ({ icon, onClick, className }) => {
  return (
    <button className={`p-4 bg-white shadow-icon rounded-full ${className}`} onClick={onClick}>
      {icon}
    </button>
  );
};

export default IconBtn;
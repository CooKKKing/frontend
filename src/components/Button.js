import React from 'react';

const Button = ({ size = 'medium', variant = 'default', disabled = false, value }) => {
  const baseClasses =
    ' font-medium flex items-center justify-center transition-opacity duration-300';
  
    // rounded-lg = 8
    // rounded-full 
  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
    fit: 'w-full py-2 text-base',
  };

  const variantClasses = {
    orange:
      disabled
        ? 'rounded-lg bg-orange-light text-gray-400 cursor-not-allowed'
        : `rounded-lg text-white bg-orange-gradient hover:bg-orange`,
    green:
      disabled
        ? 'rounded-lg bg-green-light text-gray-400 cursor-not-allowed'
        : `rounded-lg text-white bg-green-gradient hover:bg-green`,
    outlineOrange:
      disabled
        ? 'border border-orange-light text-gray-400 cursor-not-allowed'
        : `border border-orange text-orange hover:bg-orange-light`,
    outlineGreen:
      disabled
        ? 'border border-green-light text-gray-400 cursor-not-allowed'
        : `border border-green text-green hover:bg-green-light`,
    roundOrange:
        disabled
        ? `rounded-full border border-orange-light text-gray-400 cursor-not-allowed`
        : `rounded-full border border-orange text-orange hover:bg-orange-light`,
    roundGreen:
        disabled
        ? `rounded-full border border-gray text-gray-400 cursor-not-allowed`
        : `rounded-full border border-green text-green hover:bg-green-light`,
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${
        variantClasses[variant]
      }`}
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default Button;

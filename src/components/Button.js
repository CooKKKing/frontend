import React from 'react';

const Button = ({ 
  type = "button", // *수정* 홍성민
  size = 'medium', 
  variant = 'default', 
  disabled = false, 
  value,
  height,
  onClick,
}) => {
  const baseClasses =
    `${height ? `h-[${height}]` : ''} px-[12px] py-[8px] font-medium flex items-center justify-center transition-opacity duration-300`;
  
    // rounded-lg = 8
    // rounded-full 
  const sizeClasses = {
    small: 'min-w-[120px] text-base',
    medium: 'min-w-[120px] text-lg',
    large: 'min-w-[120px] text-xl',
    fit: 'w-fit text-base',
    full: 'w-full text-base',
  };

  const variantClasses = {
    orange:
      disabled
        ? 'rounded-lg bg-disabled text-white cursor-not-allowed'
        : `rounded-lg text-white bg-orange-gradient hover:bg-orange`,
    green:
      disabled
        ? 'rounded-lg bg-disabled text-white cursor-not-allowed'
        : `rounded-lg text-white bg-green-gradient hover:bg-green`,
    outlineOrange:
      disabled
        ? 'border border-disabled bg-disabled-light text-disabled cursor-not-allowed'
        : `border border-orange bg-white text-orange hover:bg-orange-light`,
    outlineGreen:
      disabled
        ? 'border border-disabled bg-disabled-light text-disabled cursor-not-allowed'
        : `border border-green bg-white text-green hover:bg-green-light`,
    roundOrange:
        disabled
        ? `rounded-full border border-disabled bg-disabled-light text-disabled cursor-not-allowed`
        : `rounded-full border border-orange bg-white text-orange hover:bg-orange-light`,
    roundGreen:
        disabled
        ? `rounded-full border border-disabled bg-disabled-light text-disabled cursor-not-allowed`
        : `rounded-full border border-green bg-white text-green hover:bg-green-light`,
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${sizeClasses[size]} ${
        variantClasses[variant]
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;

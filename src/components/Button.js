import React from 'react';

const Button = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-lg transition-colors focus:outline-none';

  const variantStyles = {
    default: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
    orange: 'bg-orange-500 text-white hover:bg-orange-600',
    green: 'bg-green-500 text-white hover:bg-green-600',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
    fit: 'px-4 py-2',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

import React from 'react';

const RadioButton = ({
  id,
  name,
  value,
  checked = false,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="hidden"
      />
      <label
        htmlFor={id}
        className={`flex items-center justify-center px-4 py-2 rounded-full cursor-pointer transition-all
          ${checked 
            ? 'bg-green-500 text-white font-medium' 
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default RadioButton;

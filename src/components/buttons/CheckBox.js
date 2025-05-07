import React from 'react';

const Checkbox = ({
  id,
  name,
  checked = false,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 accent-orange bg-gray-100 border-gray-300 rounded focus:ring-orange disabled:opacity-50"
      />
      {label && (
        <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-900 select-none cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;

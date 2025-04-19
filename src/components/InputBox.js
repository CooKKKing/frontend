import React from 'react';
import Button from './Button';

const InputBox = ({
  label,
  value,
  onChange,
  placeholder = "Placeholder",
  buttonText = "확인",
  onButtonClick,
  buttonSize = 'small', // 모바일에서 small로 시작
  buttonVariant = 'orange',
  disabled = false,
  inputClassName = '',
  buttonClassName = '',
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-lg font-bold text-gray-900">{label}</label>
      )}

      <div className="flex items-center w-full">
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            flex-1
            h-[48px]
            px-5
            border
            rounded-lg
            text-xl
            bg-white
            placeholder:text-gray-300
            disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200
            focus:outline-none focus:ring-2 focus:ring-orange-200
            ${inputClassName}
          `}
        />
        <div className="ml-2 flex-shrink-0">
          <Button
            size={buttonSize}
            variant={buttonVariant}
            disabled={disabled}
            value={buttonText}
            onClick={onButtonClick}
            className={`w-[80px] md:w-[120px] px-0 text-lg ${buttonClassName}`} // 반응형 width
          />
        </div>
      </div>
    </div>
  );
};

export default InputBox;

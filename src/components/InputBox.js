import React from 'react';
import Button from './Button';
import useIsMobile from '../hooks/useIsMobile';

const InputBox = ({
  label,
  value,
  onChange,
  placeholder = "Placeholder",
  buttonText = "확인",
  onButtonClick,
  buttonVariant = 'orange',
  disabled = false,
}) => {
  const {isMobile, isTablet} = useIsMobile();

  // 1280px 이하(태블릿 또는 모바일)일 때 fit, 그 외에는 medium
  const buttonSize = (isTablet || isMobile) ? 'fit' : 'medium';

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-base md:text-lg font-bold text-gray-900">{label}</label>
      )}

      <div className="flex items-center w-full gap-2">
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            flex-1
            h-[48px]
            px-3
            md:px-5
            border
            rounded-lg
            text-base
            md:text-xl
            bg-white
            placeholder:text-gray-300
            disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200
            focus:outline-none focus:ring-2 focus:ring-orange-200
          `}
        />
        <div className="flex-shrink-0">
          <Button
            size={buttonSize}
            variant={buttonVariant}
            disabled={disabled}
            value={buttonText}
            onClick={onButtonClick}
            height="48px"
          />
        </div>
      </div>
    </div>
  );
};

export default InputBox;

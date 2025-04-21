import React from 'react';
import Button from './Button';
import useIsMobile from '../hooks/useIsMobile';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const InputBox = ({
  label,
  value,
  onChange,
  placeholder = "Placeholder",
  buttonText = "확인",
  onButtonClick,
  buttonVariant = 'orange',
  disabled = false,
  discription,
  isSecret = false,
  onEyeClick,
  showEye = false,
  showButton = true
}) => {
  const { isMobile, isTablet } = useIsMobile();

  // 1280px 이하(태블릿 또는 모바일)일 때 fit, 그 외에는 medium
  const buttonSize = (isTablet || isMobile) ? 'fit' : 'medium';

  return (
    <div className="w-full flex flex-col items-start justify-start">
      {label && (
        <label className="block mb-2 text-sm md:text-base lg:text-lg font-bold text-gray-900 text-left">{label}</label>
      )}

      <div className="flex items-center w-full gap-2">
        <div className="relative flex-1 min-w-0">
          <input
            type={showEye ? (isSecret ? 'password' : 'text') : 'text'}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`
              w-full
              min-w-0
              h-[44px] md:h-[48px]
              px-3 md:px-5
              border
              rounded-lg
              text-sm md:text-base lg:text-lg
              bg-white
              placeholder:text-xs md:placeholder:text-base lg:placeholder:text-lg
              placeholder:text-gray-300
              disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200
              focus:outline-none focus:ring-2 focus:ring-orange-200
              text-left
              ${showEye ? 'pr-12' : ''}
            `}
          />
          {showEye && (
            <button
              type="button"
              onClick={onEyeClick}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
              tabIndex={-1}
              aria-label={isSecret ? '비밀번호 표시' : '비밀번호 숨김'}
              disabled={disabled}
            >
              {isSecret ? <FaEye /> : <FaEyeSlash />}
            </button>
          )}
        </div>
      {showButton !== false && (
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
      )}
      </div>
      {discription && (
        <div className="mt-1 text-xs md:text-sm text-gray-500 text-left">{discription}</div>
      )}
    </div>
  );
};

export default InputBox;

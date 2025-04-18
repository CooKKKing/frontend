import React from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from './Button';

const InputBox = ({
  label,
  description,
  value,
  onChange,
  placeholder,
  buttonText,
  onButtonClick,
  buttonSize = 'medium',
  buttonVariant = 'orange',
  disabled = false,
  showEye = false,
  isSecret, // 시크릿 모드 (true: 숨김, false: 표시)
  onEyeClick,
  inputClassName = '',
}) => {
  // input 타입 결정: 시크릿 모드면 'password', 아니면 'text'
  const inputType = isSecret ? 'password' : 'text';

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-900">{label}</label>
      )}

      <div className="flex items-center gap-2 w-full">
        <div className="relative flex-1">
          <input
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`
              w-full h-[48px] px-4 pr-10
              border rounded-lg text-base
              bg-white placeholder:text-gray-300
              disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200
              focus:outline-none focus:ring-2 focus:ring-orange-200
              ${inputClassName}
            `}
          />

          {/* Eye 아이콘 (시크릿 모드 토글) */}
          {showEye && (
            <div className="absolute inset-y-0 right-3 flex items-center">
              <button
                type="button"
                onClick={onEyeClick}
                disabled={disabled}
                className="p-1 bg-transparent hover:bg-gray-100 rounded-full transition disabled:opacity-50"
                tabIndex={-1}
              >
                {isSecret ? (
                  <FaEye size={20} className="text-gray-400" />
                ) : (
                    <FaEyeSlash size={20} className="text-gray-400" />
                  
                )}
              </button>
            </div>
          )}
        </div>

        {buttonText && (
          <Button
            size={buttonSize}
            variant={buttonVariant}
            disabled={disabled}
            value={buttonText}
            onClick={onButtonClick}
          />
        )}
      </div>

      {description && (
        <div className="mt-1 text-xs text-gray-400">{description}</div>
      )}
    </div>
  );
};

export default InputBox;

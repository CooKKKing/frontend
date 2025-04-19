import React from 'react';
import Button from './Button';
import useEmailInput from '../hooks/useEmailInput';

const EmailInputBox = ({
  label,
  buttonText = "확인",
  buttonVariant = "orange",
  buttonSize = "medium",
  onButtonClick,
  disabled = false,
}) => {
  const {
    local,
    domain,
    error,
    dropdownOpen,
    email,
    domainList,
    isValidEmail,
    handleLocalChange,
    handleDomainSelect,
    handleDropdownToggle,
  } = useEmailInput();

  return (
    <div className="w-full max-w-2xl">
      {label && (
        <label className="block mb-2 text-lg font-bold text-gray-900">{label}</label>
      )}
      <div className="flex items-center w-full gap-2">
        {/* 이메일 앞부분 */}
        <input
          type="text"
          value={local}
          onChange={handleLocalChange}
          placeholder="이메일 입력"
          disabled={disabled}
          className={`h-[48px] px-4 border border-gray-300 rounded-lg text-base bg-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 transition ${
            error ? 'border-red-500' : ''
          }`}
          autoComplete="off"
        />

        {/* @ 기호 */}
        <span className="text-xl font-bold select-none bg-transparent"> @ </span>

        {/* 도메인 드롭다운 */}
        <div className="relative flex items-center">
          <button
            type="button"
            disabled={disabled}
            onClick={handleDropdownToggle}
            className={`
              h-[48px] w-[160px] px-4 flex items-center justify-between border border-gray-300 rounded-lg bg-white text-base
              ${dropdownOpen ? "ring-2 ring-orange-200" : ""}
              ${domain && domain !== "선택" ? "text-black" : "text-gray-400"}
              transition
            `}
            tabIndex={0}
          >
            <span className="truncate">{domain}</span>
            <svg
              className="ml-2 w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {dropdownOpen && (
            <ul className="absolute left-0 top-[110%] z-10 w-full bg-white border border-gray-300 rounded-lg shadow-md">
              {domainList.map((d) => (
                <li
                  key={d}
                  className="px-4 py-2 cursor-pointer hover:bg-orange-100"
                  onClick={() => handleDomainSelect(d)}
                >
                  {d}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 확인 버튼 */}
        <div className="flex-shrink-0 w-[100px]">
          <Button
            size={buttonSize}
            variant={buttonVariant}
            disabled={disabled || !isValidEmail}
            value={buttonText}
            onClick={() => onButtonClick?.(email)}
            className="h-[48px] w-full text-lg"
          />
        </div>
      </div>
      {/* 에러 메시지 */}
      {error && (
        <div className="mt-1 text-xs text-red-500">{error}</div>
      )}
    </div>
  );
};

export default EmailInputBox; 

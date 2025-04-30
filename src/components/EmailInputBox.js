import React from 'react';
import Button from './Button';
import useIsMobile from '../hooks/useIsMobile';

const EmailInputBox = ({
  label,
  local,
  setLocal,
  domain,
  setDomain,
  dropdownOpen,
  setDropdownOpen,
  error,
  domainList,
  buttonText = "확인",
  buttonVariant = "orange",
  onButtonClick,
  disabled = false,
  handleDropdownToggle,
  handleDomainSelect,
  handleLocalChange,
}) => {
  const { isMobile, isTablet, isSmallMobile } = useIsMobile();
  const buttonSize = isSmallMobile ? 'full' : isTablet ? 'fit' : 'medium';

  // 이메일 사용 가능 메시지일 때 검은색, 에러면 빨간색
  const getErrorColor = () => {
    if (error === "사용 가능한 이메일입니다.") return "text-black";
    if (error) return "text-red-500";
    return "";
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-lg font-bold text-gray-900">{label}</label>
      )}
      <div className={`flex flex-row items-center w-full gap-2 ${isSmallMobile ? "flex-col" : ""}`}>
        <div className="flex gap-2 items-center w-full">
          {/* 이메일 앞부분 */}
          <input
            type="text"
            value={local}
            onChange={handleLocalChange}
            placeholder="이메일 입력"
            disabled={disabled}
            className={`h-[48px] w-full px-4 border border-gray-300 rounded-lg text-base bg-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 transition ${
              error && error !== "사용 가능한 이메일입니다." ? 'border-red-500' : ''
            }`}
            autoComplete="off"
          />

          {/* @ 기호 */}
          <span className="text-xl font-bold select-none bg-transparent"> @ </span>

          {/* 도메인 드롭다운 */}
          <div className="relative flex items-center w-full min-w-[160px]">
            <button
              type="button"
              disabled={disabled}
              onClick={handleDropdownToggle}
              className={`
                h-[48px] w-full px-4 flex items-center justify-between border border-gray-300 rounded-lg bg-white text-base
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
        </div>

        {/* 인증번호 전송 버튼 */}
        <div className={`h-full flex-shrink-0 ${isSmallMobile ? 'w-full' : ''}`}>
          <Button
            type="button"
            size={buttonSize}
            variant={buttonVariant}
            disabled={disabled || !local || !domain || domain === "선택"}
            value={buttonText}
            onClick={onButtonClick}
            height="48px"
          />
        </div>
      </div>
      {/* 에러 or 사용 가능 메시지 */}
      {error && (
        <div className={`mt-1 text-xs ${getErrorColor()}`}>{error}</div>
      )}
    </div>
  );
};

export default EmailInputBox;

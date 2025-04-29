import React, { useEffect, useState } from 'react';
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
  description,
  isSecret = false,
  onEyeClick,
  showEye = false,
  showButton = true,
  // --- 타이머 관련 props 추가 ---
  showTimer = false,         // **수정**: 타이머 표시 여부
  timerSeconds = 180,        // **수정**: 타이머 초기값(3분)
  timerActive = false,       // **수정**: 타이머 활성화 여부(외부에서 제어)
  onTimerEnd,                // **수정**: 타이머 종료 콜백
}) => {
  const { isMobile, isTablet } = useIsMobile();
  const buttonSize = (isTablet || isMobile) ? 'fit' : 'medium';

  // --- 타이머 상태 및 로직 ---
  const [timer, setTimer] = useState(timerSeconds);

  useEffect(() => {
    let interval;
    // 타이머 활성화 조건
    if (showTimer && timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            if (onTimerEnd) onTimerEnd(); // 타이머 종료 콜백
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    // 타이머가 비활성화되면 초기화
    if (!timerActive) {
      setTimer(timerSeconds);
    }
    return () => clearInterval(interval);
  }, [showTimer, timerActive, timerSeconds, onTimerEnd]);

  // 타이머 표시 포맷 (mm:ss)
  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

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
          {/* --- 타이머 표시 (input 우측 가장 끝) --- */}
          {showTimer && (
            <span
              className="absolute top-1/2 right-3 translate-y-[-50%] text-xs md:text-sm font-bold"
              style={{ color: '#ef4444', right: showEye ? '2.5rem' : '0.75rem' }} // 빨간색, 아이콘 있을 때 위치 조정
            >
              {formatTime()}
            </span>
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
      {description && (
        <div className="mt-1 text-xs md:text-sm text-gray-500 text-left">{description}</div>
      )}
    </div>
  );
};

export default InputBox;

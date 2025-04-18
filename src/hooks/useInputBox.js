import { useState } from 'react';

// 시크릿 입력 상태 관리 훅
export default function useInputBox({
  initialValue = '',
  initialDisabled = false,
  initialSecret = false, // 시크릿 모드 초기값 (기본값: 숨김)
}) {
  const [value, setValue] = useState(initialValue);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [isSecret, setIsSecret] = useState(initialSecret); // 시크릿 모드 상태

  // 입력값 변경 핸들러
  const handleChange = (e) => setValue(e.target.value);

  // 시크릿 모드 토글 핸들러
  const handleEyeClick = () => setIsSecret((prev) => !prev);

  return {
    value,
    setValue,
    disabled,
    setDisabled,
    isSecret, // 시크릿 모드 여부 (true: 숨김, false: 표시)
    handleChange,
    handleEyeClick,
  };
}

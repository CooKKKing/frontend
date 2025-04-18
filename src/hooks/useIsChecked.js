import { useState } from 'react';

// 단일 체크박스 상태를 관리하는 커스텀 훅
export const useCheckbox = (initialChecked = false) => {
  // checked: 체크박스의 현재 체크 상태를 저장하는 state
  const [checked, setChecked] = useState(initialChecked);
  
  // 체크박스가 클릭될 때 호출되는 함수 (상태를 반전시킴)
  const handleChange = () => {
    setChecked(prev => !prev); // 현재 상태의 반대로 변경
  };

  // 현재 체크 상태와 변경 함수 반환
  return { checked, handleChange };
};

// 여러 개의 체크박스 상태를 객체로 관리하는 커스텀 훅
export const useCheckboxGroup = (initialState = {}) => {
  // checks: 각 체크박스의 상태를 {이름: true/false} 형태로 저장하는 state
  const [checks, setChecks] = useState(initialState);

  // 특정 체크박스가 클릭될 때 호출되는 함수 (이름을 받아 해당 상태만 반전)
  const handleChange = (name) => {
    setChecks(prev => ({
      ...prev, // 기존 상태 복사
      [name]: !prev[name] // 해당 name의 상태만 반전
    }));
  };

  // 전체 체크박스 상태와 변경 함수 반환
  return { checks, handleChange };
};
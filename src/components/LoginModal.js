import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import InputBox from './InputBox';

const LoginModal = ({ isOpen, onClose }) => {
  const [idInput, setIdInput] = useState('');
  const [pwInput, setPwInput] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleFindId = () => {
    onClose();
    navigate('/find-id');
  };

  const handleFindPassword = () => {
    onClose();
    navigate('/find-password');
  };

  const hadleSignUp = () => {
    onClose();
    navigate('/signup');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    onClose();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md mx-4 p-6">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-3 right-3 text-xl text-black hover:text-orange-600 transition"
          onClick={onClose}
          aria-label="닫기"
        >
          <IoMdClose size={22} />
        </button>
        {/* 타이틀 */}
        <h2 className="text-center text-base sm:text-xl font-bold mb-6">로그인</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          {/* 아이디 입력 */}
          <InputBox
            label={<span className="text-xs sm:text-sm md:text-base">아이디</span>}
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            placeholder="아이디를 입력해주세요."
            buttonText="확인"
            onButtonClick={() => {}}
            buttonVariant="orange"
            showEye={false}
            showButton={false}
            inputClassName="text-xs sm:text-sm md:text-base placeholder:text-[11px] sm:placeholder:text-sm md:placeholder:text-base px-2 sm:px-3"
          />
          {/* 비밀번호 입력 */}
          <div className="mt-3">
            <InputBox
              label={<span className="text-xs sm:text-sm md:text-base">비밀번호</span>}
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
              placeholder="비밀번호를 입력해주세요."
              buttonText="확인"
              onButtonClick={() => {}}
              buttonVariant="orange"
              isSecret={pwInput.isSecret}
              onEyeClick={pwInput.handleEyeClick}
              showEye={true}
              showButton={false}
              inputClassName="text-xs sm:text-sm md:text-base placeholder:text-[11px] sm:placeholder:text-sm md:placeholder:text-base px-2 sm:px-3"
            />
          </div>
          {/* 아이디/비밀번호 찾기 */}
          <div className="flex justify-center gap-x-14 mt-4 mb-4 text-[11px] sm:text-xs text-black">
            <button 
              className="hover:underline" 
              type="button"
              onClick={handleFindId}
            >
              아이디 찾기
            </button>
            <button 
              className="hover:underline" 
              type="button"
              onClick={handleFindPassword}
            >
              비밀번호 찾기
            </button>
          </div>
        
          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full py-3 bg-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            로그인
          </button>
          <div className="flex justify-center gap-x-14 mt-4 mb-4 text-[11px] sm:text-xs text-black">
            <button className="hover:underline" type="button" onClick={hadleSignUp}>회원가입</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

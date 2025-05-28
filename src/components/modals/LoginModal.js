import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import InputBox from '../inputs/InputBox';
import { useUser } from '../../hooks/useUser';

const LoginModal = ({ isOpen, onClose }) => {
  const [idInput, setIdInput] = useState('');
  const [pwInput, setPwInput] = useState('');
  const [error, setError] = useState('');
  const { login } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!idInput || !pwInput) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const credentials = {
        id: idInput,
        password: pwInput
      };
      
      await login(credentials);
      onClose();
      navigate('/');
    } catch (error) {
      setError('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

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
              type={showPassword ? 'text' : 'password'}
              isSecret={true}
              showEye={true}
              showButton={false}
              onEyeClick={togglePasswordVisibility}
              inputClassName="text-xs sm:text-sm md:text-base placeholder:text-[11px] sm:placeholder:text-sm md:placeholder:text-base px-2 sm:px-3"
            />
          </div>
          
          {/* 에러 메시지 */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

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
              비밀번호 변경
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

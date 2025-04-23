import React, { useState } from 'react';
import EmailInputBox from '../components/EmailInputBox';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import IdFoundModal from '../components/IdFoundModal';
import LoginModal from '../components/LoginModal';
import { useNavigate } from 'react-router-dom';

const FindId = ({ onLoginModalOpen }) => {
  const [emailInput, setEmailInput] = useState('');
  const [verificationCodeInput, setVerificationCodeInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foundUserId, setFoundUserId] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = (email) => {
    console.log('이메일 인증:', email);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleVerificationSubmit = () => {
    console.log('인증번호 확인:', verificationCodeInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기서 실제로 요청을 보내 아이디를 찾아야 합니다.
    // 임시로 테스트용 아이디를 설정합니다.
    setFoundUserId('test@gmail.com');
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleLoginClick = () => {
    handleModalClose();
    setIsLoginModalOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-8">아이디 찾기</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <h3 className="mb-2">이메일</h3>
          <EmailInputBox
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Placeholder"
            buttonText="인증"
            onButtonClick={handleEmailSubmit}
          />
        </div>

        <div>
          <h3 className="mb-2">인증번호</h3>
          <InputBox
            name="verificationCode"
            value={verificationCodeInput}
            onChange={(e) => setVerificationCodeInput(e.target.value)}
            placeholder="Placeholder"
            buttonText="확인"
            buttonVariant="gray"
            onButtonClick={handleVerificationSubmit}
          />
        </div>

        <Button
          size="full"
          variant="orange"
          value="아이디 찾기"
          onClick={handleSubmit}
          height="40px"
        />
      </form>

      <IdFoundModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        userId={foundUserId}
        onLoginClick={handleLoginClick}
      />

      {/* 로그인 모달 */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={handleLoginModalClose} 
      />
    </div>
  );
};

export default FindId; 
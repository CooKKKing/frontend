import React, { useState } from 'react';
import EmailInputBox from '../components/EmailInputBox';
import InputBox from '../components/InputBox';
import Button from '../components/Button';

const FindId = () => {
  const [emailInput, setEmailInput] = useState('');
  const [verificationCodeInput, setVerificationCodeInput] = useState('');

  const handleEmailSubmit = (email) => {
    console.log('이메일 인증:', email);
  };

  const handleVerificationSubmit = () => {
    console.log('인증번호 확인:', verificationCodeInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('아이디 찾기 제출');
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
    </div>
  );
};

export default FindId; 
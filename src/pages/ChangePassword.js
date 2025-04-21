import React, { useState } from 'react';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import EmailInputBox from '../components/EmailInputBox';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    console.log('비밀번호 변경 제출');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-8">비밀번호 변경</h2>
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
        
        <div>
          <h3 className="mb-2">기존 비밀번호</h3>
          <InputBox
            name="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="기존 비밀번호를 입력해주세요"
            showEye={true}
            isSecret={!showCurrentPassword}
            onEyeClick={() => setShowCurrentPassword(!showCurrentPassword)}
            showButton={false}
          />
        </div>

        <div>
          <h3 className="mb-2">새 비밀번호</h3>
          <InputBox
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새 비밀번호를 입력해주세요"
            showEye={true}
            isSecret={!showNewPassword}
            onEyeClick={() => setShowNewPassword(!showNewPassword)}
            showButton={false}
          />
        </div>

        <div>
          <h3 className="mb-2">새 비밀번호 확인</h3>
          <InputBox
            name="confirmNewPassword"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="새 비밀번호를 다시 입력해주세요"
            showEye={true}
            isSecret={!showConfirmPassword}
            onEyeClick={() => setShowConfirmPassword(!showConfirmPassword)}
            showButton={false}
          />
        </div>

        <Button
          size="full"
          variant="orange"
          value="비밀번호 변경"
          onClick={handleSubmit}
          height="48px"
          disabled={!currentPassword || !newPassword || !confirmNewPassword}
        />
      </form>
    </div>
  );
};

export default ChangePassword; 
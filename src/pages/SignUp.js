import React, { useState } from 'react';
import EmailInputBox from '../components/EmailInputBox';
import InputBox from '../components/InputBox';
import Button from '../components/Button';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });
  const [idInput, setIdInput] = useState('');   
  const [nicknameInput, setNicknameInput] = useState('');
  const [pwInput, setPwInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [verificationCodeInput, setVerificationCodeInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');


  const handleEmailSubmit = (email) => {
    setFormData(prev => ({ ...prev, email }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 회원가입 로직 구현
    console.log('회원가입 데이터:', formData);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-8">회원가입</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <h3 className="mb-2">아이디</h3>
          <InputBox
            name="userId"
            value={idInput}
            onChange={e => setIdInput(e.target.value)}
            placeholder="Placeholder"
            buttonText="중복 확인"
            onButtonClick={() => {}}
            buttonVariant="orange"
          />
        </div>

        <div>
          <h3 className="mb-2">닉네임</h3>
          <InputBox
            name="nickname"
            value={nicknameInput}
            onChange={e => setNicknameInput(e.target.value)}
            placeholder="Placeholder"
            buttonText="중복 확인"
            onButtonClick={() => {}}
            buttonVariant="orange"
          />
        </div>

        <div>
          <h3 className="mb-2">이메일</h3>
          <EmailInputBox
            value={emailInput}
            onChange={e => setEmailInput(e.target.value)}
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
            onChange={e => setVerificationCodeInput(e.target.value)}
            placeholder="Placeholder"
            buttonText="확인"
            onButtonClick={() => {}}
            buttonVariant="orange"
          />
        </div>

        <div>
          <h3 className="mb-2">핸드폰번호</h3>
          <InputBox
            name="phone"
            value={phoneInput}
            onChange={e => setPhoneInput(e.target.value)}
            placeholder="Placeholder"
            showButton={false}
          />
        </div>

        <div>
          <h3 className="mb-2">비밀번호</h3>
          <InputBox
            name="password"
            type="password"
            value={pwInput}
            onChange={e => setPwInput(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
            showEye={true}
            isSecret={!showPassword}
            onEyeClick={() => setShowPassword(!showPassword)}
            showButton={false}
          />
        </div>

        <div>
          <h3 className="mb-2">비밀번호 확인</h3>
          <InputBox
            name="confirmPassword"
            type="password"
            value={confirmPasswordInput}
            onChange={e => setConfirmPasswordInput(e.target.value)}
            placeholder="비밀번호를 다시 입력해주세요"
            showEye={true}
            isSecret={!showConfirmPassword}
            onEyeClick={() => setShowConfirmPassword(!showConfirmPassword)}
            showButton={false}
          />
        </div>

        <Button
          size="full"
          variant="orange"
          value="회원가입"
          height="40px"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default SignUp;

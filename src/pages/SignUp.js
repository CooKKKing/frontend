import React, { useState } from 'react';
import EmailInputBox from '../components/EmailInputBox';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import instance from '../api/axiosInstance';
import RadioButton from '../components/RadioButton';

const EMAIL_DOMAINS = [
  "선택",
  "gmail.com",
  "naver.com",
  "hanmail.net",
  "nate.com",
  "kakao.com",
];

const emailLocalRegex = /^[a-zA-Z0-9._-]+$/;
const isValidPassword = (password) =>
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[%,\$,#,@,!].*[%,\$,#,@,!])[A-Za-z\d%,\$,#,@,!]{8,20}$/.test(password);
const isValidNickname = (name) => name.length >= 2 && name.length <= 8;
const isValidPhone = (phone) => {
  if (!phone) return false;
  const onlyDigits = phone.replace(/\D/g, '');
  return /^010\d{7,8}$/.test(onlyDigits);
};
const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  const cleaned = phoneNumber.replace(/\D/g, '');
  const limited = cleaned.slice(0, 11);
  if (limited.length < 4) return limited;
  if (limited.length < 8) return limited.slice(0, 3) + '-' + limited.slice(3);
  return limited.slice(0, 3) + '-' + limited.slice(3, 7) + '-' + limited.slice(7, 11);
};

// 중복 검증 함수
const checkDuplicate = async (type, value, extra) => {
  try {
    let url, requestData;
    if (type === "id") {
      url = '/members/id';
      requestData = { loginId: value };
    } else if (type === "name") {
      url = '/members/name';
      requestData = { nickName: value };
    } else if (type === "email") {
      url = '/auth/email/verify';
      requestData = { email: value };
    } else if (type === "code") {
      url = '/auth/email/confirm';
      requestData = { email: extra, code: value };
    } else if (type === "phoneNumber") {
      url = '/members/phone';
      requestData = { phoneNumber: value }
    } else {
      url = `/members/${type}`;
      requestData = { [type]: value };
    }
    await instance.post(url, requestData);
    return false;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      return true;
    }
    if (error.response && error.response.status === 400) {
      throw new Error('Invalid input data.');
    }
    throw new Error('Network errors occurred. Please try again later.');
  }
};

// 이메일 인증번호 전송 API
const sendVerificationCode = async (email) => {
  await instance.post('/auth/email/verify', { email });
};

const SignUp = () => {
  // 기본 회원가입 필드
  const [idInput, setIdInput] = useState('');
  const [nickNameInput, setNickNameInput] = useState('');
  const [pwInput, setPwInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationCodeInput, setVerificationCodeInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({}); // *수정* 성공 메시지는 별도 success로 관리
  const [profileImage, setProfileImage] = useState(1);
  const navigate = useNavigate();

  // 이메일 입력 상태
  const [emailInput, setEmailInput] = useState({
    local: '',
    domain: EMAIL_DOMAINS[0],
    dropdownOpen: false,
  });

  // 인증번호 관련 상태
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [verificationDisabled, setVerificationDisabled] = useState(true);

  // 이메일 전체값
  const fullEmail =
    emailInput.local &&
    emailInput.domain &&
    emailInput.domain !== EMAIL_DOMAINS[0]
      ? `${emailInput.local}@${emailInput.domain}`
      : '';

  // 아이디 중복 검증
  const handleCheckId = async (e) => {
    e.preventDefault && e.preventDefault();
    if (!idInput) {
      setErrors((prev) => ({ ...prev, loginId: "아이디를 입력해주세요." }));
      setSuccess((prev) => ({ ...prev, loginId: "" })); // *수정*
      return;
    }
    try {
      const isDuplicate = await checkDuplicate("id", idInput);
      if (isDuplicate) {
        setErrors((prev) => ({ ...prev, loginId: "이미 사용중인 아이디입니다." }));
        setSuccess((prev) => ({ ...prev, loginId: "" }));
      } else {
        setErrors((prev) => ({ ...prev, loginId: "" }));
        setSuccess((prev) => ({ ...prev, loginId: "사용 가능한 아이디입니다." }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, loginId: error.message }));
      setSuccess((prev) => ({ ...prev, loginId: "" }));
    }
  };

  // 닉네임 중복 검증
  const handleCheckNickName = async (e) => {
    e.preventDefault && e.preventDefault();
    if (!nickNameInput) {
      setErrors((prev) => ({ ...prev, nickName: "닉네임을 입력해주세요." }));
      setSuccess((prev) => ({ ...prev, nickName: "" }));
      return;
    }
    try {
      const isDuplicate = await checkDuplicate("name", nickNameInput);
      if (isDuplicate) {
        setErrors((prev) => ({ ...prev, nickName: "이미 존재하는 닉네임입니다." }));
        setSuccess((prev) => ({ ...prev, nickName: "" }));
      } else {
        setErrors((prev) => ({ ...prev, nickName: "" }));
        setSuccess((prev) => ({ ...prev, nickName: "사용 가능한 닉네임입니다." }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, nickName: error.message }));
      setSuccess((prev) => ({ ...prev, nickName: "" }));
    }
  };

  // Email Input(사용자자)
  const handleEmailLocalChange = (e) => {
    const val = e.target.value;
    setEmailInput((prev) => ({
      ...prev,
      local: val,
    }));
    if (val === '' || emailLocalRegex.test(val)) {
      setErrors((prev) => ({ ...prev, email: "" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "올바른 이메일의 형식으로 입력해주세요." }));
    }
    setSuccess((prev) => ({ ...prev, email: "" }));
    setIsVerificationSent(false);
    setTimerActive(false);
  };

  const handleDomainSelect = (d) => {
    setEmailInput((prev) => ({
      ...prev,
      domain: d,
      dropdownOpen: false,
    }));
    setErrors((prev) => ({ ...prev, email: "" }));
    setSuccess((prev) => ({ ...prev, email: "" }));
  };

  const handleDropdownToggle = () => {
    setEmailInput((prev) => ({
      ...prev,
      dropdownOpen: !prev.dropdownOpen,
    }));
  };

  // 이메일 중복검사
  const handleCheckEmail = async () => {
    if (!fullEmail) {
      setErrors((prev) => ({ ...prev, email: "이메일을 모두 입력해주세요." }));
      setSuccess((prev) => ({ ...prev, email: "" }));
      return false;
    }
    if (!emailLocalRegex.test(emailInput.local)) {
      setErrors((prev) => ({ ...prev, email: "올바른 이메일의 형식으로 입력해주세요." }));
      setSuccess((prev) => ({ ...prev, email: "" }));
      return false;
    }
    try {
      const isDuplicate = await checkDuplicate("email", fullEmail);
      if (isDuplicate) {
        setErrors((prev) => ({ ...prev, email: "이미 사용중인 이메일입니다." }));
        setSuccess((prev) => ({ ...prev, email: "" }));
        return false;
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
        setSuccess((prev) => ({ ...prev, email: "사용 가능한 이메일입니다." }));
        return true;
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, email: error.message }));
      setSuccess((prev) => ({ ...prev, email: "" }));
      return false;
    }
  };

  // 인증번호 전송/재전송 버튼 클릭
  const handleSendVerification = async () => {
    const canSend = await handleCheckEmail();
    if (!canSend) return;
    try {
      await sendVerificationCode(fullEmail);
      setIsVerificationSent(true);
      setVerificationDisabled(false);
      setTimerActive(false);
      setTimeout(() => setTimerActive(true), 0);
      setErrors((prev) => ({ ...prev, verificationCode: "" }));
      setSuccess((prev) => ({ ...prev, verificationCode: "" }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, email: "인증번호 전송에 실패했습니다." }));
      setSuccess((prev) => ({ ...prev, email: "" }));
    }
  };

  // 인증번호 && 이메일 검증
  const handleCheckVerificationCode = async (e) => {
    e.preventDefault && e.preventDefault();
    if (!verificationCodeInput || !fullEmail) {
      setErrors((prev) => ({ ...prev, verificationCode: '이메일과 인증번호를 모두 입력해주세요.' }));
      setSuccess((prev) => ({ ...prev, verificationCode: "" }));
      return;
    }
    try {
      await checkDuplicate("code", verificationCodeInput, fullEmail);
      setErrors((prev) => ({ ...prev, verificationCode: "" }));
      setSuccess((prev) => ({ ...prev, verificationCode: "인증되었습니다." }));
      setVerificationDisabled(true);
    } catch (error) {
      setErrors((prev) => ({ ...prev, verificationCode: "인증번호가 일치하지 않습니다." }));
      setSuccess((prev) => ({ ...prev, verificationCode: "" }));
    }
  };

  // 타이머 종료 시 인증번호 입력/확인 버튼 비활성화
  const handleTimerEnd = () => {
    setVerificationDisabled(true);
  };

  // 인증번호 입력 변경
  const handleVerificationInputChange = (e) => {
    setVerificationCodeInput(e.target.value);
    setErrors((prev) => ({ ...prev, verificationCode: "" }));
    setSuccess((prev) => ({ ...prev, verificationCode: "" }));
  };

  // 전화번호 입력
  const handlePhoneInputChange = (e) => {
    const input = e.target.value;
    const formatted = formatPhoneNumber(input);
    if (formatted.length > 13) return;
    setPhoneInput(formatted);
    setErrors((prev) => ({ ...prev, phone: "" }));
    setSuccess((prev) => ({ ...prev, phone: "" }));
  };

  // 전화번호 형식 체크
  const handlePhoneCheck = () => {
    if (!isValidPhone(phoneInput)) {
      setErrors((prev) => ({ ...prev, phone: "전화번호 형식이 올바르지 않습니다." }));
      setSuccess((prev) => ({ ...prev, phone: "" }));
      return;
    }
    setErrors((prev) => ({ ...prev, phone: "" }));
    setSuccess((prev) => ({ ...prev, phone: "사용 가능한 번호입니다." }));
  };

  // 비밀번호 입력
  const handlePasswordChange = (text) => {
    setPwInput(text);
    if (!isValidPassword(text)) {
      setErrors((prev) => ({
        ...prev,
        password: "비밀번호는 8~20자, 영문, 숫자, 특수문자 2개 이상 포함해야 합니다.",
      }));
      setSuccess((prev) => ({ ...prev, password: "" }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
      setSuccess((prev) => ({ ...prev, password: "사용 가능한 비밀번호입니다." }));
    }
  };

  const handleCheckConfirmPassword = () => {
    if (pwInput !== confirmPasswordInput) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: '비밀번호가 일치하지 않습니다.'
      }));
      setSuccess((prev) => ({ ...prev, confirmPassword: "" }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      setSuccess((prev) => ({ ...prev, confirmPassword: "비밀번호가 일치합니다." }));
    }
  };

  // 회원가입 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수 입력값 확인
    if (
      !idInput ||
      !nickNameInput ||
      !pwInput ||
      !confirmPasswordInput ||
      !fullEmail ||
      !verificationCodeInput ||
      !phoneInput ||
      !profileImage
    ) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    // 실제 에러만 체크 (성공 메시지는 무시)
    const hasError = Object.values(errors).some((v) => v && v !== "");
    if (hasError) {
      alert("입력한 항목을 다시 확인해주세요.");
      return;
    }

    // 인증 성공 여부도 체크 (예: 이메일 인증 성공 메시지)
    if (success.verificationCode !== "인증되었습니다.") {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    const signupData = {
      loginId: idInput,
      nickName: nickNameInput,
      password: pwInput,
      email: fullEmail,
      phoneNumber: phoneInput,
      profileImageId: profileImage,
    };

    try {
      console.log("MemberInfo===", signupData)
      await instance.post('/members', signupData);
      alert("회원가입이 완료되었습니다. 로그인해주세요.");
      navigate("/");
    } catch (error) {
      console.log("error : " , error)
      alert("회원가입 실패! 다시 시도해주세요.");
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-8">회원가입</h2>
        <div className="mt-8">
          {/* 프로필 사진 선택 */}
          <div>
            <h3 className="mb-2">프로필 사진 선택</h3>
            <div className="flex gap-4">
              <RadioButton
                id="m_default"
                name="profile"
                value="m_default"
                checked={profileImage === 1}
                onChange={() => setProfileImage(1)}
                label={
                  <img src="assets/images/profile/m_default.png" alt="man" className="w-28 h-28" />
                }
              />
              <RadioButton
                id="w_default"
                name="profile"
                value="w_default"
                checked={profileImage === 2}
                onChange={() => setProfileImage(2)}
                label={
                  <img src="assets/images/profile/w_default.png" alt="woman" className="w-28 h-28" />
                }
              />
            </div>
          </div>

          {/* 아이디 */}
          <div>
            <h3 className="mb-2">아이디</h3>
            <InputBox
              name="loginId"
              value={idInput}
              onChange={(e) => setIdInput(e.target.value)}
              placeholder="아이디를 입력하세요"
              buttonText="중복 확인"
              onButtonClick={handleCheckId}
              buttonVariant="orange"
              description={errors.loginId || success.loginId} // *수정* 성공 메시지도 보여주기
              buttonType="button"
            />
          </div>

          {/* 닉네임 */}
          <div>
            <h3 className="mb-2">닉네임</h3>
            <InputBox
              name="nickName"
              value={nickNameInput}
              onChange={(e) => setNickNameInput(e.target.value)}
              placeholder="닉네임을 입력하세요"
              buttonText="중복 확인"
              onButtonClick={handleCheckNickName}
              buttonVariant="orange"
              description={errors.nickName || success.nickName} // *수정*
              buttonType="button"
            />
          </div>

          {/* 이메일 */}
          <div>
            <h3 className="mb-2">이메일</h3>
            <EmailInputBox
              label={null}
              type="button"
              local={emailInput.local}
              setLocal={(val) => setEmailInput((prev) => ({ ...prev, local: val }))}
              domain={emailInput.domain}
              setDomain={(val) => setEmailInput((prev) => ({ ...prev, domain: val }))}
              dropdownOpen={emailInput.dropdownOpen}
              setDropdownOpen={(val) => setEmailInput((prev) => ({ ...prev, dropdownOpen: val }))}
              error={errors.email || success.email} // *수정*
              domainList={EMAIL_DOMAINS.slice(1)}
              buttonText={isVerificationSent ? "재전송" : "인증번호 전송"}
              buttonVariant="orange"
              onButtonClick={handleSendVerification}
              disabled={false}
              handleDropdownToggle={handleDropdownToggle}
              handleDomainSelect={handleDomainSelect}
              handleLocalChange={handleEmailLocalChange}
            />
          </div>

          {/* 인증번호 */}
          <div>
            <h3 className="mb-2">인증번호</h3>
            <InputBox
              name="code"
              value={verificationCodeInput}
              onChange={handleVerificationInputChange}
              placeholder="인증번호를 입력하세요"
              buttonText="확인"
              onButtonClick={handleCheckVerificationCode}
              buttonVariant="orange"
              showTimer={isVerificationSent}
              timerSeconds={180}
              timerActive={timerActive}
              onTimerEnd={handleTimerEnd}
              disabled={verificationDisabled}
              showButton={!verificationDisabled}
              description={errors.verificationCode || success.verificationCode} // *수정*
              buttonType="button"
            />
          </div>

          {/* 핸드폰번호 */}
          <div>
            <h3 className="mb-2">핸드폰번호</h3>
            <InputBox
              name="phone"
              value={phoneInput}
              onChange={handlePhoneInputChange}
              placeholder="핸드폰번호를 입력하세요"
              onButtonClick={handlePhoneCheck}
              description={errors.phone || success.phone} // *수정*
              buttonType="button"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <h3 className="mb-2">비밀번호</h3>
            <InputBox
              name="password"
              value={pwInput}
              onChange={e => handlePasswordChange(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
              showEye={true}
              isSecret={!showPassword}
              onEyeClick={() => setShowPassword(!showPassword)}
              description={errors.password || success.password} // *수정*
              showButton={false}
            />
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <h3 className="mb-2">비밀번호 확인</h3>
            <InputBox
              name="confirmPassword"
              type="password"
              value={confirmPasswordInput}
              onChange={(e) => setConfirmPasswordInput(e.target.value)}
              showEye={true}
              isSecret={!showConfirmPassword}
              onEyeClick={() => setShowConfirmPassword(!showConfirmPassword)}
              showButton={true}
              onButtonClick={handleCheckConfirmPassword}
              description={errors.confirmPassword || success.confirmPassword} // *수정*
              buttonType="button"
            />
          </div>

          <Button
            type="submit"
            size="full"
            variant="orange"
            value="회원가입"
            height="50px"
          />
        </div>
      </form>
    </div>
  );
};

export default SignUp;

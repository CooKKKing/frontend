import React, { useState } from 'react';
import EmailInputBox from '../components/EmailInputBox';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import instance from '../api/axiosInstance';
import RadioButton from '../components/RadioButton';
import ToastMessage from '../components/ToastMessage';
import LoginModal from '../components/LoginModal';

const EMAIL_DOMAINS = [
  "선택",
  "gmail.com",
  "naver.com",
  "hanmail.net",
  "nate.com",
  "kakao.com",
];

// 이메일 앞부분: 영문/숫자만 허용
const emailLocalRegex = /^[a-zA-Z0-9]+$/;

// 핸드폰번호 유효성
const isValidPhone = (phone) => {
  if (!phone) return false;
  const onlyDigits = phone.replace(/\D/g, '');
  return /^010\d{7,8}$/.test(onlyDigits);
};

// 핸드폰번호 자동 하이픈
const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  const cleaned = phoneNumber.replace(/\D/g, '');
  const limited = cleaned.slice(0, 11);
  if (limited.length < 4) return limited;
  if (limited.length < 8) return limited.slice(0, 3) + '-' + limited.slice(3);
  return limited.slice(0, 3) + '-' + limited.slice(3, 7) + '-' + limited.slice(7, 11);
};

// 1. 아이디 20글자 이하 + 닉네임과 동일한 validation
const isValidId = (id) => {
  if (typeof id !== "string" || id.length === 0 || id.length > 20) return false;
  if (/[^a-zA-Z0-9가-힣_ ]/.test(id)) return false; // 특수문자 불가 (영문, 숫자, 한글, 밑줄, 공백만 허용)
  if (/ {2,}/.test(id)) return false; // 공백 2번 불가
  if (/^\s|\s$/.test(id)) return false; // 시작/끝 공백 불가
  if (/^\s+$/.test(id)) return false; // 전체 공백 불가
  return true;
};

// 2. 닉네임
const isValidNickname = (name) => {
  if (!name) return false;
  if (name.length < 2 || name.length > 8) return false;
  if (/[^a-zA-Z0-9가-힣_ ]/.test(name)) return false; // 특수문자 불가
  if (/ {2,}/.test(name)) return false; // 공백 2번 불가
  if (/^\s|\s$/.test(name)) return false; // 시작/끝 공백 불가
  if (/^\s+$/.test(name)) return false; // 전체 공백 불가
  return true;
};

// 3. 비밀번호
const passwordSpecialChar = /[%,\$,#,@,!]/;
const passwordAlpha = /[a-zA-Z]/g;
const passwordDigit = /\d/g;

const isValidPassword = (pw) => {
  if (!pw || typeof pw !== "string") return false;
  if (pw.length < 8 || pw.length > 20) return false;
  if (/^\d+$/.test(pw)) return false; // 번호만 불가
  const alphaMatch = pw.match(passwordAlpha) || [];
  if (alphaMatch.length < 6) return false; // 영문 6자 이상
  if (!passwordDigit.test(pw)) return false; // 숫자 1개 이상
  if (!passwordSpecialChar.test(pw)) return false; // 특수문자 1개 이상
  return true;
};

// 중복 검증 함수
const checkDuplicate = async (type, value, extra) => {
  try {
    let url, requestData;
    if (type === "id") {
      url = '/members/id';
      requestData = { loginId: value };
    } else if (type === "nickName") {
      url = '/members/name';
      requestData = { nickName: value };
    } else if (type === "email") {
      url = '/auth/email/verify/register';
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
  await instance.post('/auth/email/verify/register', { email });
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
  // const [activeStep, setActiveStep] = useState("nickname"); // *수정* 입력 단계 관리
  const [toast, setToast] = useState({ open: false, message: '', type: 'success' });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
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
    e.preventDefault();
    if (!idInput) {
      setErrors((prev) => ({ ...prev, loginId: "아이디를 입력해주세요." }));
      setSuccess((prev) => ({ ...prev, loginId: "" }));
      return;
    }
    if (!isValidId(idInput)) {
      setErrors((prev) => ({ ...prev, loginId: "아이디는 20자 이하, 특수문자 불가, 공백 2번 불가, 시작/끝 공백 불가입니다." }));
      setSuccess((prev) => ({ ...prev, loginId: "" }));
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
        // setActiveStep("email"); // *수정* 아이디 성공 시 이메일 활성화
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, loginId: error.message }));
      setSuccess((prev) => ({ ...prev, loginId: "" }));
    }
  };

  // 닉네임 중복 검증
  const handleCheckNickName = async (e) => {
    e.preventDefault();

    if (!nickNameInput) {
      setErrors((prev) => ({ ...prev, nickName: "닉네임을 입력해주세요." }));
      setSuccess((prev) => ({ ...prev, nickName: "" }));
      return;
    }
    console.log("닉네임 확인 :::::", nickNameInput);
    if (!isValidNickname(nickNameInput)) {
      setErrors((prev) => ({ ...prev, nickName: "닉네임은 2~8자, 특수문자 불가, 공백 2번 불가, 시작/끝 공백 불가입니다." }));
      setSuccess((prev) => ({ ...prev, nickName: "" }));
      return;
    }
    try {
      const isDuplicate = await checkDuplicate("nickName", nickNameInput);
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

  // Email Input(사용자)
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
    setErrors((prev) => ({ ...prev, email: "" }));
    setSuccess((prev) => ({ ...prev, email: "" }));
    return true;
  };

  const handleSendVerification = async (e) => {
    await sendVerificationCode(fullEmail);
    setIsVerificationSent(true);
    setVerificationDisabled(false);
    setTimerActive(false); // 기존 타이머를 먼저 종료
    setTimerKey(prev => prev + 1); // key를 변경해 컴포넌트 리렌더링(타이머 완전 초기화)
    setTimeout(() => setTimerActive(true), 0); // 다음 tick에 타이머 시작
    setVerificationCodeInput(''); // 인증번호 입력값 초기화
    setErrors((prev) => ({ ...prev, verificationCode: "" }));
    setSuccess((prev) => ({ ...prev, verificationCode: "" }));
  };

  

  // 인증번호 && 이메일 검증
  const handleCheckVerificationCode = async (e) => {
    e.preventDefault();
    if (!verificationCodeInput || !fullEmail) {
      setErrors((prev) => ({ ...prev, verificationCode: '인증번호를 모두 입력해주세요.' }));
      setSuccess((prev) => ({ ...prev, verificationCode: "" }));
      return;
    }
    try {
      await checkDuplicate("code", verificationCodeInput, fullEmail);
      setErrors((prev) => ({ ...prev, verificationCode: "" }));
      setSuccess((prev) => ({ ...prev, verificationCode: "인증되었습니다." }));
      setVerificationDisabled(true);
      setTimerActive(false);
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
    // setActiveStep("submit"); // *수정* 전화번호 성공 시 회원가입 버튼 활성화
  };

  // 비밀번호 입력
  const handlePasswordChange = (text) => {
    setPwInput(text);
    if (!isValidPassword(text)) {
      setErrors((prev) => ({
        ...prev,
        password: "비밀번호는 8~20자, 영문 6자 이상, 숫자 1개 이상, 특수문자 1개 이상 포함해야 합니다.",
      }));
      setSuccess((prev) => ({ ...prev, password: "" }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
      setSuccess((prev) => ({ ...prev, password: "사용 가능한 비밀번호입니다." }));
      // setActiveStep("confirmPassword"); // *수정* 비밀번호 성공 시 비밀번호 확인 활성화
    }
  };

  // 비밀번호 확인
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
      // setActiveStep("phone"); // *수정* 비밀번호 확인 성공 시 전화번호 활성화
    }
  };
    // Toast 닫기 핸들러
    const handleToastClose = () => {
      setToast({ ...toast, open: false });
    };
  
    // LoginModal 닫기 핸들러
    const handleLoginModalClose = () => {
      setShowLoginModal(false);
      navigate("/");
    };

  // 회원가입 제출  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("회원가입 handleSubmit 실행");
  
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
      setToast({ open: true, message: "모든 항목을 입력해주세요.", type: "error" });
      return;
    }
  
    const hasError = Object.values(errors).some((v) => v && v !== "");
    if (hasError) {
      setToast({ open: true, message: "입력한 항목을 다시 확인해주세요.", type: "error" });
      return;
    }
  
    if (success.verificationCode !== "인증되었습니다.") {
      setToast({ open: true, message: "이메일 인증을 완료해주세요.", type: "error" });
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
      console.log("signUpData === ", signupData);
      await instance.post('/members', signupData);
      setToast({ open: true, message: "회원가입이 완료되었습니다!", type: "success" });
      setShowLoginModal(true);
    } catch (error) {
      setToast({ open: true, message: "회원가입 실패! 다시 시도해주세요.", type: "error" });
    }
    console.log("DataList",signupData);
  };

  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-8">회원가입</h2>
        <div className="mt-8 space-y-6">
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
              description={errors.nickName || success.nickName}
              buttonType="button"
            />
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
              description={errors.loginId || success.loginId}
              buttonType="button"
            />
          </div>
  
          {/* 이메일 */}
          <div>
            <h3 className="mb-2">이메일</h3>
            <EmailInputBox
              label={null}
              local={emailInput.local}
              setLocal={(val) => setEmailInput((prev) => ({ ...prev, local: val }))}
              domain={emailInput.domain}
              setDomain={(val) => setEmailInput((prev) => ({ ...prev, domain: val }))}
              dropdownOpen={emailInput.dropdownOpen}
              setDropdownOpen={(val) => setEmailInput((prev) => ({ ...prev, dropdownOpen: val }))}
              error={errors.email || success.email}
              domainList={EMAIL_DOMAINS.slice(1)}
              buttonText={isVerificationSent ? "재전송" : "인증번호 전송"}
              buttonVariant="orange"
              onButtonClick={handleSendVerification}
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
              buttonDisabled={verificationDisabled}
              showButton={!verificationDisabled}
              description={errors.verificationCode || success.verificationCode}
              buttonType="button"
              key={timerKey}
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
              description={errors.password || success.password}
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
              placeholder='비밀번호를 재입력 해주세요.'
              showEye={true}
              isSecret={!showConfirmPassword}
              onEyeClick={() => setShowConfirmPassword(!showConfirmPassword)}
              showButton={true}
              onButtonClick={handleCheckConfirmPassword}
              description={errors.confirmPassword || success.confirmPassword}
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
              description={errors.phone || success.phone}
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
      {/* 토스트 메시지 */}
      {toast.open && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10000]">
          <ToastMessage
            message={toast.message}
            type={toast.type}
            onClose={handleToastClose}
          />
        </div>
      )}
      {/* 로그인 모달 */}
      {showLoginModal && (
        <LoginModal isOpen={showLoginModal} onClose={handleLoginModalClose} />
      )}
    </>
  );  
};

export default SignUp;

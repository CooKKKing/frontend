import React, { useState } from 'react';
import EmailInputBox from '../components/EmailInputBox';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import instance from '../api/axiosInstance';
import ToastMessage from '../components/ToastMessage';
import BasicModal from '../components/BasicModal';
import PageTitle from '../components/PageTitle';

const EMAIL_DOMAINS = [
  "선택",
  "gmail.com",
  "naver.com",
  "hanmail.net",
  "nate.com",
  "kakao.com",
];

// 아이디 Validation
const isValidId = (id) => {
  if (typeof id !== "string" || id.length === 0 || id.length > 20) return false;
  if (/[^a-zA-Z0-9가-힣_ ]/.test(id)) return false;
  if (/ {2,}/.test(id)) return false;
  if (/^\s|\s$/.test(id)) return false;
  if (/^\s+$/.test(id)) return false;
  return true;
};

// 이메일 앞부분: 영문/숫자만 허용
const emailLocalRegex = /^[a-zA-Z0-9]+$/;

// 비밀번호 Validation
const passwordSpecialChar = /[%,\$,#,@,!]/;
const passwordAlpha = /[a-zA-Z]/g;
const passwordDigit = /\d/g;
const isValidPassword = (pw) => {
  if (!pw || typeof pw !== "string") return false;
  if (pw.length < 8 || pw.length > 20) return false;
  if (/^\d+$/.test(pw)) return false;
  const alphaMatch = pw.match(passwordAlpha) || [];
  if (alphaMatch.length < 6) return false;
  if (!passwordDigit.test(pw)) return false;
  if (!passwordSpecialChar.test(pw)) return false;
  return true;
};

// 이메일 인증번호 전송 API
const sendVerificationCode = async (email) => {
  await instance.post('/auth/email/verify', { email });
};

// 인증번호 확인 API
const checkVerificationCode = async (email, code) => {
  await instance.post('/auth/email/confirm', { email, code });
};

const ChangePassword = () => {
  const [idInput, setIdInput] = useState('');
  const [pwInput, setPwInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationCodeInput, setVerificationCodeInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const [timerKey, setTimerKey] = useState(0);
  const [toast, setToast] = useState({ open: false, message: '', type: 'success' });
  const [showBasicModal, setShowBasicModal] = useState(false);
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

  // 아이디 Validation만 (중복검증 X)
  const handleCheckId = (id) => {
    if (!isValidId(id)) {
      setErrors((prev) => ({ ...prev, loginId: "아이디는 20자 이하, 특수문자 불가, 공백 2번 불가, 시작/끝 공백 불가입니다." }));
      setSuccess((prev) => ({ ...prev, loginId: "" }));
      return;
    }
    setErrors((prev) => ({ ...prev, loginId: "" }));
    setSuccess((prev) => ({ ...prev, loginId: "아이디가 확인되었습니다." }));
  };

  // 이메일 입력 핸들러
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

  // 인증번호 전송
  const handleSendVerification = async (e) => {
    e.preventDefault();
    console.log(fullEmail);

    if (!isValidId(idInput)) {
      setErrors((prev) => ({ ...prev, loginId: "아이디는 20자 이하, 특수문자 불가, 공백 2번 불가, 시작/끝 공백 불가입니다." }));
      return;
    }
    if (!emailInput.local || !emailInput.domain || emailInput.domain === EMAIL_DOMAINS[0]) {
      setErrors((prev) => ({ ...prev, email: "이메일을 모두 입력해주세요." }));
      return;
    }
    if (!emailLocalRegex.test(emailInput.local)) {
      setErrors((prev) => ({ ...prev, email: "올바른 이메일의 형식으로 입력해주세요." }));
      return;
    }
    if (!fullEmail) {
      setErrors((prev) => ({ ...prev, email: "이메일을 모두 입력해주세요." }));
      return;
    }

    // 인증번호 전송
    try {
      console.log("Email확인", fullEmail);
      await sendVerificationCode(fullEmail);
      setIsVerificationSent(true);
      setVerificationDisabled(false);
      setTimerActive(false);
      setTimerKey(prev => prev + 1);
      setTimeout(() => setTimerActive(true), 0);
      setErrors((prev) => ({ ...prev, verificationCode: "" }));
      setSuccess((prev) => ({ ...prev, verificationCode: "" }));
    } catch (error) {
      setErrors({
        email: error?.response?.data?.message || "인증번호 전송에 실패했습니다."
      });
    }
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
      await checkVerificationCode(fullEmail, verificationCodeInput);
      setErrors((prev) => ({ ...prev, verificationCode: "" }));
      setSuccess((prev) => ({ ...prev, verificationCode: "인증되었습니다." }));
      setVerificationDisabled(true);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        verificationCode: error?.response?.data?.message || "인증번호가 일치하지 않습니다."
      }));
      setSuccess((prev) => ({ ...prev, verificationCode: "" }));
    }
  };

  const handleTimerEnd = () => {
    setVerificationDisabled(true);
  };

  const handleVerificationInputChange = (e) => {
    setVerificationCodeInput(e.target.value);
    setErrors((prev) => ({ ...prev, verificationCode: "" }));
    setSuccess((prev) => ({ ...prev, verificationCode: "" }));
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
    }
  };

  // Toast 닫기 핸들러
  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  // 모달 닫기 핸들러
  const handleLoginModalClose = () => {
    setShowBasicModal(false);
    navigate("/");
  };

  // 비밀번호 변경 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !idInput ||
      !pwInput ||
      !confirmPasswordInput ||
      !fullEmail ||
      !verificationCodeInput
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

    const passwordInfo = {
      loginId: idInput,          // 반드시 loginId (API 명세에 맞춤)
      email: fullEmail,
      newPassword: pwInput,      // 반드시 newPassword (API 명세에 맞춤)
    };

    try {
      await instance.patch('/members/password', passwordInfo);
      setToast({ open: true, message: "비밀번호 변경이 완료되었습니다." });
      setShowBasicModal(true);
    } catch (error) {
      setToast({
        open: true,
        message: error?.response?.data?.message || "비밀번호 변경 실패! 다시 입력해주세요.",
        type: "error"
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <PageTitle title="비밀번호 변경" />
        <div className="mt-8 space-y-6">
          {/* 아이디 */}
          <div>
            <h3 className="mb-2">아이디</h3>
            <InputBox
              name="loginId"
              value={idInput}
              onChange={(e) => setIdInput(e.target.value)}
              placeholder="아이디를 입력하세요"
              buttonText="확인"
              onButtonClick={() => handleCheckId(idInput)}
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
            <h3 className="mb-2">새 비밀번호</h3>
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
              showEye={true}
              isSecret={!showConfirmPassword}
              onEyeClick={() => setShowConfirmPassword(!showConfirmPassword)}
              showButton={true}
              onButtonClick={handleCheckConfirmPassword}
              description={errors.confirmPassword || success.confirmPassword}
              buttonType="button"
            />
          </div>
          <Button
            type="submit"
            size="full"
            variant="orange"
            value="비밀번호 변경하기"
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
      {/* 비밀번호 변경 완료 모달 */}
      {showBasicModal && (
        <BasicModal
          open={showBasicModal}
          onClose={handleLoginModalClose}
          title="비밀번호 변경이 완료되었습니다."
          description="로그인하러 가시겠습니까?"
          GreenButton="로그인하러 가기"
          FailButton="취소"
          onConfirm={handleLoginModalClose}
          onFail={() => setShowBasicModal(false)}
        />
      )}
    </>
  );
};

export default ChangePassword;

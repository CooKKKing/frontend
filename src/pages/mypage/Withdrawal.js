import React, { useState } from "react";
import EmailInputBox from "../../components/EmailInputBox";
import InputBox from "../../components/InputBox";
import InfoMessage from "../../components/InfoMessage";
import Button from "../../components/Button";
import ToastMessage from "../../components/ToastMessage"; // ToastMessage import
import { useNavigate } from "react-router-dom";
import instance from "../../api/axiosInstance";
import { useUser } from "../../hooks/useUser";
import PageTitle from "../../components/PageTitle";

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

// 비밀번호
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
    if (type === "email") {
      url = '/auth/email/verify/register';
      requestData = { email: value };
    } else if (type === "code") {
      url = '/auth/email/confirm';
      requestData = { email: extra, code: value };
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

const Withdrawal = () => {
  const {logout} = useUser();
  const [emailVerified, setEmailVerified] = useState(false);
  const [certVerified, setCertVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [infoOpen, setInfoOpen] = useState(true);
  const [pwInput, setPwInput] = useState('');
  const [verificationCodeInput, setVerificationCodeInput] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const [timerKey, setTimerKey] = useState(0);
  const [toast, setToast] = useState({ open: false, message: '', type: 'success' });
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState({
    local: '',
    domain: EMAIL_DOMAINS[0],
    dropdownOpen: false,
  });
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

  // 이메일 입력
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
    setEmailVerified(false); // 이메일 입력 변경 시 인증 초기화
    setCertVerified(false);
  };

  const handleDomainSelect = (d) => {
    setEmailInput((prev) => ({
      ...prev,
      domain: d,
      dropdownOpen: false,
    }));
    setErrors((prev) => ({ ...prev, email: "" }));
    setSuccess((prev) => ({ ...prev, email: "" }));
    setIsVerificationSent(false);
    setTimerActive(false);
    setEmailVerified(false); // 도메인 변경 시 인증 초기화
    setCertVerified(false);
  };

  const handleDropdownToggle = () => {
    setEmailInput((prev) => ({
      ...prev,
      dropdownOpen: !prev.dropdownOpen,
    }));
  };

  // 이메일 유효성 검사
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

  // 인증번호 전송/재전송
  const handleSendVerification = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const canSend = await handleCheckEmail();
    if (!canSend) return;
    try {
      await sendVerificationCode(fullEmail);
      setIsVerificationSent(true);
      setVerificationDisabled(false);
      setTimerActive(false);
      setTimerKey(prev => prev + 1); // 타이머 리셋
      setTimeout(() => setTimerActive(true), 0);
      setErrors((prev) => ({ ...prev, verificationCode: "" }));
      setSuccess((prev) => ({ ...prev, verificationCode: "" }));
      setEmailVerified(true); // 인증번호 전송 성공 시 이메일 인증 상태 true
      setToast({ open: true, message: "인증번호가 전송되었습니다.", type: "success" });
    } catch (error) {
      setErrors((prev) => ({ ...prev, email: "인증번호 전송에 실패했습니다." }));
      setSuccess((prev) => ({ ...prev, email: "" }));
      setEmailVerified(false);
      setToast({ open: true, message: "인증번호 전송에 실패했습니다.", type: "error" });
    }
  };

  // 인증번호 확인
  const handleCheckVerificationCode = async (e) => {
    e.preventDefault();
    if (!verificationCodeInput || !fullEmail) {
      setErrors((prev) => ({ ...prev, verificationCode: '인증번호를 모두 입력해주세요.' }));
      setSuccess((prev) => ({ ...prev, verificationCode: "" }));
      setCertVerified(false);
      setToast({ open: true, message: "인증번호를 모두 입력해주세요.", type: "error" });
      return;
    }
    try {
      await checkDuplicate("code", verificationCodeInput, fullEmail);
      setErrors((prev) => ({ ...prev, verificationCode: "" }));
      setSuccess((prev) => ({ ...prev, verificationCode: "인증되었습니다." }));
      setVerificationDisabled(true);
      setCertVerified(true); // 인증 성공 시 certVerified true
      setToast({ open: true, message: "이메일 인증이 완료되었습니다.", type: "success" });
    } catch (error) {
      setErrors((prev) => ({ ...prev, verificationCode: "인증번호가 일치하지 않습니다." }));
      setSuccess((prev) => ({ ...prev, verificationCode: "" }));
      setCertVerified(false);
      setToast({ open: true, message: "인증번호가 일치하지 않습니다.", type: "error" });
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
    setCertVerified(false); // 인증번호 입력 변경 시 인증 초기화
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
      setPassword(""); // 유효하지 않으면 password 상태 false
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
      setSuccess((prev) => ({ ...prev, password: "." }));
      setPassword(text); // 유효하면 password 상태 true
    }
  };

  // 회원탈퇴 제출
  const handleWithdrawal = async (e) => {
    e.preventDefault();

    if (
      !pwInput ||
      !fullEmail
    ) {
      setToast({ open: true, message: "모든 항목을 입력해주세요.", type: "error" });
      return;
    }

    const hasError = Object.values(errors).some((v) => v && v !== "");
    if (hasError) {
      setToast({ open: true, message: "입력한 항목을 다시 확인해주세요.", type: "error" });
      return;
    }

    if (!emailVerified || !certVerified || !password) {
      setToast({ open: true, message: "이메일 인증 및 비밀번호를 완료해주세요.", type: "error" });
      return;
    }

    const quitMember = {
      email: fullEmail,
      password: pwInput,
    };
    // const token = localStorage.getItem("accessToken");
    // if (!token) {
    //   setToast({ open: true, message: "로그인이 만료되었습니다. 다시 로그인 해주세요.", type: "error" });
    //   return;
    // }

    try {
      const token = localStorage.getItem("accessToken");
      await instance.delete('/members', {data: quitMember});
      localStorage.clear();
      setToast({ open: true, message: "회원탈퇴가 완료되었습니다.", type: "success" });
      logout();
      // setTimeout(() => {
      //   navigate('/');
      // }, 1500);
    } catch (error) {
      setToast({
        open: true,
        message: error?.response?.data?.message || "회원탈퇴 실패. 다시 입력해주세요.",
        type: "error"
      });
    }
  };

  return (
    <div className="w-full mx-auto">
      <PageTitle title="회원탈퇴" />
      <div className="flex flex-col gap-4 mb-6">
        {/* 이메일 입력 및 인증 */}
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

        {/* 인증번호 입력 */}
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

        {/* 비밀번호 입력 */}
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
      </div>

      {/* 안내 메시지 */}
      <div className="mt-8">
        <InfoMessage
          title="안내 메시지"
          isOpen={infoOpen}
          onToggle={() => setInfoOpen((prev) => !prev)}
          borderColor="#E6731A"
          titleColor="#E6731A"
          iconColor="#E6731A"
        >
          <ul className="list-disc pl-4 space-y-1">
            <li>회원 탈퇴 시, 해당 계정에 저장된 모든 정보가 삭제됩니다.</li>
            <li>보유 중인 캐시 및 이용 내역은 모두 사라지며 복구가 불가능합니다.</li>
            <li>탈퇴 이후에는 동일한 이메일로 재가입이 가능하더라도 기존 데이터는 연동되지 않습니다.</li>
          </ul>
        </InfoMessage>
      </div>

      {/* 탈퇴 버튼 */}
      <div className="mt-8">
        <Button
          size="full"
          variant="orange"
          value="회원탈퇴"
          disabled={!(emailVerified && certVerified && password)}
          onClick={handleWithdrawal}
          height="48px"
        />
      </div>

      {/* 토스트 메시지 */}
      <div className="fixed left-1/2 bottom-8 z-50" style={{ transform: "translateX(-50%)" }}>
        {toast.open && (
          <ToastMessage
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, open: false })}
          />
        )}
      </div>
    </div>
  );
};

export default Withdrawal;
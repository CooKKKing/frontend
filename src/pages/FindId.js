// import React, { useState } from 'react';
// import EmailInputBox from '../components/EmailInputBox';
// import InputBox from '../components/InputBox';
// import Button from '../components/Button';
// import IdFoundModal from '../components/IdFoundModal';
// import { useNavigate } from 'react-router-dom';
// import instance from '../api/axiosInstance';
// import ToastMessage from '../components/ToastMessage';

// const EMAIL_DOMAINS = [
//   "선택",
//   "gmail.com",
//   "naver.com",
//   "hanmail.net",
//   "nate.com",
//   "kakao.com",
// ];

// // 인증번호 확인만 남기고 email 중복검증 분기 제거
// const checkDuplicate = async (type, value, extra) => {
//   try {
//     let url, requestData;
//     if (type === "id") {
//       url = '/members/id';
//       requestData = { loginId: value };
//     } else if (type === "nickName") {
//       url = '/members/name';
//       requestData = { nickName: value };
//     } else if (type === "code") {
//       url = '/auth/email/confirm';
//       requestData = { email: extra, code: value };
//     } else if (type === "phoneNumber") {
//       url = '/members/phone';
//       requestData = { phoneNumber: value }
//     } else {
//       url = `/members/${type}`;
//       requestData = { [type]: value };
//     }
//     await instance.post(url, requestData);
//     return false;
//   } catch (error) {
//     if (error.response && error.response.status === 409) {
//       return true;
//     }
//     if (error.response && error.response.status === 400) {
//       throw new Error('Invalid input data.');
//     }
//     throw new Error('Network errors occurred. Please try again later.');
//   }
// };

// // 이메일 인증번호 전송 API
// const sendVerificationCode = async (email) => {
//   await instance.post('/auth/email/verify', { email });
// };

// // 인증번호 확인 API
// const checkVerificationCode = async (email, code) => {
//   await instance.post('/auth/email/confirm', { email, code });
// };

// // 핸드폰번호 자동 하이픈
// const formatPhoneNumber = (phoneNumber) => {
//   if (!phoneNumber) return '';
//   const cleaned = phoneNumber.replace(/\D/g, '');
//   const limited = cleaned.slice(0, 11);
//   if (limited.length < 4) return limited;
//   if (limited.length < 8) return limited.slice(0, 3) + '-' + limited.slice(3);
//   return limited.slice(0, 3) + '-' + limited.slice(3, 7) + '-' + limited.slice(7, 11);
// };

// // 이메일 앞부분: 영문/숫자만 허용
// const emailLocalRegex = /^[a-zA-Z0-9]+$/;

// // 핸드폰번호 유효성
// const isValidPhone = (phone) => {
//   if (!phone) return false;
//   const onlyDigits = phone.replace(/\D/g, '');
//   return /^010\d{7,8}$/.test(onlyDigits);
// };

// const FindId = ({ onLoginModalOpen }) => {
//   const [verificationCodeInput, setVerificationCodeInput] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [foundUserId, setFoundUserId] = useState('');
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const navigate = useNavigate();
//   const [idInput, setIdInput] = useState('');
//   const [nickNameInput, setNickNameInput] = useState('');
//   const [pwInput, setPwInput] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [phoneInput, setPhoneInput] = useState('');
//   const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState({});
//   const [profileImage, setProfileImage] = useState(1);
//   const [toast, setToast] = useState({ open: false, message: '', type: 'success' });
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [timerKey, setTimerKey] = useState(0);

//   // 이메일 입력 상태
//   const [emailInput, setEmailInput] = useState({
//     local: '',
//     domain: EMAIL_DOMAINS[0],
//     dropdownOpen: false,
//   });

//   // 인증번호 관련 상태
//   const [isVerificationSent, setIsVerificationSent] = useState(false);
//   const [timerActive, setTimerActive] = useState(false);
//   const [verificationDisabled, setVerificationDisabled] = useState(true);

//   // 이메일 전체값
//   const fullEmail =
//     emailInput.local &&
//     emailInput.domain &&
//     emailInput.domain !== EMAIL_DOMAINS[0]
//       ? `${emailInput.local}@${emailInput.domain}`
//       : '';

//   // 이메일 입력 핸들러
//   const handleEmailLocalChange = (e) => {
//     const val = e.target.value;
//     setEmailInput((prev) => ({
//       ...prev,
//       local: val,
//     }));
//     if (val === '' || emailLocalRegex.test(val)) {
//       setErrors((prev) => ({ ...prev, email: "" }));
//     } else {
//       setErrors((prev) => ({ ...prev, email: "올바른 이메일의 형식으로 입력해주세요." }));
//     }
//     setSuccess((prev) => ({ ...prev, email: "" }));
//     setIsVerificationSent(false);
//     setTimerActive(false);
//   };

//   const handleDomainSelect = (d) => {
//     setEmailInput((prev) => ({
//       ...prev,
//       domain: d,
//       dropdownOpen: false,
//     }));
//     setErrors((prev) => ({ ...prev, email: "" }));
//     setSuccess((prev) => ({ ...prev, email: "" }));
//   };

//   const handleDropdownToggle = () => {
//     setEmailInput((prev) => ({
//       ...prev,
//       dropdownOpen: !prev.dropdownOpen,
//     }));
//   };

//   // 인증번호 전송
//   const handleSendVerification = async (e) => {
//     e.preventDefault();
//     console.log(fullEmail);

//     if (!emailInput.local || !emailInput.domain || emailInput.domain === EMAIL_DOMAINS[0]) {
//       setErrors((prev) => ({ ...prev, email: "이메일을 모두 입력해주세요." }));
//       return;
//     }
//     if (!emailLocalRegex.test(emailInput.local)) {
//       setErrors((prev) => ({ ...prev, email: "올바른 이메일의 형식으로 입력해주세요." }));
//       return;
//     }
//     if (!fullEmail) {
//       setErrors((prev) => ({ ...prev, email: "이메일을 모두 입력해주세요." }));
//       return;
//     }

//     // 인증번호 전송
//     try {
//       console.log("Email확인", fullEmail);
//       await sendVerificationCode(fullEmail);
//       setIsVerificationSent(true);
//       setVerificationDisabled(false);
//       setTimerActive(false);
//       setTimerKey(prev => prev + 1);
//       setTimeout(() => setTimerActive(true), 0);
//       setErrors((prev) => ({ ...prev, verificationCode: "" }));
//       setSuccess((prev) => ({ ...prev, verificationCode: "" }));
//     } catch (error) {
//       setErrors({
//         email: error?.response?.data?.message || "인증번호 전송에 실패했습니다."
//       });
//     }
//   };

//   // 인증번호 && 이메일 검증
//   const handleCheckVerificationCode = async (e) => {
//     e.preventDefault();
//     if (!verificationCodeInput || !fullEmail) {
//       setErrors((prev) => ({ ...prev, verificationCode: '인증번호를 모두 입력해주세요.' }));
//       setSuccess((prev) => ({ ...prev, verificationCode: "" }));
//       return;
//     }
//     try {
//       await checkVerificationCode(fullEmail, verificationCodeInput);
//       setErrors((prev) => ({ ...prev, verificationCode: "" }));
//       setSuccess((prev) => ({ ...prev, verificationCode: "인증되었습니다." }));
//       setVerificationDisabled(true);
//     } catch (error) {
//       setErrors((prev) => ({
//         ...prev,
//         verificationCode: error?.response?.data?.message || "인증번호가 일치하지 않습니다."
//       }));
//       setSuccess((prev) => ({ ...prev, verificationCode: "" }));
//     }
//   };

//   const handleTimerEnd = () => {
//     setVerificationDisabled(true);
//   };

//   const handleVerificationInputChange = (e) => {
//     setVerificationCodeInput(e.target.value);
//     setErrors((prev) => ({ ...prev, verificationCode: "" }));
//     setSuccess((prev) => ({ ...prev, verificationCode: "" }));
//   };


//   // 전화번호 입력
//   const handlePhoneInputChange = (e) => {
//     const input = e.target.value;
//     const formatted = formatPhoneNumber(input);
//     if (formatted.length > 13) return;
//     setPhoneInput(formatted);
//     setErrors((prev) => ({ ...prev, phone: "" }));
//     setSuccess((prev) => ({ ...prev, phone: "" }));
//   };

//   // 전화번호 형식 체크
//   const handlePhoneCheck = () => {
//     if (!isValidPhone(phoneInput)) {
//       setErrors((prev) => ({ ...prev, phone: "전화번호 형식이 올바르지 않습니다." }));
//       setSuccess((prev) => ({ ...prev, phone: "" }));
//       return;
//     }
//     setErrors((prev) => ({ ...prev, phone: "" }));
//     setSuccess((prev) => ({ ...prev, phone: "사용 가능한 번호입니다." }));
//   };

//   // Toast 닫기 핸들러
//   const handleToastClose = () => {
//     setToast({ ...toast, open: false });
//   };

//   // LoginModal 닫기 핸들러
//   const handleLoginModalClose = () => {
//     setShowLoginModal(false);
//     navigate("/");
//   };

//   // 아이디찾기 제출
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !fullEmail ||
//       !verificationCodeInput ||
//       !phoneInput
//     ) {
//       setToast({ open: true, message: "모든 항목을 입력해주세요.", type: "error" });
//       return;
//     }

//     const hasError = Object.values(errors).some((v) => v && v !== "");
//     if (hasError) {
//       setToast({ open: true, message: "입력한 항목을 다시 확인해주세요.", type: "error" });
//       return;
//     }

//     if (success.verificationCode !== "인증되었습니다.") {
//       setToast({ open: true, message: "이메일 인증을 완료해주세요.", type: "error" });
//       return;
//     }

//     const findData = {
//       email: fullEmail,
//       phoneNumber: phoneInput,
//     };

//     try {
//       console.log("FindData", findData)
//       await instance.post('/members/findid', findData);
//       setToast({ open: true, message: "아이디 찾기 성공!", type: "success" });
//       setShowLoginModal(true);
//     } catch (error) {
//       setToast({ open: true, message: "아이디 찾기 실패! 다시 시도해주세요.", type: "error" });
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <h2 className="text-2xl font-bold mb-8">아이디 찾기</h2>
//         <div className="mt-8 space-y-6">
//           {/* 이메일 */}
//           <div>
//             <h3 className="mb-2">이메일</h3>
//             <EmailInputBox
//               label={null}
//               local={emailInput.local}
//               setLocal={(val) => setEmailInput((prev) => ({ ...prev, local: val }))}
//               domain={emailInput.domain}
//               setDomain={(val) => setEmailInput((prev) => ({ ...prev, domain: val }))}
//               dropdownOpen={emailInput.dropdownOpen}
//               setDropdownOpen={(val) => setEmailInput((prev) => ({ ...prev, dropdownOpen: val }))}
//               error={errors.email || success.email}
//               domainList={EMAIL_DOMAINS.slice(1)}
//               buttonText={isVerificationSent ? "재전송" : "인증번호 전송"}
//               buttonVariant="orange"
//               onButtonClick={handleSendVerification}
//               handleDropdownToggle={handleDropdownToggle}
//               handleDomainSelect={handleDomainSelect}
//               handleLocalChange={handleEmailLocalChange}
//             />
//           </div>

//           {/* 인증번호 */}
//           <div>
//             <h3 className="mb-2">인증번호</h3>
//             <InputBox
//               name="code"
//               value={verificationCodeInput}
//               onChange={handleVerificationInputChange}
//               placeholder="인증번호를 입력하세요"
//               buttonText="확인"
//               onButtonClick={handleCheckVerificationCode}
//               buttonVariant="orange"
//               showTimer={isVerificationSent}
//               timerSeconds={180}
//               timerActive={timerActive}
//               onTimerEnd={handleTimerEnd}
//               buttonDisabled={verificationDisabled}
//               showButton={!verificationDisabled}
//               description={errors.verificationCode || success.verificationCode}
//               buttonType="button"
//               key={timerKey}
//             />
//           </div>

//           {/* 핸드폰번호 */}
//           <div>
//             <h3 className="mb-2">핸드폰번호</h3>
//             <InputBox
//               name="phone"
//               value={phoneInput}
//               onChange={handlePhoneInputChange}
//               placeholder="핸드폰번호를 입력하세요"
//               onButtonClick={handlePhoneCheck}
//               description={errors.phone || success.phone}
//               buttonType="button"
//             />
//           </div>

//           <Button
//             type="submit"
//             size="full"
//             variant="orange"
//             value="아이디 찾기"
//             height="50px"
//           />
//         </div>
//       </form>
//       {/* 토스트 메시지 */}
//       {toast.open && (
//         <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10000]">
//           <ToastMessage
//             message={toast.message}
//             type={toast.type}
//             onClose={handleToastClose}
//           />
//         </div>
//       )}
//       {/* 로그인 모달 */}
//       {showLoginModal && (
//         <IdFoundModal isOpen={showLoginModal} onClose={handleLoginModalClose} />
//       )}
//     </>
//   );
// };

// export default FindId;

import React, { useState } from 'react';
import EmailInputBox from '../components/EmailInputBox';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import IdFoundModal from '../components/modals/IdFoundModal';
import { useNavigate } from 'react-router-dom';
import instance from '../api/axiosInstance';
import ToastMessage from '../components/ToastMessage';

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

// 이메일 인증번호 전송 API
const sendVerificationCode = async (email) => {
  await instance.post('/auth/email/verify', { email });
};

// 인증번호 확인 API
const checkVerificationCode = async (email, code) => {
  await instance.post('/auth/email/confirm', { email, code });
};

const FindId = () => {
  const [verificationCodeInput, setVerificationCodeInput] = useState('');
  const [foundUserId, setFoundUserId] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const [phoneInput, setPhoneInput] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const [toast, setToast] = useState({ open: false, message: '', type: 'success' });
  const [timerKey, setTimerKey] = useState(0);

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

    try {
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

  // Toast 닫기 핸들러
  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  // LoginModal 닫기 핸들러
  const handleLoginModalClose = () => {
    setShowLoginModal(false);
    navigate("/");
  };

  // 아이디찾기 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !fullEmail ||
      !verificationCodeInput ||
      !phoneInput
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

    const findData = {
      email: fullEmail,
      phoneNumber: phoneInput,
    };

    try {
      const response = await instance.post('/members/findid', findData);
      // 응답 구조에 따라 loginId 또는 id로 받아오기
      console.log("FindId id =============== ", response.data.data)
      setFoundUserId(response.data.data);
      setToast({ open: true, message: "아이디 찾기 성공!", type: "success" });
      setShowLoginModal(true);
    } catch (error) {
      setToast({ open: true, message: "아이디 찾기 실패! 다시 시도해주세요.", type: "error" });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-8">아이디 찾기</h2>
        <div className="mt-8 space-y-6">
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
            value="아이디 찾기"
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
      {/* 아이디 찾기 결과 모달 */}
      {showLoginModal && (
        <IdFoundModal
          isOpen={showLoginModal}
          onClose={handleLoginModalClose}
          userId={foundUserId}
        />
      )}
    </>
  );
};

export default FindId;


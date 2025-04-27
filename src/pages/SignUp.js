import React, { useState } from 'react';
import EmailInputBox from '../components/EmailInputBox';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { checkDuplicateId, checkDuplicateNickName, checkDuplicateNickname, signUp } from '../api/mutations/userServices';
import instance from '../api/axiosInstance';

// 중복 검증 함함수
const checkDuplicate = async (type, value) => {
  try {
    const url = `/members/${type}`;
    const requestData = type === "id" ? { loginId: value } : { [type]: value };
    // const requestData = { [type]: value };
    const response = await instance.post(url, requestData); 

    console.log("중복 검증 함수 response == ", response);

    // return response;
    return;
  } catch (error) {
    // 409면 중복
    console.error('catch error:', error); // 전체 에러 내용 확인
    if (error.response && error.response.status === 409) {
      return true;
    }
    // 400 등 기타 에러
    if (error.response && error.response.status === 400) {
      throw new Error('Invalid input data.');
    }
    // 기타 네트워크 에러
    throw new Error('Network errors occurred. Please try again later.');
  }
};

const SignUp = () => {
 
  const [idInput, setIdInput] = useState('');   
  const [nickNameInput, setNickNameInput] = useState('');
  const [pwInput, setPwInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [verificationCodeInput, setVerificationCodeInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [isIdDuplicate, setIsIdDuplicate] = useState(false);
  const [isNickNameDuplicate, setIsNickNameDuplicate] = useState(false);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [isVerificationCodeDuplicate, setIsVerificationCodeDuplicate] = useState(false);
  const [isPhoneDuplicate, setIsPhoneDuplicate] = useState(false);
  const [isPasswordDuplicate, setIsPasswordDuplicate] = useState(false);
  const [isConfirmPasswordDuplicate, setIsConfirmPasswordDuplicate] = useState(false);
  
  // 아이디 중복 검증
  const handleCheckId = async (e) => {
    e.preventDefault();

    if (!idInput) {
      setErrors((prev) => ({ ...prev, loginId: "아이디를 입력해주세요." }));
      return;
    }

    try {
      const isDuplicate = await checkDuplicate("id", idInput);
      console.log("isDuplicate", isDuplicate);

      setIsIdDuplicate(!isIdDuplicate);
      console.log("isIdDuplicate", isIdDuplicate);
      
      setErrors((prev) => ({...prev, loginId: isIdDuplicate ? "이미 사용중인 아이디입니다." : "사용 가능한 아이디입니다."}))

    } catch (error) {
      setErrors((prev) => ({...prev, loginId: error.message}))
    }

    // try {
    //   const isDuplicate = await checkDuplicate("loginId", idInput);
    //   if (isDuplicate.status === 200){
    //     setErrors((prev) => ({ ...prev, loginId: "사용 가능한 아이디입니다." }));
    //   }
    // } catch (iderrors) {
    //   if(iderrors.response.status === 409) {
    //     setErrors((prev) => ({ ...prev, name: "이미 존재하는 아이디입니다." }));
    //   }
    // }
  }


  // 닉네임 중복 검증증
  const handleCheckNickName = async (e) => {
    e.preventDefault();

    if (!nickNameInput) {
      setErrors((prev) => ({ ...prev, nickName: "닉네임을 입력해주세요." }));
      return;
    }

      try {
        const isDuplicate = await checkDuplicate("nickName", nickNameInput);
        setIsNickNameDuplicate(isDuplicate);
        setErrors((prev) => ({
          ...prev, nickName: !isDuplicate ? "사용 가능한 닉네임입니다." : "이미 존재하는 닉네임입니다."
        }))
      } catch (errors) {
        setErrors((prev) => ({...prev, nickName: errors.message}))
      }
    // try {
    //   const isDuplicate = await checkDuplicate("nickName", nickNameInput);
    //   // console.log(isDuplicate.status);
    //   if(isDuplicate.status === 200) {
    //     setErrors((prev) => ({ ...prev, nickName: "사용 가능한 닉네임입니다다." }))
    //   }
    // } catch (emailerrors) {
    //   if (emailerrors.response.status === 409) {
    //     setErrors((prev) => ({ ...prev, nickName: "이미 존재하는는 닉네임입니다." }));
    //   }
    // }
  };


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-8">회원가입</h2>
      {/* <form className="space-y-4" onSubmit={handleSignUp}> */}
        <div>
          <h3 className="mb-2">아이디</h3>
          <InputBox
            name="loginId"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            placeholder="Placeholder"
            buttonText="중복 확인"
            onButtonClick={(e) => handleCheckId(e)}
            buttonVariant="orange"
            description={errors.loginId}
          />
          
        </div>

        <div>
          <h3 className="mb-2">닉네임</h3>
          <InputBox
            name="nickName"
            value={nickNameInput}
            onChange={(e) =>setNickNameInput(e.target.value)}
            placeholder="Placeholder"
            buttonText="중복 확인"
            onButtonClick={(e) => handleCheckNickName(e)}
            buttonVariant="orange"
            description={errors.nickName}
          />
        </div>

        <div>
          <h3 className="mb-2">이메일</h3>
          <EmailInputBox
            value={emailInput}
            onChange={(e)=>setEmailInput(e.target.value)}
            placeholder="Placeholder"
            buttonText="인증"
            onButtonClick={() => {}}
          />
        </div>

        <div>
          <h3 className="mb-2">인증번호</h3>
          <InputBox
            name="verificationCode"
            value={verificationCodeInput}
            onChange={(e)=>setVerificationCodeInput(e.target.value)}
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
            onChange={(e)=>setPhoneInput(e.target.value)}
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
            onChange={(e)=>setPwInput(e.target.value)}
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
            onChange={(e)=>setConfirmPasswordInput(e.target.value)}
            placeholder="비밀번호를 다시 입력해주세요"
            showEye={true}
            isSecret={!showConfirmPassword}
            onEyeClick={() => setShowConfirmPassword(!showConfirmPassword)}
            showButton={true}
          />
        </div>

        <Button
          type="submit"
          size="full"
          variant="orange"
          value="회원가입"
          height="40px"
          onClick={() => {}}
        />
      {/* </form> */}
    </div>
  );
};

export default SignUp;
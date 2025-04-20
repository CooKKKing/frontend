import React, { useState } from 'react';  
import PageTitle from '../components/PageTitle';
import InputBox from '../components/InputBox';
const SignUp = () => {
    const [idInput, setIdInput] = useState('');
    const [nicknameInput, setNicknameInput] = useState('');         
    const [pwInput, setPwInput] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <PageTitle title="회원가입" />
            <form className="space-y-4">    
                 {/* 아이디 입력 */}
                <div className="mt-3">
                    <InputBox
                        label={<span className="text-xs sm:text-sm md:text-base">아이디</span>}
                        value={idInput}
                        onChange={(e) => setIdInput(e.target.value)}
                        placeholder="아이디를 입력해주세요."
                        buttonText="중복 확인"
                        onButtonClick={() => {}}
                        buttonVariant="orange"
                        showEye={false}
                        showButton={true}
                        inputClassName="text-xs sm:text-sm md:text-base placeholder:text-[11px] sm:placeholder:text-sm md:placeholder:text-base px-2 sm:px-3"
                    />
                </div>
                 {/* 닉네임 입력 */}
                 <div className="mt-3">
                    <InputBox
                        label={<span className="text-xs sm:text-sm md:text-base">닉네임</span>}
                        value={nicknameInput}
                        onChange={(e) => setNicknameInput(e.target.value)}
                        placeholder="닉네임을 입력해주세요."
                        buttonText="중복 확인"
                        onButtonClick={() => {}}
                        buttonVariant="orange"
                        showEye={false}
                        showButton={true}
                        inputClassName="text-xs sm:text-sm md:text-base placeholder:text-[11px] sm:placeholder:text-sm md:placeholder:text-base px-2 sm:px-3"
                    />
                </div>
                {/* 비밀번호 입력 */}
                <div className="mt-3">
                <InputBox
                    label={<span className="text-xs sm:text-sm md:text-base">비밀번호</span>}
                    value={pwInput}
                    onChange={(e) => setPwInput(e.target.value)}
                    placeholder="비밀번호를 입력해주세요."
                    buttonText="확인"
                    onButtonClick={() => {}}
                    buttonVariant="orange"
                    isSecret={showPassword}
                    onEyeClick={togglePassword}
                    showEye={true}
                    showButton={false}
                    inputClassName="text-xs sm:text-sm md:text-base placeholder:text-[11px] sm:placeholder:text-sm md:placeholder:text-base px-2 sm:px-3"
                />
                </div>
            </form>
           
        </div>
    );
};  

export default SignUp;

import React from "react";
import InputBox from "./InputBox";
import useInputBox from "../hooks/useInputBox";
import { FaTimes } from "react-icons/fa";

const LoginModal = ({ open, onClose }) => {
  const idInput = useInputBox({ initialValue: "" });
  const pwInput = useInputBox({ initialValue: "", initialSecret: true });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#b0b0b0] bg-opacity-90">
      <div className="bg-white rounded-xl shadow-xl w-[96vw] max-w-[340px] px-4 sm:px-7 py-7 sm:py-8 relative">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-3 right-3 text-xl text-black hover:text-orange-600 transition"
          onClick={onClose}
          aria-label="닫기"
        >
          <FaTimes />
        </button>
        {/* 타이틀 */}
        <h2 className="text-center text-base sm:text-xl font-bold mb-6">로그인</h2>
        {/* 아이디 입력 */}
        <InputBox
          label={<span className="text-xs sm:text-sm md:text-base">아이디</span>}
          value={idInput.value}
          onChange={idInput.handleChange}
          placeholder="아이디를 입력해주세요."
          buttonText="확인"
          onButtonClick={() => {}}
          buttonVariant="orange"
          showEye={false}
          showButton={false}
          inputClassName="text-xs sm:text-sm md:text-base placeholder:text-[11px] sm:placeholder:text-sm md:placeholder:text-base px-2 sm:px-3"
        />
        {/* 비밀번호 입력 */}
        <div className="mt-3">
          <InputBox
            label={<span className="text-xs sm:text-sm md:text-base">비밀번호</span>}
            value={pwInput.value}
            onChange={pwInput.handleChange}
            placeholder="비밀번호를 입력해주세요."
            buttonText="확인"
            onButtonClick={() => {}}
            buttonVariant="orange"
            isSecret={pwInput.isSecret}
            onEyeClick={pwInput.handleEyeClick}
            showEye={true}
            showButton={false}
            inputClassName="text-xs sm:text-sm md:text-base placeholder:text-[11px] sm:placeholder:text-sm md:placeholder:text-base px-2 sm:px-3"
          />
        </div>
        {/* 아이디/비밀번호 찾기 */}
        <div className="flex justify-center gap-x-14 mt-4 mb-4 text-[11px] sm:text-xs text-black">
          <button className="hover:underline" type="button">아이디 찾기</button>
          <button className="hover:underline" type="button">비밀번호 찾기</button>
        </div>

        {/* 로그인 버튼 */}
        <button
          className="w-full h-[40px] sm:h-[44px] rounded-lg bg-gradient-to-r from-[#ee964b] to-[#e6731a] text-white font-bold text-sm sm:text-base mt-1 mb-2"
          type="button"
        >
          button
        </button>
        {/* 회원가입 */}
        <div className="mt-1 text-center text-[11px] sm:text-xs text-black">
          <button className="hover:underline" type="button">회원가입</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

import React, { useState } from "react";
import EmailInputBox from "../../components/EmailInputBox";
import InputBox from "../../components/InputBox";
import InfoMessage from "../../components/InfoMessage";
import Button from "../../components/Button";


const Withdrawal = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [certCode, setCertCode] = useState("");
  const [certVerified, setCertVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true); // 비밀번호 숨김 상태
  const [infoOpen, setInfoOpen] = useState(true);

  // 이메일 인증 버튼 클릭
  const handleEmailCert = (email) => {
    // 실제 인증 요청 로직 필요
    setEmailVerified(true);
  };

  // 인증번호 확인 버튼 클릭
  const handleCertConfirm = () => {
    // 실제 인증번호 확인 로직 필요
    setCertVerified(true);
  };

  // 탈퇴 버튼 클릭
  const handleWithdrawal = () => {
    // 실제 탈퇴 요청 로직 필요
    alert("회원 탈퇴가 완료되었습니다.");
  };

  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-bold mb-6">회원탈퇴</h2>
      <div className="flex flex-col gap-4">
        {/* 이메일 입력 및 인증 */}
        <EmailInputBox
          label="이메일"
          buttonText="인증"
          buttonVariant="orange"
          onButtonClick={handleEmailCert}
          disabled={emailVerified}
        />

        {/* 인증번호 입력 */}
        <InputBox
          label="인증번호"
          value={certCode}
          onChange={e => setCertCode(e.target.value)}
          placeholder="인증번호를 입력하세요"
          buttonText="확인"
          buttonVariant="orange"
          onButtonClick={handleCertConfirm}
          disabled={!emailVerified || certVerified}
          showButton={true}
        />

        {/* 비밀번호 입력 */}
        <InputBox
          label="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          buttonText=""
          showButton={false}
          isSecret={showPassword}
          showEye={true}
          onEyeClick={() => setShowPassword((prev) => !prev)}
          disabled={!certVerified}
        />
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
    </div>
  );
};

export default Withdrawal;

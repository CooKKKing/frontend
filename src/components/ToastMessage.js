import React from "react";
// X 아이콘콘
import { IoMdClose } from "react-icons/io";

// message: 표시할 텍스트
// type: "success" | "error" (알림 색상 구분)
// onClose: 닫기(X) 버튼 클릭 시 실행 함수
const ToastMessage = ({ message, type = "success", onClose }) => {
  const colorClass =
    type === "success"
    // 성공 시
      ? "bg-green-600"
      // 실패 시
      : "bg-red-700";

  const shadowClass = "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)]";
  return (
    <div
      className={`
        pointer-events-auto
        flex items-center justify-between gap-2 px-4 py-2 rounded-lg text-white font-semibold
        ${colorClass} ${shadowClass}
        w-fit max-w-[400px]
        break-words whitespace-pre-line
        text-base
      `}
      style={{ marginBottom: "12px" }}
    >
      {/* 알림 메시지 텍스트 (길면 말줄임임) */}
      <span className="truncate break-words">{message}</span>
      <button onClick={onClose} className="ml-2 flex-shrink-0">
        <IoMdClose size={28} />
      </button>
    </div>
  );
};

export default ToastMessage;

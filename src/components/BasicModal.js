import React from "react";
import { IoMdClose } from "react-icons/io";

/**
 * BasicModal 컴포넌트
 * - open: 모달 열림 여부
 * - onClose: 닫기 함수
 * - title, description, type, confirmText
 * - onConfirm: 확인 버튼 클릭 시 실행 함수 (없으면 onClose)
 */
const BasicModal = ({
  open,
  onClose,
  title,
  description,
  type = "success", // "success" | "error"
  confirmText,
  buttonText,
  onConfirm,
}) => {
  if (!open) return null;

  const btnClass =
    type === "success"
      ? "bg-green-600 hover:bg-green-700"
      : "bg-red-700 hover:bg-red-800";
  const btnTextClass = "text-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md mx-4 bg-white">
        {/* X 버튼 */}
        <button
          className="absolute top-3 right-3 text-xl text-gray-800"
          onClick={onClose}
          aria-label="닫기"
        >
          <IoMdClose size={22} />
        </button>
        {/* 내용 */}
        <div className="flex flex-col items-center px-6 py-7">
          <div className="font-bold text-lg mb-2 text-black">{title}</div>
          <div className="text-gray-700 text-center mb-6 whitespace-pre-line">{description}</div>
          <div className="flex gap-2 w-full">
           { confirmText && <button
              className={`w-full py-2 rounded-md font-semibold ${btnClass} ${btnTextClass} transition`}
              onClick={onConfirm || onClose}
            >
              {confirmText}
            </button>}
           { buttonText && <button
              className={`w-full py-2 rounded-md font-semibold ${btnClass} ${btnTextClass} transition`}
              onClick={onConfirm || onClose}
            >
              {buttonText}
            </button>}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default BasicModal;

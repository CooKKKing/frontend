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
  SuccessButton,
  FailButton,
  RedButton,
  OrangeButton,
  GreenButton,
  onConfirm,
  onFail,
  img
}) => {
  if (!open) return null;

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
          
          {img && <img src={img} alt={description} />}
        
          <div className="flex gap-2 w-full">

           { SuccessButton && <button
              className={`w-full py-2 rounded-md font-semibold bg-green-500 hover:bg-green-700 ${btnTextClass} transition`}
              onClick={onConfirm || onClose}
            >
              {SuccessButton}
            </button>}
            
            { FailButton && (
              <button
                className={`w-full py-2 rounded-md font-semibold bg-red-500 hover:bg-red-800 ${btnTextClass} transition`}
                onClick={onFail || onClose} // *수정* 여기!
              >
                {FailButton}
              </button>
            )}

            { RedButton && <button
              className={`w-full py-2 rounded-md font-semibold bg-red-500 hover:bg-red-800 ${btnTextClass} transition`}
              onClick={onConfirm || onClose}
            >
              {RedButton}
            </button>}

            { OrangeButton && <button
              className={`w-full py-2 rounded-md font-semibold bg-orange-gradient hover:bg-orange-600 ${btnTextClass} transition`}
              onClick={onConfirm || onClose}
            >
              {OrangeButton}
            </button>}

            { GreenButton && <button
              className={`w-full py-2 rounded-md font-semibold bg-green-gradient hover:bg-green-700 transition ${btnTextClass} transition`}
              onClick={onConfirm || onClose}
            >
              {GreenButton}
            </button>}
            
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default BasicModal;

import React from 'react';
import { IoMdClose } from "react-icons/io";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, categoryName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md mx-4 p-6">
        <button
          className="absolute top-3 right-3 text-xl text-gray-800"
          onClick={onClose}
          aria-label="닫기"
        >
          <IoMdClose size={22} />
        </button>

        <h2 className="text-xl font-bold mb-4">도감 카테고리 삭제</h2>
        
        <div className="mb-6 text-gray-600">
          <p>'{categoryName}' 카테고리를 정말 삭제하시겠습니까?</p>
          <p className="mt-2 text-sm text-red-500">이 작업은 되돌릴 수 없습니다.</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal; 
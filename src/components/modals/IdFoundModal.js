import React from 'react';
import Button from '../buttons/Button';
import { IoClose, IoCopy } from "react-icons/io5";
import { IoIosCopy } from "react-icons/io";

const IdFoundModal = ({ isOpen, onClose, userId, onLoginClick }) => {
  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(userId);
    alert('아이디가 클립보드에 복사되었습니다.');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[80%] max-w-md">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500">
            <IoClose />
          </button>
        </div>
        <h3 className="text-center text-xl mb-4">아이디 찾기</h3>
        <div className="text-center mb-4">
          <p className="mb-2">회원님의 아이디는</p>
          <div className="flex items-center justify-center gap-2">
            <span className="font-bold">{userId}</span>
            <button 
              onClick={handleCopy}
              className="text-sm text-gray-500 border border-gray-300 rounded px-2 py-1"
            >
              <IoCopy />
            </button>
          </div>
          <p>입니다.</p>
        </div>
        <Button
          onClick={onLoginClick}
          className="w-full bg-orange-gradient text-white py-2 rounded-lg hover:bg-orange-600"
        >
          로그인 하러 가기
        </Button >
      </div>
    </div>
  );
};

export default IdFoundModal; 
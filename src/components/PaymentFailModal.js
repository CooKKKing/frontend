import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCancelModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    navigate('/shop');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-center mb-4">결제 취소</h2>
        <p className="text-center text-gray-600 mb-6">
          결제가 취소되었습니다.
        </p>
        <button
          onClick={handleClose}
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default PaymentCancelModal; 
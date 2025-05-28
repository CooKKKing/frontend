import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccessModal = ({ isOpen, onClose, paymentKey, amount, riceAmount }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    navigate('/shop');
  };

  // amount가 undefined일 경우 0으로 처리
  const displayAmount = amount || 0;
  const displayRiceAmount = riceAmount || 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-center mb-4">결제 성공!</h2>
        <div className="space-y-4">
          <p className="text-center text-gray-600">
            결제가 성공적으로 완료되었습니다.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">결제 금액: {displayAmount.toLocaleString()}원</p>
            <p className="text-sm text-gray-600">충전된 쌀: {displayRiceAmount}개</p>
            <p className="text-sm text-gray-600 break-all">결제 번호: {paymentKey || '없음'}</p>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="mt-6 w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessModal; 
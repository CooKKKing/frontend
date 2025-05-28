import dayjs from 'dayjs';
import React from 'react';

const PaymentHistoryItem = ({ date, amount, image, bank, price, accountNumber, status = 'success' }) => {
  const isSuccess = status === "COMPLETED";

  // const isoString = date;
  const formatted = dayjs(date).format("YYYY-MM-DD HH:mm:ss");

  return (
    <div className="border border-gray-200 rounded-lg">
      {/* 상단 헤더 */}
      <div className={`flex justify-between items-center p-3 rounded-t-lg ${
        isSuccess ? 'bg-[#F5F9F6]' : 'bg-[#FFF5F5]'
      }`}>
        <div className="text-gray-700">{formatted}</div>
        <div className="text-gray-700">{isSuccess ? '결제 완료' : '결제 취소'}</div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="p-4">
        <div className="flex gap-4">
          {/* 이미지 */}
          <div className="w-24 h-24 bg-gray-50 rounded-lg flex items-center justify-center p-2">
            <img 
              src={`${image}`} 
              alt={image} 
              className="w-full h-full object-contain"
            />
          </div>

          {/* 상품 정보 */}
          <div className="flex-1">
            <div className="text-xl font-bold mb-1">{amount} 밥풀</div>
            <div className="text-gray-600 mb-1">{price} 원</div>
            <div className="text-gray-600 flex items-center justify-between">
              {/* <span>주문번호 : </span> */}
              <span>주문번호 : {accountNumber}</span>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        {/* <div className="flex justify-end mt-4">
          <button 
            className={`text-white px-4 py-2 rounded-lg text-sm ${
              isSuccess ? 'bg-green-500' : 'bg-orange'
            }`}
          >
            상세보기
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default PaymentHistoryItem; 
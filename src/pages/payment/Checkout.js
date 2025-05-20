import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import instance from '../../api/axiosInstance';

const Checkout = () => {
  const { state } = useLocation();
  const { amount, riceAmount, itemTitle } = state;
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 토스페이먼츠 SDK 스크립트 로드
    const script = document.createElement('script');
    script.src = 'https://js.tosspayments.com/v1/payment';
    script.async = true;
    
    script.onload = async () => {

     // 1. 백엔드에 결제 정보 요청
     const { data } = await instance.post(
        "/api/v1/payments/toss/request",
        {
          amount: amount,
          riceAmount: riceAmount
        }
      );
      // 토스페이먼츠 SDK 초기화
      // 개발 환경에서는 하드코딩된 테스트 키 사용
      const clientKey = 'test_ck_ZLKGPx4M3MR7vOEM9BBwVBaWypv1';
      
      if (!clientKey) {
        console.error('토스페이먼츠 클라이언트 키가 설정되지 않았습니다.');
        return;
      }

      const tossPayments = window.TossPayments(data.clientKey);

      // orderId 생성 (문자열)
      const timestamp = new Date().getTime().toString();
    //   const orderId = `RICE_${timestamp}`;

      // 결제 요청
      tossPayments.requestPayment('카드', {
        amount: data.amount,
        orderId: data.orderId,
        orderName: data.orderName,
        customerName: '고객님',
        successUrl: window.location.origin + '/payment/success',
        failUrl: window.location.origin + '/payment/fail',
      }).catch(error => {
        if (error.code === 'USER_CANCEL') {
          alert('결제가 취소되었습니다.');
          navigate('/shop');
        } else {
          alert('결제 중 오류가 발생했습니다.');
          console.error('결제 오류:', error);
        }
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);    
    };
  }, [amount, itemTitle]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">결제 처리 중...</h2>
        <p className="text-gray-600">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
};

export default Checkout;
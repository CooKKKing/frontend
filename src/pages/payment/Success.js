import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PaymentSuccessModal from '../../components/PaymentSuccessModal';
import instance from '../../api/axiosInstance';

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null); 

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const paymentKey = searchParams.get('paymentKey');
        const orderId = searchParams.get('orderId');
        const amount = Number(searchParams.get('amount'));

        // 백엔드 API 호출
        const response = await instance.post('/api/v1/payments/toss/confirm', {
          paymentKey,
          orderId,
          amount: amount
        });

        

        setPaymentInfo({
          paymentKey,
          amount: amount,
          riceAmount: amount / 100
        });

        setShowModal(true);

        console.log(" Toss 결제 성공", response);

        return response;
      } catch (error) {
        console.error('결제 확인 실패:', error);
        // 실패 페이지로 이동
        const errorMessage = error.response?.data?.message || '결제 처리 중 오류가 발생했습니다.';
        const errorCode = error.response?.data?.code || 'UNKNOWN';
        navigate(`/payment/fail?message=${errorMessage}&code=${errorCode}`);
      }
    };

    confirmPayment();
  }, [searchParams, navigate]);

  if (!paymentInfo) {
    return <div>결제 처리 중...</div>;
  }

  return (
    <PaymentSuccessModal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      paymentKey={paymentInfo.paymentKey}
      amount={paymentInfo.amount}
      riceAmount={paymentInfo.riceAmount}
    />
  );
};

export default Success;
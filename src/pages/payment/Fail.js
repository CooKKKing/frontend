import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Fail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleGoBack = () => {
    navigate('/shop');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">결제 실패</h2>
        <div className="space-y-4">
          <p className="text-center text-gray-600">
            결제 처리 중 문제가 발생했습니다.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">에러 메시지: {searchParams.get('message')}</p>
            <p className="text-sm text-gray-600">에러 코드: {searchParams.get('code')}</p>
          </div>
        </div>
        <button
          onClick={handleGoBack}
          className="mt-6 w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
        >
          쇼핑으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default Fail;
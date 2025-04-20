import React from 'react';
import PageTitle from '../../components/PageTitle';

const ShopMain = () => {
  return (
    <div>
      <PageTitle title="밥풀 상점" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-[30px] border border-border rounded-lg shadow-riceBox">
            <div className='flex flex-col items-center'>
                <img src={'/assets/images/rice/1.png'} alt="한 톨" className='w-[140px] h-[140px]' />
            </div>
            <div className='w-full flex flex-col items-center'>
                <h3 className="w-full text-center font-bold mb-2">한 톨</h3>
                <p className="w-full text-right text-gray-600">10 밥풀</p>
                <p className="w-full text-right text-gray-600">1000원</p>
            </div>
        </div>
        <div className="p-4 border border-border rounded-lg">
          <h3 className="font-bold mb-2">한 숟가락</h3>
          <p className="text-gray-600">25 밥풀</p>
        </div>
        <div className="p-4 border border-border rounded-lg">
          <h3 className="font-bold mb-2">한 공기</h3>
          <p className="text-gray-600">50 밥풀</p>
        </div>
        <div className="p-4 border border-border rounded-lg">
          <h3 className="font-bold mb-2">한 밥솥</h3>
          <p className="text-gray-600">75 밥풀</p>
        </div>
        <div className="p-4 border border-border rounded-lg">
          <h3 className="font-bold mb-2">한 포대</h3>
          <p className="text-gray-600">100 밥풀</p>
        </div>
      </div>
    </div>
  );
};

export default ShopMain; 
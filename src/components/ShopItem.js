import React from 'react';

const ShopItem = ({ image, title, riceCount, price }) => {
  return (
    <div className="p-[30px] border border-border rounded-lg shadow-riceBox">
      <div className='flex flex-col items-center'>
        <img src={image} alt={title} className='w-[140px] h-[140px]' />
      </div>
      <div className='w-full flex flex-col items-center'>
        <h3 className="w-full text-center font-bold mb-2">{title}</h3>
        <p className="w-full text-right text-gray-600">{riceCount} 밥풀</p>
        <p className="w-full text-right text-gray-600">{price}원</p>
      </div>
    </div>
  );
};

export default ShopItem; 
import React from 'react';
import PageTitle from '../../components/PageTitle';
import ShopItem from '../../components/ShopItem';

const ShopMain = () => {
  const shopItems = [
    {
      image: '/assets/images/rice/1.png',
      title: '한 톨',
      riceCount: 10,
      price: 1000
    },
    {
      image: '/assets/images/rice/2.png',
      title: '한 숟가락',
      riceCount: 25,
      price: 2500
    },
    {
      image: '/assets/images/rice/3.png',
      title: '한 공기',
      riceCount: 50,
      price: 5000
    },
    {
      image: '/assets/images/rice/4.png',
      title: '한 밥솥',
      riceCount: 75,
      price: 7500
    },
    {
      image: '/assets/images/rice/5.png',
      title: '한 포대',
      riceCount: 100,
      price: 10000
    }
  ];

  return (
    <div>
      <PageTitle title="밥풀 상점" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {shopItems.map((item, index) => (
          <ShopItem
            key={index}
            image={item.image}
            title={item.title}
            riceCount={item.riceCount}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopMain; 
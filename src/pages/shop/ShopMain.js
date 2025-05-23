import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import ShopItem from '../../components/ShopItem';
import { riceAllList } from '../../api/queries/shopService';

const ShopMain = () => {
  const [shopItems, setShopItems] = useState([]);

  useEffect(() =>  {
    const fetchShopItems = async () => {
    try{
      const data = await riceAllList();
      setShopItems(data);
      return data;
    }catch(e){
      console.log(e);
    }
    }
    fetchShopItems();
  },[])

  return (
    <div>
      <PageTitle title="밥풀 상점" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {shopItems.map((item) => (
          <ShopItem
            key={item.paymentMasterId}
            image={item.image}
            title={item.name}
            riceCount={item.riceAmount}
            price={item.amount}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopMain; 
import React, { useEffect, useState } from 'react';
import PaymentHistoryItem from '../../components/PaymentHistoryItem';
import PageTitle from '../../components/PageTitle';
import { shopPayHistoryList } from '../../api/queries/shopService';

const ShopHistory = () => {
  const [historyItems, setHistoryItems] = useState([]);

  useEffect(()=> {
    const fetchHistoryItems = async () => {
      try{
        const data = await shopPayHistoryList();
        setHistoryItems(data);
        return data;
      }catch(e){
        console.log(e);
      }
    }

    fetchHistoryItems();
  },[])

  return (
    <div>
      <PageTitle title="결제 내역" />
      <div className="space-y-4">
        {historyItems.map((item, idx) => (
          <PaymentHistoryItem
            key={idx}
            date={item.completedAt}
            amount={item.riceAmount}
            price={item.amount}
            // type={item.type}
            image={item.riceImage}
            accountNumber={item.orderId}
            status={item.paymentStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopHistory; 
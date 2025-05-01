import React, { useState } from 'react';
import PaymentHistoryItem from '../../components/PaymentHistoryItem';
import PageTitle from '../../components/PageTitle';

const ShopHistory = () => {
  // 임시 데이터
  const [historyItems] = useState([
    {
      id: 1,
      type: '1',
      amount: '10밥풀',
      price: '1000원',
      date: '2025.05.01',
      bank: 'Toss Pay',
      accountNumber: '1002-***-******',
      status: 'success'
    },
    // {
    //   id: 2,
    //   type: '1',
    //   amount: '50밥풀',
    //   price: '5000원',
    //   date: '2025.10.10',
    //   bank: '우리은행',
    //   accountNumber: '1002-***-******',
    //   status: 'fail'
    // }
  ]);

  return (
    <div>
      <PageTitle title="결제 내역" />
      <div className="space-y-4">
        {historyItems.map((item) => (
          <PaymentHistoryItem
            key={item.id}
            date={item.date}
            amount={item.amount}
            price={item.price}
            type={item.type}
            bank={item.bank}
            accountNumber={item.accountNumber}
            status={item.status}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopHistory; 
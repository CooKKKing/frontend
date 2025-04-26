import React from 'react';

const TabMenu = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 0, title: '최고의 요리사' },
    { id: 1, title: '인기 레시피' },
    { id: 2, title: '인기 도감' },
    { id: 3, title: '좋아요 누적' }
  ];

  return (
    <div className="flex w-full justify-between rounded-lg overflow-hidden border border-black">
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`w-full py-3 text-center cursor-pointer transition-colors duration-200 text-lg font-medium
            ${index !== tabs.length - 1 ? 'border-r border-black' : ''}
            ${activeTab === tab.id 
              ? 'bg-primary text-gray-700' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
        >
          {tab.title}
        </div>
      ))}
    </div>
  );
};

export default TabMenu;



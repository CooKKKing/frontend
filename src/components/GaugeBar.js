import React from 'react';

const GaugeBar = ({ current, total }) => {
  // 퍼센트 계산 (소수점 없이)
  const percentage = Math.floor((current / total) * 100);
  
  return (
    <div className="relative border border-gray-[#A4A4A4] h-8 rounded-full bg-[#ffffff] overflow-hidden">
      {/* 배경 게이지 */}
      <div 
        className="absolute h-full bg-[#CCECD6] rounded-full transition-all duration-300 ease-out"
        style={{ width: `${percentage}%` }}
      />
      
      {/* 텍스트 */}
      <div className="relative h-full flex items-center justify-center text-sm font-medium">
        <span className="text-gray-700">{`${current} / ${total}`}</span>
      </div>
    </div>
  );
};

export default GaugeBar; 
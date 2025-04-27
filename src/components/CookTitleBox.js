import React from 'react';
import { LEVEL_COLORS } from '../data/challengeData';

const CookTitleBox = ({ type, imagePath, level, boldName,name }) => {
  const colorClass = LEVEL_COLORS[level];

  return (
    <div className={`min-w-fit w-[150px] flex gap-[12px] justify-start items-center py-[6px] px-[15px] border rounded-[5px] ${colorClass}`}>
      <img 
        src={`${imagePath}`}
        alt={`${type} ${name}`}
        className="w-[28px] h-auto object-contain"
      />
      <div className="flex flex-col items-center">
        <h1 className="text-[19px] leading-[0.1px] whitespace-nowrap">
          <b>{boldName}</b>{name}
        </h1>
      </div>
    </div>
  );
};

export default CookTitleBox;

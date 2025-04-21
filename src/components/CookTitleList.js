import React from 'react';
import CookTitleBox from './CookTitleBox';
import { challengeData } from '../data/challengeData';

const CookTitleList = () => {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {Object.entries(challengeData).map(([key, category]) => (
        category.levels.map((levelInfo) => (
          <CookTitleBox
            key={`${key}-${levelInfo.level}`}
            type={category.type}
            imagePath={category.imagePath}
            level={levelInfo.level}
            boldName={levelInfo.boldName}
            name={levelInfo.name}
          />
        ))
      ))}
    </div>
  );
};

export default CookTitleList; 
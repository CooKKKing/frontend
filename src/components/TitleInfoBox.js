import React from 'react';
import CookTitleBox from './CookTitleBox';

const TitleInfoBox = ({ title, description, isAchieved }) => {
  return (
    <div
      className="border border-black rounded-lg p-4"
      style={{
        minWidth: 180,
        maxWidth: '100%',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <div className="flex justify-center mb-4">
        <CookTitleBox
          type={title.type}
          imagePath={title.imagePath}
          level={title.level}
          boldName={title.boldName}
          name={title.name}
        />
      </div>
      <div className="border-t border-gray-200 pt-4">
        <p className="text-center text-gray-700">{description}</p>
        <div className="text-center mt-2">
          <span className={`inline-block px-3 py-1 text-sm ${
            isAchieved 
              ? 'text-green-600' 
              : 'text-gray-500'
          }`}>
            {isAchieved ? '획득!' : '미획득'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TitleInfoBox; 
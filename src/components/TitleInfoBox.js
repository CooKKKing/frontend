import React from 'react';
import CookTitleBox from './CookTitleBox';

const TitleInfoBox = ({ title, description }) => {
  return (
    <div className="w-full border border-black rounded-lg p-4 mb-4">
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
      </div>
    </div>
  );
};

export default TitleInfoBox; 
import React from 'react';
import { profileImages, rankImages } from '../data/profileImages';

const Profile = ({ size = 'm', image, rank = 'none', onClick }) => {

  const sizeMap = {
    'xxs': {
      container: 'w-[30px] h-[30px]',
      crown: 'w-[40px] h-[40px] -top-5 -left-5 ',
      padding: 'p-3'
    },
    'xs': {
      container: 'w-[40px] h-[40px]',
      crown: 'w-[50px] h-[50px] -top-6 -left-6 ',
      padding: 'p-3'
    },
    's': {
      container: 'w-[50px] h-[50px]',
      crown: 'w-[50px] h-[50px] -top-5 -left-5 ',
      padding: 'p-4'
    },
    'm': {
      container: 'w-[60px] h-[60px]',
      crown: 'w-[60px] h-[60px] -top-6 -left-6 ',
      padding: 'p-4'
    },
    'l': {
      container: 'w-[70px] h-[70px]',
      crown: 'w-[70px] h-[70px] -top-8 -left-8 ',
      padding: 'p-4'
    }
  };
  
  const rankMap = {
    'none': {
      background: 'bg-transparent'
    },
    'gold': {
      background: 'bg-[#FFF4E0]'
    },
    'silver': {
      background: 'bg-gray-100'
    },
    'bronze': {
      background: 'bg-primary'
    }
  };

  const imgSrc = image ? image : profileImages[2];
  const rankImgSrc = rankImages[rank];

  return (
    <div 
      className={`relative inline-block ${sizeMap[size].padding} border-2 border-dashed border-border rounded-full ${rankMap[rank]?.background}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className={`rounded-full ${sizeMap[size].container}`}>
        <img 
          src={imgSrc} 
          alt="profile" 
          className="w-full h-full object-cover"
        />
      </div>
      {rank !== 'none' && (
        <img 
          src={rankImgSrc} 
          alt="crown"
          className={`absolute ${sizeMap[size].crown} z-20`}
        />
      )}
    </div>
  );
};

export default Profile;


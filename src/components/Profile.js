import React from 'react';
import { profileImages, rankImages } from '../data/profileImages';

const Profile = ({ size = 'm', image, rank }) => {

  const sizeMap = {
    's': {
      container: 'w-[50px] h-[50px]',
      crown: 'w-[50px] h-[50px] -top-5 -left-5 '
    },
    'm': {
      container: 'w-[60px] h-[60px]',
      crown: 'w-[60px] h-[60px] -top-6 -left-6 '
    },
    'l': {
      container: 'w-[70px] h-[70px]',
      crown: 'w-[70px] h-[70px] -top-8 -left-8 '
    }
  };
  
  const rankMap = {
    'none': '',
    'gold': {
      background: 'bg-[#FFF4E0]',
    },
    'silver': {
      background: 'bg-gray-100',
    },
    'bronze': {
      background: 'bg-primary',
    }
  }

  const imgSrc = image ? image : profileImages[2];
  const rankImgSrc = rankImages[rank];

  return (
    <div className={`relative inline-block p-4 border-2 border-dashed border-border rounded-full ${ rank !== 'none' ? rankMap[rank].background : ''}`}>
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
          className={`absolute ${sizeMap[size].crown}  z-20`}
        />
      )}
    </div>
  );
};

export default Profile;


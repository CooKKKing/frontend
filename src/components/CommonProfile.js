import React from 'react';
import Profile from './Profile';         // 경로 확인
import { FaCrown } from 'react-icons/fa'; // crown 아이콘 사용

const CommonProfile = ({
  profileId,
  name,
  badgeText,
}) => {
  return (
    <div className="flex items-center border rounded-[10px] px-4 py-2 w-fit bg-white min-w-[270px]">
      {/* 프로필 */}
      <Profile size="m" imageId={profileId} rank="none" />
      {/* 정보 영역 */}
      <div className="ml-4 flex flex-col">
        {/* 이름 */}
        <div className="text-[19px] font-medium mb-1">{name}</div>
        {/* 배지 */}
        <div className="flex items-center bg-[#F9C7C4] rounded-[5px] px-2 py-[2px] w-fit">
          <FaCrown className="text-[#CDAA62] mr-1 text-[14px]" />
          <span className="text-[14px] font-medium text-[#5A3A2B]">{badgeText}</span>
        </div>
      </div>
    </div>
  );
};

export default CommonProfile;

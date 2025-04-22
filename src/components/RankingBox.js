// components/RankingBox.jsx
import React from 'react';
import Profile from './Profile';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import useIsMobile from '../hooks/useIsMobile';

const rankMap = {
  1: 'gold',
  2: 'silver',
  3: 'bronze',
};

const RankingBox = ({
  rank,
  nickname,
  imageId,
  score,
  diff,
}) => {
  const { isMobile, isTablet } = useIsMobile();
  const isTop3 = rank <= 3;
  const profileRank = isTop3 ? rankMap[rank] : 'none';
  const isTabletOrAbove = !isMobile && !isTablet; // 1280px 초과(데스크탑)

  // 아이콘 및 색상 분기
  let icon = null;
  let diffDisplay = null;

  if (diff > 0) {
    icon = <FaCaretUp className="text-[#A94438] text-base mr-1" />;
    diffDisplay = <span className="text-[#A94438] font-semibold text-lg">{diff}</span>;
  } else if (diff < 0) {
    icon = <FaCaretDown className="text-blue-500 text-base mr-1" />;
    diffDisplay = <span className="text-blue-500 font-semibold text-lg">{Math.abs(diff)}</span>;
  } else {
    // 변동 없음
    icon = null;
    diffDisplay = <span className="text-black font-semibold text-lg">-</span>;
  }

  if (isTop3) {
    return (
      <div
        className={`
          flex items-center rounded-2xl  px-3 py-4 w-full min-w-min mb-6
          ${rank === 1 ? "border-2 border-yellow-500"  : rank === 2 ? "border-2 border-gray-500" : "border-2 border-yellow-700"}
          ${isTabletOrAbove ? '' : 'mx-auto justify-center max-w-xs'}
        `}
        style={isTabletOrAbove ? {} : { maxWidth: 350 }}
      >
        {/* 순위 번호 */}
        <span className="font-bold text-xl mr-5 w-6 text-right text-black">{rank}</span>
        <Profile size="s" imageId={imageId} rank={profileRank} />
        {/* 수정: 닉네임+score를 하나의 flex row로 묶고, min-w-0 추가 */}
        <div className={`ml-4 flex-1 flex items-center gap-2 min-w-0`}>
          <span
            className="font-medium text-lg truncate min-w-0"
            style={{ maxWidth: '100px' }} // 필요시 조정
          >
            {nickname}
          </span>
          <span className="font-bold text-2xl w-12 text-center">{score}</span>
        </div>
        <div className={`flex items-center ml-4`}>
          {icon}
          {diffDisplay}
        </div>
      </div>
    );
  }

  // 4~10등: 닉네임+score를 하나의 flex row로 묶고, min-w-0 추가
  return (
    <div className={`flex items-center justify-between py-3 ${rank === 10 ? '' : 'border-b border-black'}`}>
      {/* 순위 번호 */}
      <span className="font-bold text-xl mr-5 w-6 text-right text-black">{rank}</span>
      <div className="flex items-center flex-1 min-w-0">
        <Profile size="s" imageId={imageId} rank="none" />
        {/* 수정: 닉네임+score를 하나의 flex row로 묶고, min-w-0 추가 */}
        <div className="flex items-center ml-5 gap-2 min-w-0">
          <span
            className="font-medium text-base truncate min-w-0"
            style={{ maxWidth: '80px' }} // 필요시 조정
          >
            {nickname}
          </span>
          <span className="font-bold text-xl w-12 text-center">{score}</span>
        </div>
      </div>
      <div className="flex items-center" style={{ minWidth: '48px', justifyContent: 'center' }}>
        {icon}
        {diffDisplay}
      </div>
    </div>
  );
};

export default RankingBox;

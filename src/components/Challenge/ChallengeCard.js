import React from 'react';
import GaugeBar from '../GaugeBar';
import { useToast } from '../../hooks/useToast';

const ChallengeCard = ({ challenge, onLevelUp }) => {
  const progress = (challenge.current / challenge.total) * 100;
  const isCompleted = challenge.current >= challenge.total;
  const { showToast } = useToast();

  const handleLevelUp = () => {
    onLevelUp();
    showToast(`축하합니다! "${challenge.type} ${challenge.level + 1}단계" 칭호를 획득하셨습니다!`, "success");
  };

  return (
    <div className="w-full relative">
      {/* 타이틀 */}
      <div className="border border-black rounded-lg p-1 mb-4 bg-[#FFE6D1]">
        <h3 className="text-center text-lg">{challenge.type}</h3>
      </div>

      {/* 이미지 */}
      <div className="w-[140px] h-[140px] mx-auto mb-4">
        <img
          src={`${challenge.imagePath}/${challenge.level}.png`}
          alt={`${challenge.type} Level ${challenge.level}`}
          className="w-full h-full object-contain"
        />
      </div>

      {/* 진행도 */}
      <div className="mb-4">
        <div className="text-sm">진행도</div>
        <GaugeBar current={challenge.current} total={challenge.total} />
      </div>

      {/* 레벨 정보 */}
      <div className="text-sm space-y-1">
        <div>레벨 : {challenge.level || 1}</div>
        <div>도전과제 : {challenge.description}</div>
      </div>

      {/* 완료 오버레이 및 레벨업 버튼 */}
      {isCompleted && challenge.level < challenge.maxLevel && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
          <button
            onClick={handleLevelUp}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors"
          >
            레벨 업!
          </button>
        </div>
      )}
    </div>
  );
};

export default ChallengeCard; 
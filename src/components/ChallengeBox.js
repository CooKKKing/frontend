import React from 'react';
import GaugeBar from './GaugeBar';

const ChallengeBox = ({ type, challenges }) => {
  return (
    <div className="w-full border border-black rounded-lg p-4 mb-6">
      {/* Type 표시 */}
      <div className="mb-4">
        <h2 className="text-xl font-bold border inline-block px-4 py-1 rounded-md">{type}</h2>
      </div>

      {/* 도전과제 레벨 컨테이너 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenges.map((challenge, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* 이미지 */}
            <div className="w-[140px] h-[140px] mb-3 relative">
              <img
                src={`${challenge.imagePath}/${challenge.level}.png`}
                alt={`${type} Level ${challenge.level}`}
                className="w-full h-full object-contain"
              />
            </div>

            {/* 게이지바 */}
            <div className="w-full mb-2">
              <GaugeBar current={challenge.current} total={challenge.total} />
            </div>

            {/* 레벨 정보 */}
            <div className="text-center">
              <p className="text-sm text-gray-600">Lv.{challenge.level}</p>
              <p className="text-sm text-gray-600">{challenge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeBox; 
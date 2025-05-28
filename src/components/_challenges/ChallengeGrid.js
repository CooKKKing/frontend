import React from 'react';
import ChallengeCard from './ChallengeCard';

const ChallengeGrid = ({ challenges, onLevelUp, onMaxLevelAchieve }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.type + challenge.level}
          challenge={challenge}
          onLevelUp={onLevelUp}
          onMaxLevelAchieve={onMaxLevelAchieve}
        />
      ))}
    </div>
  );
};

export default ChallengeGrid; 
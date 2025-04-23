import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import ChallengeGrid from '../../components/Challenge/ChallengeGrid';
import { challengeData } from '../../data/challengeData';

const Challenges = () => {
  // localStorage에서 도전과제 데이터를 가져오거나 초기화
  const [challenges, setChallenges] = useState(() => {
    const saved = localStorage.getItem('challenges');
    if (saved) {
      return JSON.parse(saved);
    }
    // 초기 도전과제 데이터
    return [
      {
        type: challengeData.korean.type,
        level: 1,
        imagePath: challengeData.korean.imagePath,
        maxLevel: challengeData.korean.maxLevel,
        current: 10,
        total: 10,
        description: '한식요리 10가지 조리'
      },
      {
        type: challengeData.japanese.type,
        level: 1,
        imagePath: challengeData.japanese.imagePath,
        maxLevel: challengeData.japanese.maxLevel,
        current: 3,
        total: 10,
        description: '일식요리 10가지 조리'
      },
      {
        type: challengeData.chinese.type,
        level: 1,
        imagePath: challengeData.chinese.imagePath,
        maxLevel: challengeData.chinese.maxLevel,
        current: 5,
        total: 10,
        description: '중식요리 10가지 조리'
      },
      {
        type: challengeData.western.type,
        level: 1,
        imagePath: challengeData.western.imagePath,
        maxLevel: challengeData.western.maxLevel,
        current: 2,
        total: 10,
        description: '양식요리 10가지 조리'
      },
      {
        type: challengeData.like.type,
        level: 1,
        imagePath: challengeData.like.imagePath,
        maxLevel: challengeData.like.maxLevel,
        current: 20,
        total: 10,
        description: '좋아요 10개 받기'
      },
      {
        type: challengeData.bookmark.type,
        level: 1,
        imagePath: challengeData.bookmark.imagePath,
        maxLevel: challengeData.bookmark.maxLevel,
        current: 15,
        total: 10,
        description: '북마크 10개 달성'
      },
      {
        type: challengeData.recipe.type,
        level: 1,
        imagePath: challengeData.recipe.imagePath,
        maxLevel: challengeData.recipe.maxLevel,
        current: 30,
        total: 10,
        description: '레시피 10개 등록'
      }
    ];
  });

  // 도전과제 데이터가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('challenges', JSON.stringify(challenges));
    
    // 도전과제 달성 상태를 업데이트
    const achievedChallenges = {};
    challenges.forEach(challenge => {
      achievedChallenges[challenge.type.toLowerCase()] = challenge.level;
    });
    localStorage.setItem('achievedChallenges', JSON.stringify(achievedChallenges));
  }, [challenges]);

  const handleLevelUp = (type, currentLevel) => {
    setChallenges(prevChallenges =>
      prevChallenges.map(challenge =>
        challenge.type === type
          ? {
              ...challenge,
              level: currentLevel + 1,
              current: 0,
              total: challenge.total + 5,
              description: `${type} ${challenge.total + 5}가지 조리`
            }
          : challenge
      )
    );
  };

  return (
    <div className="p-4">
      <PageTitle title="도전과제" />
      <div className="max-w-6xl mx-auto">
        <ChallengeGrid
          challenges={challenges}
          onLevelUp={handleLevelUp}
        />
      </div>
    </div>
  );
};

export default Challenges; 
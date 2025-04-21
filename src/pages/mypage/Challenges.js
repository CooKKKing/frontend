import React from 'react';
import PageTitle from '../../components/PageTitle';
import ChallengeBox from '../../components/ChallengeBox';
import { challengeData } from '../../data/challengeData';

const Challenges = () => {
  // 한식 도전과제 데이터 예시
  const koreanChallenges = [
    {
      level: 1,
      imagePath: challengeData.korean.imagePath,
      current: 3, // 현재 진행도
      total: 5,   // 목표
      description: '한식요리 5가지 조리'
    },
    {
      level: 2,
      imagePath: challengeData.korean.imagePath,
      current: 4,
      total: 10,
      description: '한식요리 10가지 조리'
    },
    {
      level: 3,
      imagePath: challengeData.korean.imagePath,
      current: 8,
      total: 15,
      description: '한식요리 15가지 조리'
    }
  ];

  // 일식 도전과제 데이터 예시
  const japaneseChallenges = [
    {
      level: 1,
      imagePath: challengeData.japanese.imagePath,
      current: 2,
      total: 5,
      description: '일식요리 5가지 조리'
    },
    {
      level: 2,
      imagePath: challengeData.japanese.imagePath,
      current: 6,
      total: 10,
      description: '일식요리 10가지 조리'
    },
    {
      level: 3,
      imagePath: challengeData.japanese.imagePath,
      current: 12,
      total: 15,
      description: '일식요리 15가지 조리'
    }
  ];

  return (
    <div className="p-4">
      <PageTitle title="도전과제" />
      <div className="max-w-4xl mx-auto">
        <ChallengeBox type="한식" challenges={koreanChallenges} />
        <ChallengeBox type="일식" challenges={japaneseChallenges} />
      </div>
    </div>
  );
};

export default Challenges; 
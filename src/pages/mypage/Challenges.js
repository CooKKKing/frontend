import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import ChallengeGrid from '../../components/challenge/ChallengeGrid';
import { challengeData } from '../../data/challengeData';
import { getChallenges } from '../../api/queries/challengeService';

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await getChallenges();
        // 변환 로직 추가
        const challengesArray = Array.isArray(data)
          ? data.map(item => ({
              type: item.category,
              level: item.currentLevel,
              imagePath: item.imagePath,
              maxLevel: item.maxLevel, // 필요에 따라 수정
              current: item.currentCount,
              total: item.goalCount,
              description: item.description,
              achieved: item.achieved, // 필요에 따라 수정
            }))
          : [];
        setChallenges(challengesArray);
        setLoading(false);
      } catch (err) {
        setError('도전과제 데이터를 불러오는데 실패했습니다.');
        setLoading(false);
        console.error('Error fetching challenges:', err);
      }
    };

    fetchChallenges();
  }, []);

  const handleLevelUp = (type, currentLevel) => {
    setChallenges(prevChallenges =>
      prevChallenges.map(challenge => {
        if (challenge.type !== type) return challenge;

        const nextLevel = currentLevel + 1;
        const isMaxLevel = nextLevel === challenge.maxLevel;

        return {
          ...challenge,
          level: nextLevel,
          current: challenge.current,
          total: challenge.total + 5,
          description: `${type} ${challenge.total + 5}가지 조리`,
          achieved: isMaxLevel ? false : challenge.achieved
        };
      })
    );
  };

  const handleMaxLevelAchieve = (type) => {
    setChallenges(prevChallenges =>
      prevChallenges.map(challenge =>
        challenge.type === type
          ? { ...challenge, achieved: true }
          : challenge
      )
    );
  };

  if (loading) {
    return <div className="p-4">로딩 중...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <>
      <PageTitle title="도전과제" />
      <div className="max-w-6xl mx-auto">
        <ChallengeGrid
          challenges={challenges}
          onLevelUp={handleLevelUp}
          onMaxLevelAchieve={handleMaxLevelAchieve}
        />
      </div>
    </>
  );
};

export default Challenges; 
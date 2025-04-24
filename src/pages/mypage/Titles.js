import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import TitleInfoBox from '../../components/TitleInfoBox';
import TitleRadioButtons from '../../components/TitleRadioButtons';
import { challengeData } from '../../data/challengeData';

//칭호 페이지지
const Titles = () => {
  const [selectedFilter, setSelectedFilter] = useState('전체');
  
  // 도전과제 달성 상태를 localStorage에서 가져옴
  const [achievedChallenges, setAchievedChallenges] = useState(() => {
    const saved = localStorage.getItem('achievedChallenges');
    return saved ? JSON.parse(saved) : {
      한식: 0,
      일식: 0,
      중식: 0,
      양식: 0,
      인기: 0,
      북마크: 0,
      도감: 0
    };
  });

  // localStorage에서 도전과제 상태 변경 감지
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('achievedChallenges');
      if (saved) {
        setAchievedChallenges(JSON.parse(saved));
      }
    };

    // 초기 상태 로드
    handleStorageChange();

    // storage 이벤트 리스너 등록
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 모든 칭호 정보
  const allTitles = [
    // 한식 칭호
    {
      title: {
        type: challengeData.korean.type,
        imagePath: challengeData.korean.imagePath,
        level: 1,
        boldName: '한',
        name: '식 초보'
      },
      description: '한식요리 5가지 조리',
      category: '한식'
    },
    {
      title: {
        type: challengeData.korean.type,
        imagePath: challengeData.korean.imagePath,
        level: 2,
        boldName: '한',
        name: '식 중수'
      },
      description: '한식요리 10가지 조리',
      category: '한식'
    },
    {
      title: {
        type: challengeData.korean.type,
        imagePath: challengeData.korean.imagePath,
        level: 3,
        boldName: '한',
        name: '식 고수'
      },
      description: '한식요리 15가지 조리',
      category: '한식'
    },
    // 일식 칭호
    {
      title: {
        type: challengeData.japanese.type,
        imagePath: challengeData.japanese.imagePath,
        level: 1,
        boldName: '일',
        name: '식 초보'
      },
      description: '일식요리 5가지 조리',
      category: '일식'
    },
    {
      title: {
        type: challengeData.japanese.type,
        imagePath: challengeData.japanese.imagePath,
        level: 2,
        boldName: '일',
        name: '식 중수'
      },
      description: '일식요리 10가지 조리',
      category: '일식'
    },
    {
      title: {
        type: challengeData.japanese.type,
        imagePath: challengeData.japanese.imagePath,
        level: 3,
        boldName: '일',
        name: '식 고수'
      },
      description: '일식요리 15가지 조리',
      category: '일식'
    },
    // 중식 칭호
    {
      title: {
        type: challengeData.chinese.type,
        imagePath: challengeData.chinese.imagePath,
        level: 1,
        boldName: '중',
        name: '식 초보'
      },
      description: '중식요리 5가지 조리',
      category: '중식'
    },
    {
      title: {
        type: challengeData.chinese.type,
        imagePath: challengeData.chinese.imagePath,
        level: 2,
        boldName: '중',
        name: '식 중수'
      },
      description: '중식요리 10가지 조리',
      category: '중식'
    },
    {
      title: {
        type: challengeData.chinese.type,
        imagePath: challengeData.chinese.imagePath,
        level: 3,
        boldName: '중',
        name: '식 고수'
      },
      description: '중식요리 15가지 조리',
      category: '중식'
    },
    // 양식 칭호
    {
      title: {
        type: challengeData.western.type,
        imagePath: challengeData.western.imagePath,
        level: 1,
        boldName: '양',
        name: '식 초보'
      },
      description: '양식요리 5가지 조리',
      category: '양식'
    },
    {
      title: {
        type: challengeData.western.type,
        imagePath: challengeData.western.imagePath,
        level: 2,
        boldName: '양',
        name: '식 중수'
      },
      description: '양식요리 10가지 조리',
      category: '양식'
    },
    {
      title: {
        type: challengeData.western.type,
        imagePath: challengeData.western.imagePath,
        level: 3,
        boldName: '양',
        name: '식 고수'
      },
      description: '양식요리 15가지 조리',
      category: '양식'
    },
    // 좋아요 칭호
    {
      title: {
        type: challengeData.like.type,
        imagePath: challengeData.like.imagePath,
        level: 1,
        boldName: '인',
        name: '기 쟁이'
      },
      description: '좋아요 10개 받기',
      category: '인기'
    },
    {
      title: {
        type: challengeData.like.type,
        imagePath: challengeData.like.imagePath,
        level: 2,
        boldName: '인',
        name: '기 스타'
      },
      description: '좋아요 20개 받기',
      category: '인기'
    },
    {
      title: {
        type: challengeData.like.type,
        imagePath: challengeData.like.imagePath,
        level: 3,
        boldName: '인',
        name: '기 쟁이'
      },
      description: '좋아요 30개 받기',
      category: '인기'
    },
    // 북마크 칭호
    {
      title: {
        type: challengeData.bookmark.type,
        imagePath: challengeData.bookmark.imagePath,
        level: 1,
        boldName: '북',
        name: '마크'
      },
      description: '북마크 10개 달성',
      category: '북마크'
    },
    {
      title: {
        type: challengeData.bookmark.type,
        imagePath: challengeData.bookmark.imagePath,
        level: 2,
        boldName: '북',
        name: '마크'
      },
      description: '북마크 20개 달성',
      category: '북마크'
    },
    {
      title: {
        type: challengeData.bookmark.type,
        imagePath: challengeData.bookmark.imagePath,
        level: 3,
        boldName: '북',
        name: '마크'
      },
      description: '북마크 30개 달성',
      category: '북마크'
    },
    // 도감 칭호
    {
      title: {
        type: challengeData.recipe.type,
        imagePath: challengeData.recipe.imagePath,
        level: 1,
        boldName: '도',
        name: '감 초보'
      },
      description: '레시피 10개 등록',
      category: '도감'
    },
    {
      title: {
        type: challengeData.recipe.type,
        imagePath: challengeData.recipe.imagePath,
        level: 2,
        boldName: '도',
        name: '감 중수'
      },
      description: '레시피 20개 등록',
      category: '도감'
    },
    {
      title: {
        type: challengeData.recipe.type,
        imagePath: challengeData.recipe.imagePath,
        level: 3,
        boldName: '도',
        name: '감 고수'
      },
      description: '레시피 30개 등록',
      category: '도감'
    }
  ];

  // 칭호 필터링
  const filteredTitles = allTitles.filter(title => {
    const achievedLevel = achievedChallenges[title.category] || 0;
    // 현재 레벨이 아닌 이전 레벨의 칭호를 획득
    const isAchieved = title.title.level < achievedLevel;

    switch (selectedFilter) {
      case '보유':
        return isAchieved;
      case '미보유':
        return !isAchieved;
      default: // '전체'
        return true;
    }
  });

  return (
    <div className="p-4">
      <PageTitle title="칭호" />
      <div className="max-w-7xl mx-auto">
        <TitleRadioButtons
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTitles.map((info, index) => {
            const achievedLevel = achievedChallenges[info.category] || 0;
            // 현재 레벨이 아닌 이전 레벨의 칭호를 획득
            const isAchieved = info.title.level < achievedLevel;
            
            return (
              <TitleInfoBox
                key={index}
                title={info.title}
                description={info.description}
                isAchieved={isAchieved}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Titles; 
export const CHALLENGE_TYPES = {
  RICE: '쌀',
  LIKE: '인기',
  BOOKMARK: '북마크',
  RECIPE: '도감',
  KOREAN: '한식',
  JAPANESE: '일식',
  CHINESE: '중식',
  WESTERN: '양식',
  RANK: '랭킹'
//   ETC: '기타'
};

export const LEVEL_NAMES = {
  BEGINNER: '한톨',
  INTERMEDIATE: '숟가락',
  ADVANCED: '그릇',
  EXPERT: '솥',
  MASTER: '포대',
  DEFAULT: '초보자',
  RANK_FIRST: '랭킹',
  RANK_SECOND: '랭킹',
  RANK_THIRD: '랭킹'
};

export const LEVEL_COLORS = {
  1: 'bg-white border-black',
  2: 'bg-primary border-black',
  3: 'bg-pink border-black',
  4: 'bg-green-light border-black',
  5: 'bg-challenge-gradient border-black',
  'rank1': 'bg-[#FFF4E0] border-black',
  'rank2': 'bg-[#F5F5F5] border-black',
  'rank3': 'bg-[#FFE6D1] border-black',
  'none': 'bg-white border-black'
};

export const challengeData = {
  rice: {
    type: CHALLENGE_TYPES.RICE,
    maxLevel: 5,
    imagePath: '/assets/images/rice',
    levels: [
      { level: 1, name: LEVEL_NAMES.BEGINNER, boldName: '쌀 ' },
      { level: 2, name: LEVEL_NAMES.INTERMEDIATE, boldName: '한 ' },
      { level: 3, name: LEVEL_NAMES.ADVANCED, boldName: '한 ' },
      { level: 4, name: LEVEL_NAMES.EXPERT, boldName: '한 ' },
      { level: 5, name: LEVEL_NAMES.MASTER, boldName: '한 ' }
    ]
  },
  like: {
    type: CHALLENGE_TYPES.LIKE,
    maxLevel: 3,
    imagePath: '/assets/images/challenge/like',
    levels: [
      { level: 1, boldName: '인', name: '기 쟁이' },
      { level: 2, boldName: '인', name: '기 스타' },
      { level: 3, boldName: '인', name: '기 쟁이' }
    ]
  },
  bookmark: {
    type: CHALLENGE_TYPES.BOOKMARK,
    maxLevel: 3,
    imagePath: '/assets/images/challenge/bookmark',
    levels: [
      { level: 1, boldName: '북', name: '마크' },
      { level: 2, boldName: '북', name: '마크' },
      { level: 3, boldName: '북', name: '마크' }
    ]
  },
  recipe: {
    type: CHALLENGE_TYPES.RECIPE,
    maxLevel: 3,
    imagePath: '/assets/images/challenge/recipe',
    levels: [
      { level: 1, boldName: '도', name: '감 초보' },
      { level: 2, boldName: '도', name: '감 중수' },
      { level: 3, boldName: '도', name: '감 고수' }
    ]
  },
  korean: {
    type: CHALLENGE_TYPES.KOREAN,
    maxLevel: 3,
    imagePath: '/assets/images/challenge/korean',
    levels: [
      { level: 1, boldName: '한', name: '식 초보' },
      { level: 2, boldName: '한', name: '식 중수' },
      { level: 3, boldName: '한', name: '식 고수' }
    ]
  },
  japanese: {
    type: CHALLENGE_TYPES.JAPANESE,
    maxLevel: 3,
    imagePath: '/assets/images/challenge/japanese',
    levels: [
      { level: 1, boldName: '일', name: '식 초보' },
      { level: 2, boldName: '일', name: '식 중수' },
      { level: 3, boldName: '일', name: '식 고수' }
    ]
  },
  chinese: {
    type: CHALLENGE_TYPES.CHINESE,
    maxLevel: 3,
    imagePath: '/assets/images/challenge/chinese',
    levels: [
      { level: 1, boldName: '중', name: '식 초보' },
      { level: 2, boldName: '중', name: '식 중수' },   
      { level: 3, boldName: '중', name: '식 고수' }
    ]
  },
  western: {
    type: CHALLENGE_TYPES.WESTERN,
    maxLevel: 3,
    imagePath: '/assets/images/challenge/western',
    levels: [
      { level: 1, boldName: '양', name: '식 초보' },
      { level: 2, boldName: '양', name: '식 중수' },
      { level: 3, boldName: '양', name: '식 고수' }
    ]
  },
  rank: {
    type: CHALLENGE_TYPES.RANK,
    maxLevel: 3,
    imagePath: '/assets/images/challenge/rank',
    levels: [
      { level: 'gold', boldName: '1 ', name: LEVEL_NAMES.RANK_FIRST },
      { level: 'silver', boldName: '2 ', name: LEVEL_NAMES.RANK_SECOND },
      { level: 'bronze', boldName: '3 ', name: LEVEL_NAMES.RANK_THIRD }
    ]
  },
  basic: {
    type: 'basic',  
    maxLevel: 1,
    imagePath: '/assets/images/challenge/basic',
    levels: [
      { level: 'basic', boldName: '', name: LEVEL_NAMES.DEFAULT }
    ]
  }
//   etc: {
//     type: CHALLENGE_TYPES.ETC,  
  
}; 
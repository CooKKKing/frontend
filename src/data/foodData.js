import { foodImages } from './foodImages';

// 재료 데이터
export const ingredients = {
  main: [
    '돼지고기', '소고기', '닭고기', '생선', '오징어', '새우',
    '쌀', '밀가루', '계란', '두부',
    '양파', '마늘', '당근', '감자', '고추', '파', '버섯', '브로콜리',
    '김치', '배추', '무', '콩나물', '시금치', '호박', '가지',
    '떡', '어묵', '면', '당면', '우동면'
  ],
  sub: [
    '고추장', '된장', '간장', '소금', '설탕', '참기름',
    '고춧가루', '후추', '식용유', '올리브유',
    '굴소스', '물엿', '다진마늘', '맛술', '식초',
    '케첩', '마요네즈', '와사비', '겨자'
  ]
};

export const foodItems = [
  {
    id: 1,
    menuName: "매콤한 닭볶음탕",
    title: "매콤달콤한 닭볶음탕 만들기 레시피 공유합니다~",
    image: foodImages[1], 
    category: "한식",
    ingredients: {
      main: [2, 13, 12, 10], // 닭고기, 감자, 당근, 양파
      sub: [0, 2, 12, 6] // 고추장, 간장, 다진마늘, 고춧가루
    },
    likes: 1,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 2,
    menuName: "김치찌개",
    title: "초간단 김치찌개 만들기 신입 자취생도 가능!",
    image: foodImages[2],
    category: "한식",
    ingredients: {
      main: [18, 0, 9, 15], // 김치, 돼지고기, 두부, 파
      sub: [6, 2, 12] // 고춧가루, 간장, 다진마늘
    },
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 3,
    menuName: "된장찌개",
    title: "건강한 된장찌개 레시피",
    image: foodImages[3],
    category: "한식",
    ingredients: {
      main: [1, 9, 13, 10], // 된장, 두부, 감자, 양파
      sub: [14, 15] // 고추, 대파
    },
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 4,
    menuName: "불고기",
    title: "달달한 불고기 만들기",
    image: foodImages[4],
    category: "한식",
    ingredients: {
      main: [1, 10, 12, 19], // 소고기, 양파, 당근, 배
      sub: [2, 4] // 간장, 설탕
    },
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 5,
    menuName: "비빔밥",
    title: "영양만점 비빔밥 레시피",
    image: foodImages[5],
    category: "한식",
    ingredients: {
      main: [6, 12, 20, 21, 22], // 밥, 당근, 오이, 고사리, 도라지
      sub: [0] // 고추장
    },
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 6,
    menuName: "짜장면",
    title: "본격 중국집 스타일 짜장면",
    image: foodImages[6],
    category: "한식",
    ingredients: {
      main: [27, 28, 0, 10, 13], // 중면, 춘장, 돼지고기, 양파, 감자
      sub: [6] // 고춧가루
    },
    likes: 10,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 7,
    menuName: "초밥",
    title: "집에서 만드는 연어초밥",
    image: foodImages[7],
    category: "일식",
    ingredients: {
      main: [6, 3, 17, 23, 24], // 쌀, 연어, 와사비, 단무지, 김
      sub: [18] // 김가루
    },
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 8,
    menuName: "파스타",
    title: "깔끔한 토마토 파스타",
    image: foodImages[8],
    category: "양식",
    ingredients: {
      main: [27, 29, 11, 10], // 스파게티면, 토마토소스, 마늘, 양파
      sub: [9] // 올리브오일
    },
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 9,
    menuName: "떡볶이",
    title: "매콤달콤 국민간식 떡볶이",
    image: foodImages[9],
    category: "분식",
    ingredients: {
      main: [25, 26], // 떡, 어묵
      sub: [0, 4, 15] // 고추장, 설탕, 대파
    },
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 10,
    menuName: "떡볶이",
    title: "매콤달콤 국민간식 떡볶이",
    image: foodImages[10],
    category: "분식",
    ingredients: {
      main: [25, 26], // 떡, 어묵
      sub: [0, 4, 15] // 고추장, 설탕, 대파
    },
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 11,
    menuName: "떡볶이",
    title: "매콤달콤 국민간식 떡볶이",
    image: foodImages[11],
    category: "분식",
    ingredients: {
      main: [25, 26], // 떡, 어묵
      sub: [0, 4, 15] // 고추장, 설탕, 대파
    },
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  },   
  {
    id: 12,
    menuName: "떡볶이",
    title: "매콤달콤 국민간식 떡볶이",
    image: foodImages[12],  
    category: "분식",
    ingredients: {
      main: [25, 26], // 떡, 어묵
      sub: [0, 4, 15] // 고추장, 설탕, 대파
    },
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 13,
    menuName: "김밥",
    title: "김밥 만들기",
    image: foodImages[13],
    category: "분식",
    ingredients: {
      main: [24, 6], // 김, 밥
      sub: [8, 15, 15] // 계란, 파, 대파
    },
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  },    
  {
    id: 14,
    menuName: "콩나물 밥",
    title: "콩나물 밥 만들기",
    image: foodImages[14],
    category: "한식",
    ingredients: {
      main: [21, 6], // 콩나물, 밥
      sub: [8, 15, 15] // 계란, 파, 대파
    },
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 15,
    menuName: "비지찌개",
    title: "비지찌개 만들기",
    image: foodImages[15],
    category: "한식",
    ingredients: {
      main: [30, 21], // 비지, 콩나물
      sub: [8, 15, 15] // 계란, 파, 대파
    },
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  }, 
  {
    id: 16,
    menuName: "시래기 국",
    title: "시래기 국 만들기",
    image: foodImages[16],
    category: "한식",
    ingredients: {
      main: [31, 8, 15, 15], // 시래기, 계란, 파, 대파
      sub: []
    },
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  }   
]; 
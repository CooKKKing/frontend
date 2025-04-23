import React from 'react';
import useIsMobile from '../hooks/useIsMobile';
import CommonProfile from '../components/CommonProfile';
import CommonIngredient from '../components/CommonIngredients';
import { foodItems, ingredients } from '../data/foodData';
import StepGroup from '../components/StepGroup';

// 테스트할 레시피 id
const TEST_RECIPE_ID = 1;

// StepGroup용 더미 데이터 예시
const stepGroupsData = [
  {
    title: '재료 다듬기',
    steps: [
      {
        img: "/assets/images/food/1.jpg",
        desc: "닭고기와 채소를 깨끗이 손질해 준비합니다.",
      },
      {
        img: "/assets/images/food/2.jpg",
        desc: "양념장을 만들어 닭고기와 채소에 골고루 버무립니다.",
      },
    ],
  },
  {
    title: '조리',
    steps: [
      {
        img: "/assets/images/food/3.jpg",
        desc: "냄비에 재료를 넣고 끓여 완성합니다.",
      },
    ],
  },
  // 필요하면 '볶기', '굽기', '플레이팅', '완료' 등 그룹 추가
];

const PostDetail = () => {
  const { isMobile } = useIsMobile();

  // foodItems에서 테스트할 레시피 한 개 가져오기
  const recipe = foodItems.find(item => item.id === TEST_RECIPE_ID);

  // 주재료와 부재료를 하나의 배열로 합치고 type 부여
  const allIngredients = [
    ...recipe.ingredients.main.map(idx => ({
      name: ingredients.main[idx],
      type: 'main',
    })),
    ...recipe.ingredients.sub.map(idx => ({
      name: ingredients.sub[idx],
      type: 'sub',
    })),
  ];

  return (
    <div className="w-full min-h-screen ">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-8">
        <div className={`w-full flex ${isMobile ? "flex-col" : "flex-row items-start"} gap-4`}>
          {/* 왼쪽: 메뉴/프로필/재료 */}
          <div className="flex flex-col flex-1 min-w-0">
            {/* 모바일에서만 프로필 */}
            {isMobile && (
              <div className="mb-4 w-full">
                <CommonProfile
                  profileId={36}
                  nickname="타코야끼 아저씨"
                  riceCount={18}
                />
              </div>
            )}
            {/* 메뉴 타이틀 */}
            <div className="bg-[#F9C7C4] rounded-md px-4 py-2 text-xl font-bold text-center mb-2">
              {recipe.menuName}
            </div>
            {/* 메뉴 사진 */}
            <img
              src={recipe.image}
              alt={recipe.menuName}
              className="w-full object-cover mb-2 rounded-md"
            />
            {/* 게시글 제목 */}
            <div className="mb-2">
              <div className="font-bold mb-1">게시글 제목</div>
              <div className="border rounded px-2 py-1">{recipe.title}</div>
            </div>
            {/* 재료 (한 줄로) */}
            <div className="mb-8 w-full">
              <div className="font-bold mb-2">재료</div>
              <div>
                <CommonIngredient
                  items={allIngredients}
                  roundedStyle="rounded-md"
                  showRemove={false}
                  size={{ fontSize: 16 }}
                />
              </div>
            </div>
          </div>
          {/* PC/태블릿에서만 프로필 */}
          {!isMobile && (
            <div className="flex-shrink-0 w-[320px] max-w-[340px] min-w-[220px] flex justify-end">
              <CommonProfile
                profileId={36}
                nickname="타코야끼 아저씨"
                riceCount={18}
              />
            </div>
          )}
        </div>
        {/* 레시피 영역 */}
        <div className="mt-6">
          <div className="font-bold text-lg text-center mb-4">레시피</div>
          {/* StepGroup을 활용한 조리 순서 그룹 렌더링 */}
          {stepGroupsData.map((group, idx) => (
            <StepGroup key={idx} title={group.title} steps={group.steps} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

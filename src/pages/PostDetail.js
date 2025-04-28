import React from 'react';
import { useParams } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';
import CommonProfile from '../components/CommonProfile';
import CommonIngredient from '../components/CommonIngredients';
import StepGroup from '../components/StepGroup';
import { getRecipeDetail } from '../api/queries/recipeService';
import { getMenuDetail } from '../api/queries/menuService';
import LoadingBar from '../components/LoadingBar';
import { useQuery } from '@tanstack/react-query';

const PostDetail = () => {
  const { recipeId } = useParams();
  const { isMobile } = useIsMobile();

  const { data: recipe, isLoading: isRecipeLoading } = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipeDetail(recipeId),
  });

  const { data: menuData, isLoading: isMenuLoading } = useQuery({
    queryKey: ['menu', recipe?.data?.menuId],
    queryFn: () => getMenuDetail(recipe?.data?.menuId),
    enabled: !!recipe?.data?.menuId,
  });

  if (isRecipeLoading || isMenuLoading) {
    return <LoadingBar />;
  }

  if (!recipe?.data) {
    return <div>레시피를 찾을 수 없습니다.</div>;
  }

  const menuName = menuData?.data?.menuName || recipe.data.title;

  // 주재료와 부재료를 하나의 배열로 합치고 type 부여
  const allIngredients = [
    ...(recipe.data.mainIngredients || []).map(ing => ({
      name: ing.ingredientName,
      type: 'main',
    })),
    ...(recipe.data.seasoningIngredients || []).map(ing => ({
      name: ing.ingredientName,
      type: 'sub',
    })),
  ];

  // recipeStep 구조를 StepGroup에 맞게 변환
  const stepGroupsData = (recipe.data.recipeStep || []).map(group => ({
    title: group.title,
    steps: (group.recipeBoardSteps || []).map(step => ({
      img: step.image,
      desc: step.description,
    })),
  }));

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-8">
        <div className={`w-full flex ${isMobile ? "flex-col" : "flex-row items-start"} gap-4`}>
          {/* 왼쪽: 메뉴/프로필/재료 */}
          <div className="flex flex-col flex-1 min-w-0">
            {/* 모바일에서만 프로필 */}
            {isMobile && (
              <div className="mb-4 w-full">
                <CommonProfile
                  profileId={recipe.data.authorId}
                  nickname={recipe.data.authorNickname}
                  riceCount={recipe.data.authorRiceCount}
                />
              </div>
            )}
            {/* 메뉴 타이틀 */}
            <div className="bg-[#F9C7C4] rounded-md px-4 py-2 text-xl font-bold text-center mb-2">
              {menuName}
            </div>
            {/* 메뉴 사진 */}
            <img
              src={recipe.data.image}
              alt={menuName}
              className="w-full object-cover mb-2 rounded-md"
            />
            {/* 게시글 제목 */}
            <div className="mb-2">
              <div className="font-bold mb-1">게시글 제목</div>
              <div className="border rounded px-2 py-1">{recipe.data.title}</div>
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
                profileId={recipe.data.authorId}
                nickname={recipe.data.authorNickname}
                riceCount={recipe.data.authorRiceCount}
              />
            </div>
          )}
        </div>
        {/* 레시피 영역 */}
        <div className="mt-6">
          <div className="font-bold text-lg text-center mb-4">레시피</div>
          {stepGroupsData.map((group, idx) => (
            <StepGroup key={idx} title={group.title} steps={group.steps} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

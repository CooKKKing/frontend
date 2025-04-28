import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';
import CommonProfile from '../components/CommonProfile';
import CommonIngredient from '../components/CommonIngredients';
import StepGroup from '../components/StepGroup';
import { getRecipeDetail } from '../api/queries/recipeService';
import { getMenuDetail } from '../api/queries/menuService';
import LoadingBar from '../components/LoadingBar';

const PostDetail = () => {
  const { recipeId } = useParams();
  const { isMobile } = useIsMobile();
  const [recipe, setRecipe] = useState(null);
  const [menuName, setMenuName] = useState('');
  const [loading, setLoading] = useState(true);

  console.log("recipeId ================", recipeId);
  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await getRecipeDetail(recipeId);
        console.log("response ================", response.data);
        setRecipe(response.data);
        // menuId가 있으면 menuName도 불러오기
        if (response.data.menuId) {
          const menuRes = await getMenuDetail(response.data.menuId);
          setMenuName(menuRes.data.menuName);
        } else {
          setMenuName(response.data.title);
        }
        setLoading(false);
      } catch (error) {
        console.error('레시피 상세 정보를 불러오는데 실패했습니다:', error);
        setLoading(false);
      }
    };

    fetchRecipeDetail();
  }, [recipeId]);

  if (loading) {
    return <LoadingBar />;
  }

  if (!recipe) {
    return <div>레시피를 찾을 수 없습니다.</div>;
  }

  // 주재료와 부재료를 하나의 배열로 합치고 type 부여
  const allIngredients = [
    ...(recipe.mainIngredients || []).map(ing => ({
      name: ing.ingredientName,
      type: 'main',
    })),
    ...(recipe.seasoningIngredients || []).map(ing => ({
      name: ing.ingredientName,
      type: 'sub',
    })),
  ];

  // recipeStep 구조를 StepGroup에 맞게 변환
  const stepGroupsData = (recipe.recipeStep || []).map(group => ({
    title: group.title,
    steps: (group.recipeBoardSteps || []).map(step => ({
      img: step.image,
      desc: step.description,
    })),
  }));

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
                  profileId={recipe.authorId}
                  nickname={recipe.authorNickname}
                  riceCount={recipe.authorRiceCount}
                />
              </div>
            )}
            {/* 메뉴 타이틀 */}
            <div className="bg-[#F9C7C4] rounded-md px-4 py-2 text-xl font-bold text-center mb-2">
              {menuName}
            </div>
            {/* 메뉴 사진 */}
            <img
              src={recipe.image}
              alt={menuName}
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
                profileId={recipe.authorId}
                nickname={recipe.authorNickname}
                riceCount={recipe.authorRiceCount}
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

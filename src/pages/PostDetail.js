import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';
import CommonProfile from '../components/CommonProfile';
import CommonIngredient from '../components/CommonIngredients';
import StepGroup from '../components/StepGroup';
import { getRecipeDetail } from '../api/queries/recipeService';
import { getMenuDetail } from '../api/queries/menuService';
import LoadingBar from '../components/LoadingBar';
import { useQuery } from '@tanstack/react-query';
import PageTitle from '../components/PageTitle';
import instance from '../api/axiosInstance';
import { useUser } from '../hooks/useUser';
import Button from '../components/buttons/Button';
import { deleteRecipe } from '../api/mutations/recipeService';
import useBasicModal from '../hooks/useBasicModal';
import BasicModal from '../components/modals/BasicModal';

const PostDetail = () => {
  const { recipeId } = useParams();
  const { isMobile } = useIsMobile();
  const {member} = useUser();
  const navigate = useNavigate();
  const { openModal, closeModal, open, modalProps } = useBasicModal();

  const { data: recipe, isLoading: isRecipeLoading } = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipeDetail(recipeId),
  });

  const { data: menuData, isLoading: isMenuLoading } = useQuery({
    queryKey: ['menu', recipe?.data?.menuId],
    queryFn: () => getMenuDetail(recipe?.data?.menuId),
    enabled: !!recipe?.data?.menuId,
  });

  const { data: memberData, isLoading: isMemberLoading } = useQuery({
    queryKey: ['member', recipe?.data?.memberId],
    queryFn: () => instance.get(`/members/${recipe?.data?.memberId}`).then(res => res.data),
    enabled: !!recipe?.data?.memberId,
  });

  if (isRecipeLoading || isMenuLoading || isMemberLoading) {
    return <LoadingBar />;
  }

  if (!recipe?.data) {
    return <div>레시피를 찾을 수 없습니다.</div>;
  }

  const categoryName = menuData?.data?.category?.menuCategoryName === '기타' 
    ? menuData?.data?.category?.menuSubCategory 
    : menuData?.data?.category?.menuCategoryName || '기타';

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

  const onDeleteClick = (id) => {
    openModal({
      title: "게시글 삭제제",
      description: "게시글 삭제 하시겠습니까?",
      RedButton: "삭제하기",
      onConfirm: async () => {         
        try{
          await deleteRecipe(id); // 반드시 await!
          closeModal(); 
          navigate('/');
        }catch(err){
          alert(err);
        }
      }
    })
  }


  return (
    <div className="w-full min-h-screen">
      <div className="flex pb-2 justify-between items-center border-b border-black">
        <PageTitle title="레시피" />
        <div className='px-[10px] py-[5px] bg-orange-light rounded-md text-2xl border border-black'>
          {categoryName}
        </div>
      </div>

      {/* 수정하기 삭제하기 기능 두개 API 연동 */}
      {member.memberId === memberData.data.memberId 
        ? <div className='flex'>
          <Button
            size={'fit'}
            variant={'orange'}
            disabled={false}
            value={'삭제하기'}
            onClick={() => onDeleteClick(recipe.data.recipeBoardId)}
            height="48px"/>
            <Button
            size={'fit'} 
            variant={'green'}
            disabled={false}
            value={'수정정하기기'}
            onClick={() => navigate(`/create-post/${recipeId}`)}
            height="48px"/>  
          </div>
        : null }
      
      <div className="max-w-4xl mx-auto px-2 sm:px-4 py-8">
        <div className={`w-full flex ${isMobile ? "flex-col" : "flex-row items-start"} gap-4`}>
          {/* 왼쪽: 메뉴/프로필/재료 */}
          <div className="flex flex-col flex-1 min-w-0">
            {/* 모바일에서만 프로필 */}
            {isMobile && (
              <div className="mb-4 w-full">
                <CommonProfile
                  memberId={memberData?.data?.memberId}
                  profileId={memberData?.data?.profileImagePath}
                  nickname={memberData?.data?.nickName}
                  riceCount={memberData?.data?.ricePoint}
                  titleType='none'
                  titleImagePath={memberData?.data?.titles?.find(t => t.titleId === memberData?.data?.activeTitleId)?.title?.imagePath}
                  titleLevel={memberData?.data?.titles?.find(t => t.titleId === memberData?.data?.activeTitleId)?.title?.level}
                  titleName={memberData?.data?.titles?.find(t => t.titleId === memberData?.data?.activeTitleId)?.title?.name}
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
                memberId={memberData?.data?.memberId}
                profileId={memberData?.data?.profileImagePath}
                nickname={memberData?.data?.nickName}
                riceCount={memberData?.data?.ricePoint}
                titleType='none'
                titleImagePath={memberData?.data?.titles?.find(t => t.titleId === memberData?.data?.activeTitleId)?.title?.imagePath}
                titleLevel={memberData?.data?.titles?.find(t => t.titleId === memberData?.data?.activeTitleId)?.title?.level}
                titleName={memberData?.data?.titles?.find(t => t.titleId === memberData?.data?.activeTitleId)?.title?.name}
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

      <BasicModal open={open} onClose={closeModal} {...modalProps} />
    </div>
  );
};

export default PostDetail;

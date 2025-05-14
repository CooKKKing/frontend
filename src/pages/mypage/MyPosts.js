import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import FoodGrid from '../../components/FoodGrid';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import Button from '../../components/buttons/Button';
import PageTitle from '../../components/PageTitle';
import useIsMobile from '../../hooks/useIsMobile';
import { getMemberRecipes } from '../../api/queries/recipeService';
import { getMenuAllList } from '../../api/queries/menuService';
import { useUser } from '../../hooks/useUser';
import LoadingBar from '../../components/LoadingBar';

const MyPosts = () => {
  const navigate = useNavigate();
  const { isMobile } = useIsMobile();
  const { member } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('최신 게시글');

  // 메뉴 데이터 가져오기
  const { data: menuData } = useQuery({
    queryKey: ['menus'],
    queryFn: getMenuAllList,
  });

  // 내 레시피 목록 가져오기
  const { data: recipesData, isLoading } = useQuery({
    queryKey: ['memberRecipes', member?.memberId, currentPage],
    queryFn: () => getMemberRecipes(member?.memberId, currentPage, 12),
    enabled: !!member?.memberId,
  });

  if (isLoading) {
    return <LoadingBar />;
  }

  // 메뉴 데이터를 menuId를 키로 하는 객체로 변환
  const menuMap = menuData?.data?.reduce((acc, menu) => {
    acc[menu.menuId] = menu;
    return acc;
  }, {}) || {};

  // 레시피 데이터 변환
  const recipes = recipesData?.data?.map(recipe => {
    const menu = menuMap[recipe.menuId];
    return {
      id: recipe.recipeBoardId,
      recipeId: recipe.recipeBoardId,
      menuName: menu?.menuName || recipe.title,
      title: recipe.title,
      image: recipe.image,
      category: menu?.category?.menuCategoryName || '기타',
      ingredients: {
        main: recipe.mainIngredients.map(ing => ({
          id: ing.ingredientId,
          name: ing.ingredientName,
        })),
        sub: recipe.seasoningIngredients.map(ing => ({
          id: ing.ingredientId,
          name: ing.ingredientName,
        })),
      },
      likes: recipe.likeCount,
      isLiked: recipe.liked,
      createdAt: recipe.createdAt
    };
  }) || [];

  // 검색어로 필터링된 아이템
  const filteredAndSortedItems = recipes.filter(item => {
    const mainIngredients = item.ingredients.main.map(ing => ing.name);
    const subIngredients = item.ingredients.sub.map(ing => ing.name);
    const allIngredients = [...mainIngredients, ...subIngredients];
    
    return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           allIngredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
  }).sort((a, b) => {
    switch (sortOption) {
      case '최신 게시글':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case '오래된 게시글':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case '좋아요 순':
        return b.likes - a.likes;
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const handleCreatePost = () => {
    navigate('create-post');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="w-full pb-6">
      <div className="flex justify-between items-center mb-6">
        <PageTitle title="내 게시글" isMargin={false}/>
        <Button
          variant="orange"
          value="게시글 작성"
          size="fit"
          onClick={handleCreatePost}
        />
      </div>

      <div className={`flex gap-2 mb-6 ${isMobile ? 'flex-col items-end justify-end' : 'flex-row items-center justify-between'}`}>
        <div className={`w-full ${isMobile ? '' : 'max-w-[300px]'}`}>
          <SearchBar 
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="검색어를 입력하세요"
          />
        </div>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="max-w-[150px] w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
        >
          <option value="최신 게시글">최신 게시글</option>
          <option value="오래된 게시글">오래된 게시글</option>
          <option value="좋아요 순">좋아요 순</option>
        </select>
      </div>

      {/* 음식 그리드 */}
      <FoodGrid 
        items={filteredAndSortedItems}
        currentPage={1}
        itemsPerPage={12}
        searchQuery={searchQuery}
        onItemClick={handleItemClick}
      />

      {/* 페이지네이션 */}
      {recipesData?.totalPages > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={recipesData.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default MyPosts; 
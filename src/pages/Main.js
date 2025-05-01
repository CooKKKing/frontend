import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FoodGrid from '../components/FoodGrid';
import Category from '../components/Category';
import Pagination from '../components/Pagination';  
import PageTitle from '../components/PageTitle';
import { getRecipeAllList } from '../api/queries/recipeService';
import { getMenuAllList } from '../api/queries/menuService';
import LoadingBar from '../components/LoadingBar';
import { useUser } from '../hooks/useUser';
const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { member } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 레시피와 메뉴 데이터
        const [recipesResponse, menusResponse] = await Promise.all([
          getRecipeAllList(),
          getMenuAllList()
        ]);

        // 메뉴 데이터를 menuId를 키로 하는 객체로 변환
        const menuMap = menusResponse.data.reduce((acc, menu) => {
          acc[menu.menuId] = menu;
          return acc;
        }, {});

        console.log("menuMap ================",menuMap);

        // 레시피 데이터를 기존 형식으로 변환하면서 메뉴 정보를 매핑
        const formattedRecipes = recipesResponse.data.map(recipe => {
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
        });

        setRecipes(formattedRecipes);
        setLoading(false);
      } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [member]);

  // 현재 카테고리의 아이템 수 계산
  const filteredItemCount = recipes.filter(recipe => 
    selectedCategory === "전체" || recipe.category === selectedCategory
  ).length;

  // 총 페이지 수 계산
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredItemCount / itemsPerPage);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemClick = (id) => {
    navigate(`/post/${id}`);
  };

  if (loading) {
    return <LoadingBar/>;
  }

  return (
    <>
      <PageTitle title="레시피 게시판" />
      
      {/* 카테고리 탭 */}
      <Category onCategoryChange={handleCategoryChange} />

      {/* 음식 그리드 */}
      <FoodGrid 
        items={recipes}
        selectedCategory={selectedCategory}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onItemClick={handleItemClick}
      />

      {/* 페이지네이션 - 아이템이 있을 때만 표시 */}
      {filteredItemCount > 0 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default Main;
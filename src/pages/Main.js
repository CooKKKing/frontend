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
import { toggleRecipeBookmark, toggleRecipeLike } from '../api/mutations/recipeService';
import { useRecipe } from '../hooks/useRecipe';
const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  // const [recipes, setRecipes] = useState([]);
  // const [loading, setLoading] = useState(true);
  const {fetchData, recipes, setRecipes, loading} = useRecipe();
  const { member } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [member]);

  console.log("recipes ==================== Main" , recipes);

  const toggleLike = async (id) => {
    setRecipes(prevRecipes =>
      prevRecipes.map(recipe =>
        recipe.id === id
          ? {
              ...recipe,
              isLiked: !recipe.isLiked,
              likes: recipe.isLiked ? recipe.likes - 1 : recipe.likes + 1
            }
          : recipe
      )
    );

    try {
      await toggleRecipeLike(id);
    } catch (error) {
      setRecipes(prevRecipes =>
        prevRecipes.map(recipe =>
          recipe.id === id
            ? {
                ...recipe,
                isLiked: !recipe.isLiked,
                likes: recipe.isLiked ? recipe.likes + 1 : recipe.likes - 1
              }
            : recipe
        )
      );
      alert('좋아요 처리에 실패했습니다.');
    }
  };
  
  const toggleBookmark = async (id) => {
    setRecipes(prevRecipes => 
      prevRecipes.map(recipe => 
        recipe.id === id 
        ? {
          ...recipe,
          isBookmarked : !recipe.isBookmarked
        }
        : recipe
      )
    )

    try{
      toggleRecipeBookmark(id);
    }catch(error){
      setRecipes(prevRecipes => 
        prevRecipes.map(recipe => 
          recipe.id === id 
          ? {
            ...recipe,
            isBookmarked : !recipe.isBookmarked
          }
          : recipe
        )
      )
      alert("북마크 실패패")
    }
  }

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
        toggleLike={toggleLike}
        toggleBookmark={toggleBookmark}
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
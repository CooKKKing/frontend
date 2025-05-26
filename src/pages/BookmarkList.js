import React, { useState, useMemo, useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import { FaArrowLeft } from 'react-icons/fa';
import FoodGrid from '../components/FoodGrid';
import { foodItems, ingredients } from '../data/foodData';
import { useBookmark } from '../contexts/BookmarkContext';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { IoBookmarkOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { useRecipe } from '../hooks/useRecipe';
import { useUser } from '../hooks/useUser';
import { toggleRecipeBookmark, toggleRecipeLike } from '../api/mutations/recipeService';
import { useNavigate } from 'react-router-dom';

const BookmarkList = () => {
  // const { isBookmarked } = useBookmark();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const {member} = useUser();

  const {fetchData, recipes, setRecipes, loading} = useRecipe();

  useEffect(() => {
    fetchData();
  },[member])

  const isBookmarkList = recipes.filter(el => el.isBookmarked === true);

  console.log("isBookmarkList ===========", isBookmarkList);

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
  
  // 북마크된 아이템만 필터링하고 검색어로 필터링
  const filteredItems = isBookmarkList.filter(item => {
    const mainIngredients = item.ingredients.main.map(ing => ing.name);
    const subIngredients = item.ingredients.sub.map(ing => ing.name);
    const allIngredients = [...mainIngredients, ...subIngredients];
    
    return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           allIngredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    });

  // 북마크된 아이템이 있는지 확인
  const hasBookmarks = isBookmarkList.length > 0;

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

  // 페이지네이션을 위한 계산
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <>
    {/* <div className="container mx-auto px-4 py-8"> */}
      <div className="flex items-center mb-6">
        <PageTitle title="북마크" isMargin={false}/>
      </div>

      <div className="mb-6">
        <div className="w-[300px]">
          <SearchBar 
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="검색어를 입력하세요"
            disabled={!hasBookmarks}
          />
        </div>
      </div>
      
      {hasBookmarks ? (
        filteredItems.length > 0 ? (
          <>
            <FoodGrid 
              items={filteredItems}
              selectedCategory="전체"
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              searchQuery={searchQuery}
              onItemClick={handleItemClick}
              toggleLike={toggleLike}
              toggleBookmark={toggleBookmark}
            />
            {filteredItems.length > itemsPerPage && (
              <div className="mt-6">
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
            <IoSearch className="h-16 w-16 mb-4 text-gray-400" />
            <p className="text-lg">검색 결과가 없습니다.</p>
            <p className="text-sm mt-2">다른 검색어를 입력해보세요!</p>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
          <IoBookmarkOutline className="h-16 w-16 mb-4 text-gray-400" />
          <p className="text-lg">북마크한 게시글이 없습니다.</p>
          <p className="text-sm mt-2">관심있는 레시피를 북마크해보세요!</p>
        </div>
      )}
    </>
  );
};

export default BookmarkList; 
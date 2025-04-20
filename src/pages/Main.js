import React, { useState, useMemo } from 'react';
import FoodGrid from '../components/FoodGrid';
import Category from '../components/Category';
import Pagination from '../components/Pagination';  
import PageTitle from '../components/PageTitle';
import { foodItems } from '../data/foodData';

const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 카테고리의 아이템 수 계산
  const filteredItemCount = useMemo(() => {
    const filteredItems = selectedCategory === "전체" 
      ? foodItems 
      : foodItems.filter(item => item.category === selectedCategory);
    return filteredItems.length;
  }, [selectedCategory]);

  // 총 페이지 수 계산
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredItemCount / itemsPerPage);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <PageTitle title="레시피 게시판" />
      
      {/* 카테고리 탭 */}
      <Category onCategoryChange={handleCategoryChange} />

      {/* 음식 그리드 */}
      <FoodGrid 
        selectedCategory={selectedCategory}
        currentPage={currentPage}
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

import React, { useState } from 'react';
import HeaderPC from '../components/HeaderPC';
import HeaderMobile from '../components/HeaderMobile';
import useIsMobile from '../hooks/useIsMobile';
import ButtonTest from '../test/buttonTest';
import FoodGrid from '../components/FoodGrid';
import Category from '../components/Category';
import Pagination from '../components/Pagination';  
import PageTitle from '../components/PageTitle';

const Main = () => {
  const { isMobile } = useIsMobile(); 
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // 실제 총 페이지 수로 변경해야 함

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 카테고리가 변경되면 첫 페이지로 이동
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // 여기에 페이지 변경 시 데이터를 가져오는 로직 추가
  };

  return (
    <div className="flex bg-background-gradient">
      {/* PC 또는 모바일 헤더 */}
      {isMobile ? <HeaderMobile activeMenu="메인" /> : <HeaderPC activeMenu="메인" />}

      <div className='flex w-full h-[calc(100vh-10px)] p-6 gap-6 overflow-hidden'>
        {/* 메인 박스 */}
        <main className={`w-full h-full overflow-y-scroll bg-white border border-border p-6 ${isMobile ? "border border-black mt-20" : ""}`}>
          <PageTitle title="레시피 게시판" />

          {/* 카테고리 탭 */}
          <Category onCategoryChange={handleCategoryChange} />

          {/* 음식 그리드 */}
          <FoodGrid selectedCategory={selectedCategory} />

          {/* 페이지네이션 */}
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </main>

        {/* 오른쪽 박스 */}
        {!isMobile && (
          <aside className="bg-white border border-border w-min-[300px] h-full overflow-y-auto p-4">
            Right Box ContentRight Box ContentRight Box ContentRight Box ContentRight Box Content
          </aside>
        )}
      </div>
    </div>
  );
};

export default Main;

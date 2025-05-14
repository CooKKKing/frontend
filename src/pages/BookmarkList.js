import React, { useState, useMemo } from 'react';
import PageTitle from '../components/PageTitle';
import { FaArrowLeft } from 'react-icons/fa';
import FoodGrid from '../components/FoodGrid';
import { foodItems, ingredients } from '../data/foodData';
import { useBookmark } from '../contexts/BookmarkContext';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const BookmarkList = () => {
  const { isBookmarked } = useBookmark();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // 북마크된 아이템만 필터링하고 검색어로 필터링
  const filteredItems = useMemo(() => {
    let bookmarked = foodItems.filter(item => isBookmarked(item.id));
    
    return bookmarked.filter(item => {
      const mainIngredients = item.ingredients.main
        .map(index => ingredients.main[index])
        .filter(Boolean);
      const subIngredients = item.ingredients.sub
        .map(index => ingredients.sub[index])
        .filter(Boolean);
      const allIngredients = [...mainIngredients, ...subIngredients];
      
      return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             allIngredients.some(ing => ing && ing.toLowerCase().includes(searchQuery.toLowerCase()));
    });
  }, [isBookmarked, searchQuery]);

  // 북마크된 아이템이 있는지 확인
  const hasBookmarks = useMemo(() => {
    return foodItems.some(item => isBookmarked(item.id));
  }, [isBookmarked]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-lg">검색 결과가 없습니다.</p>
            <p className="text-sm mt-2">다른 검색어를 입력해보세요!</p>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          <p className="text-lg">북마크한 게시글이 없습니다.</p>
          <p className="text-sm mt-2">관심있는 레시피를 북마크해보세요!</p>
        </div>
      )}
    </>
  );
};

export default BookmarkList; 
import React from 'react';
import PageTitle from '../components/PageTitle';
import IconBtn from '../components/IconBtn';
import { FaArrowLeft } from 'react-icons/fa';
import FoodGrid from '../components/FoodGrid';
import { foodItems } from '../data/foodData';
import { useBookmark } from '../contexts/BookmarkContext';

const BookmarkList = () => {
  const { isBookmarked } = useBookmark();
  
  // 북마크된 아이템만 필터링
  const bookmarkedItems = foodItems.filter(item => isBookmarked(item.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <PageTitle title="북마크" />
      </div>
      
      {bookmarkedItems.length > 0 ? (
        <FoodGrid 
          items={bookmarkedItems}
          selectedCategory="전체"
          currentPage={1}
          itemsPerPage={12}
        />
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
    </div>
  );
};

export default BookmarkList; 
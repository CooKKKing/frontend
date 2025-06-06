import React, { useState, useEffect } from 'react';
import HighlightText from './HighlightText';
import useBasicModal from '../hooks/useBasicModal';
import { useUser } from '../hooks/useUser';
import BasicModal from './modals/BasicModal';
import LoginModal from './modals/LoginModal';
import { IoBookmark } from "react-icons/io5"
import { IoBookmarkOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

const FoodGrid = ({ selectedCategory = "전체", toggleLike, toggleBookmark, currentPage = 1, items, itemsPerPage = 12, searchQuery = '', onItemClick }) => {

  const { openModal, closeModal, open, modalProps } = useBasicModal();
  const { member } = useUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const showLoginModal = () => {
    openModal({
      title: "로그인 후 이용가능한 서비스입니다.",
      description: "로그인하러 가시겠습니까 ?",
      SuccessButton: "로그인 하기",
      onConfirm: () => { closeModal(); setIsLoginModalOpen(true); }
    })
  }

  const filteredItems = selectedCategory === "전체" 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  // 페이지네이션을 위한 계산
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  if (filteredItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-[200px] text-gray-500">
        게시글이 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 auto-rows-auto sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
      {paginatedItems.map((food) => (
        <div 
          key={food.id}
          className="cursor-pointer"
          onClick={
            member 
            ? () => onItemClick(food.recipeId)
            : () => showLoginModal()
          }
        >
          <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative aspect-video">
              <img 
                src={food.image || "/placeholder.svg"} 
                alt={food.menuName} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={(e) => {
                  e.stopPropagation();

                  if(member) {
                    toggleBookmark(food.id)
                  } else {
                    showLoginModal();
                  }
                }}
                className="absolute top-2 right-2 bg-white rounded-full p-1 hover:bg-gray-100"
              >
                 {food.isBookmarked
                ? (<IoBookmark className="h-5 w-5 text-blue-500" />)
                :(<IoBookmarkOutline className="h-5 w-5 text-gray-400" />)
                }
              </button>
            </div>
            <div className="p-4">
              {/* Menu Name and Like Button Row */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-800">
                  <HighlightText text={food.menuName} highlight={searchQuery} />
                </h3>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if(member) {
                      toggleLike(food.id);
                    }else
                      showLoginModal();
                  }}
                  className="flex justify-center items-center space-x-1 text-gray-500 hover:text-red-500"
                >
                  {food.isLiked
                  ? (<FaHeart className='text-red-500' />)
                  : (<FaRegHeart className='text-gray-400'/>)
                  }
                  <span className="">{food.likes}</span>
                </button>
              </div>

              {/* Title with ellipsis */}
              <h4 className="text-sm text-gray-600 mb-3 overflow-hidden whitespace-nowrap text-ellipsis">
                <HighlightText text={food.title} highlight={searchQuery} />
              </h4>

              {/* Ingredients with horizontal scroll */}
              <div className="flex space-x-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {/* 주재료 */}
                {food.ingredients.main.map((ingredient, index) => (
                  <span 
                    key={`main-${index}`}
                    className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs whitespace-nowrap"
                  >
                    <HighlightText text={ingredient.name} highlight={searchQuery} />
                  </span>
                ))}
                {/* 부재료 */}
                {food.ingredients.sub.map((ingredient, index) => (
                  <span 
                    key={`sub-${index}`}
                    className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs whitespace-nowrap"
                  >
                    <HighlightText text={ingredient.name} highlight={searchQuery} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <BasicModal open={open} onClose={closeModal} {...modalProps} />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
};

export default FoodGrid;

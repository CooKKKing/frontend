import React, { useState } from 'react';
import { foodItems } from '../data/foodData';

const FoodGrid = ({ selectedCategory = "전체", currentPage = 1 }) => {
  const [items, setItems] = useState(foodItems.map(item => ({
    ...item,
    likes: item.likes || 0,
    isBookmarked: item.isBookmarked || false,
    isLiked: item.isLiked || false,
  })));

  const toggleBookmark = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
    ));
  };

  const toggleLike = (id) => {
    setItems(items.map(item => 
      item.id === id ? { 
        ...item, 
        isLiked: !item.isLiked,
        likes: item.isLiked ? item.likes - 1 : item.likes + 1
      } : item
    ));
  };

  const filteredItems = selectedCategory === "전체" 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  // 페이지네이션을 위한 계산
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  if (filteredItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-[200px] text-gray-500">
        해당 카테고리에 해당하는 게시글이 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 auto-rows-auto sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
      {paginatedItems.map((food) => (
        <div key={food.id} className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative aspect-video">
            <img 
              src={food.image || "/placeholder.svg"} 
              alt={food.menuName} 
              className="w-full h-full object-cover"
            />
            <button 
              onClick={() => toggleBookmark(food.id)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${food.isBookmarked ? 'text-blue-500' : 'text-gray-400'}`}
                fill={food.isBookmarked ? 'currentColor' : 'none'}
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
            </button>
          </div>
          <div className="p-4">
            {/* Menu Name and Like Button Row */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-800">{food.menuName}</h3>
              <button 
                onClick={() => toggleLike(food.id)}
                className="flex justify-center items-center space-x-1 text-gray-500 hover:text-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${food.isLiked ? 'text-red-500' : 'text-gray-400'}`}
                  fill={food.isLiked ? 'currentColor' : 'none'}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="">{food.likes}</span>
              </button>
            </div>

            {/* Title with ellipsis */}
            <h4 className="text-sm text-gray-600 mb-3 overflow-hidden whitespace-nowrap text-ellipsis">
              {food.title}
            </h4>

            {/* Ingredients with horizontal scroll */}
            <div className="flex space-x-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {food.ingredients.map((ingredient, index) => (
                <span 
                  key={index}
                  className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs whitespace-nowrap"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodGrid;

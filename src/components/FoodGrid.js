// import Image from "next/image"
import React, { useState } from 'react';

// Sample food data
const foodItems = [
  {
    id: 1,
    menuName: "매콤한 닭볶음탕",
    title: "매콤달콤한 닭볶음탕 만들기 레시피 공유합니다~",
    image: "/assets/images/food/1.jpg",
    category: "한식",
    ingredients: ["닭고기", "감자", "당근", "양파", "고추장", "간장", "마늘", "생강"],
    likes: 1,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 2,
    menuName: "김치찌개",
    title: "초간단 김치찌개 만들기 신입 자취생도 가능!",
    image: "/assets/images/food/2.jpg",
    category: "한식",
    ingredients: ["김치", "돼지고기", "두부", "대파", "고춧가루"],
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 3,
    menuName: "된장찌개",
    title: "건강한 된장찌개 레시피",
    image: "/assets/images/food/3.jpg",
    category: "한식",
    ingredients: ["된장", "두부", "감자", "양파", "대파", "고추"],
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 4,
    menuName: "불고기",
    title: "달달한 불고기 만들기",
    image: "/assets/images/food/4.jpg",
    category: "한식",
    ingredients: ["소고기", "양파", "당근", "배", "간장", "설탕"],
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 5,
    menuName: "비빔밥",
    title: "영양만점 비빔밥 레시피",
    image: "/assets/images/food/5.jpg",
    category: "한식",
    ingredients: ["밥", "당근", "오이", "고사리", "도라지", "고추장"],
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 6,
    menuName: "짜장면",
    title: "본격 중국집 스타일 짜장면",
    image: "/assets/images/food/6.jpg",
    category: "중식",
    ingredients: ["중면", "춘장", "돼지고기", "양파", "감자"],
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 7,
    menuName: "초밥",
    title: "집에서 만드는 연어초밥",
    image: "/assets/images/food/7.jpg",
    category: "일식",
    ingredients: ["쌀", "연어", "와사비", "단무지", "김"],
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 8,
    menuName: "파스타",
    title: "깔끔한 토마토 파스타",
    image: "/assets/images/food/8.jpg",
    category: "양식",
    ingredients: ["스파게티면", "토마토소스", "마늘", "양파", "올리브오일"],
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 9,
    menuName: "떡볶이",
    title: "매콤달콤 국민간식 떡볶이",
    image: "/assets/images/food/9.jpg",
    category: "분식",
    ingredients: ["떡", "어묵", "고추장", "설탕", "대파"],
    likes: 0,
    isBookmarked: false,
    isLiked: false,
  },
];

const FoodGrid = ({ selectedCategory = "전체" }) => {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredItems.map((food) => (
        <div key={food.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-48">
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
            <div className="flex justify-between items-center mb-2 border border-border">
              <h3 className="font-bold text-gray-800">{food.menuName}</h3>
              <button 
                onClick={() => toggleLike(food.id)}
                className="flex items-center space-x-1 text-gray-500 hover:text-red-500"
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
                <span className="text-sm">{food.likes}</span>
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

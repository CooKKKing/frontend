import React, { useState } from 'react';
import { categoryItems } from '../constants/menuItems';

const Category = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
      {categoryItems.map((item, index) => (
        <button 
          key={index} 
          onClick={() => handleCategoryClick(item.name)} 
          className={`bg-white text-gray-700 px-4 py-2 rounded-full whitespace-nowrap border border-gray-200 
                    ${selectedCategory === item.name ? 'bg-orange-500 text-white' : ''}`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default Category;


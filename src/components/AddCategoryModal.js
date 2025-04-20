import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";

const AddCategoryModal = ({ isOpen, onClose, onAdd }) => {
  const [categoryName, setCategoryName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      onAdd(categoryName.trim());
      setCategoryName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md mx-4 p-6">
        <button
          className="absolute top-3 right-3 text-xl text-gray-800"
          onClick={onClose}
          aria-label="닫기"
        >
          <IoMdClose size={22} />
        </button>

        <h2 className="text-xl font-bold mb-4">새 도감 카테고리 추가</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
              카테고리 이름
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
              placeholder="카테고리 이름을 입력하세요"
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            disabled={!categoryName.trim()}
          >
            추가하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal; 
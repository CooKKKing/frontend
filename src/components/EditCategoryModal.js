import React, { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import CheckBox from './CheckBox';

const EditCategoryModal = ({ isOpen, onClose, onEdit, initialName, initialIsPrivate = false }) => {
  const [categoryName, setCategoryName] = useState(initialName);
  const [isPrivate, setIsPrivate] = useState(initialIsPrivate);

  // props가 변경될 때마다 상태 업데이트
  useEffect(() => {
    setCategoryName(initialName);
    setIsPrivate(initialIsPrivate);
  }, [initialName, initialIsPrivate]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      onEdit(categoryName.trim(), isPrivate);
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

        <h2 className="text-xl font-bold mb-4">도감 카테고리 수정</h2>
        
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

          <div className="mb-4">
            <CheckBox
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              label="비공개"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            disabled={!categoryName.trim()}
          >
            수정하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal; 
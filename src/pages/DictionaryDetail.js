import React, { useState } from 'react';
import { useDictionary } from '../contexts/DictionaryContext';
import { motion } from 'framer-motion';
import AddImageModal from '../components/AddImageModal';

const DictionaryDetail = () => {
  const { activeCategory, categories, handleImageDelete, handleAddImage } = useDictionary();
  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);
  
  const activeItem = categories.find(cat => cat.id === activeCategory);
  if (!activeItem) return null;

  return (
    <div className="h-full p-8">
      <div className="bg-blue-50 rounded-lg p-8 h-full">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => window.history.back()}
          className="mb-6 px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
        >
          <span>←</span>
          <span>뒤로가기</span>
        </button>

        {/* 도감 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* 기존 이미지 카드들 */}
          {activeItem?.images?.map((image, index) => (
            <div key={index} className="relative group">
              {/* 삭제 버튼 */}
              <button
                onClick={() => handleImageDelete(image.id)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                ×
              </button>
              {/* 폴라로이드 카드 */}
              <div className="bg-white p-3 rounded-lg shadow-md">
                <div className="aspect-square bg-gray-100 rounded-md mb-2 overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.menuName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-center font-medium text-gray-800">{image.menuName}</p>
              </div>
            </div>
          ))}

          {/* 이미지 추가 버튼 */}
          {(!activeItem?.images || activeItem.images.length < 8) && (
            <div 
              onClick={() => setIsAddImageModalOpen(true)}
              className="bg-white p-3 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                <span className="text-3xl text-gray-400">+</span>
              </div>
              <p className="text-center font-medium text-gray-400 mt-2">사진 추가</p>
            </div>
          )}
        </div>
      </div>

      {/* 이미지 추가 모달 */}
      {isAddImageModalOpen && (
        <AddImageModal
          isOpen={isAddImageModalOpen}
          onClose={() => setIsAddImageModalOpen(false)}
          onAdd={handleAddImage}
          categoryId={activeCategory}
        />
      )}
    </div>
  );
};

export default DictionaryDetail; 
import React, { useState } from 'react';
import { useDictionary } from '../contexts/DictionaryContext';
import AddCategoryModal from '../components/AddCategoryModal';
import AddImageModal from '../components/AddImageModal';
import { motion, AnimatePresence } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';
import PageTitle from '../components/PageTitle';


const Dictionary = () => {
  const {
    categories,
    activeCategory,
    setActiveCategory,
    addCategory,
    updateCategoryCamera,
    updateCategoryColor,
    deleteCategory,
    handleImageDelete,
    handleAddImage
  } = useDictionary();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  // 현재 활성화된 카테고리 정보
  const activeItem = categories.find(cat => cat.id === activeCategory);

  // 색상에 따른 배경색 매핑
  const getBackgroundColor = (color) => {
    const colorMap = {
      'blue': 'bg-blue-100',
      'yellow': 'bg-yellow-100',
      'purple': 'bg-purple-100',
      'green': 'bg-green-100',
      'red': 'bg-red-100',
      'pink': 'bg-pink-100'
    };
    return colorMap[color] || 'bg-gray-100';
  };

  const getBorderColor = (color) => {
    const colorMap = {
      'blue': 'border-blue-500',
      'yellow': 'border-yellow-500',
      'purple': 'border-purple-500',
      'green': 'border-green-500',
      'red': 'border-red-500',
      'pink': 'border-pink-500'
    };
    return colorMap[color] || 'border-gray-500';
  };

  const handleDelete = (e, categoryId) => {
    e.stopPropagation();
    deleteCategory(categoryId);
  };

  const {isMobile, isTablet} = useIsMobile();

  // 도감 상세 뷰
  const DetailView = () => (
    <div className="h-full p-8">
      <div className="bg-blue-50 rounded-lg p-8 h-full">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => setShowDetail(false)}
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
    </div>
  );

  return (
    <div className={`h-full overflow-hidden `}>
      <PageTitle title="도감" />
      <div className={`flex ${isTablet ? 'flex-col' : 'flex-row'}`}>
        {/* 왼쪽 카테고리 목록 */}
        <div className={`flex py-4  ${isTablet ? 'overflow-x-scroll justify-start items-center overflow-y-hidden w-full ' : 'w-[120px] items-start overflow-y-auto scrollbar-hide'}`}>
          <div className={`flex items-center justify-center  ${isTablet ? 'justify-start items-start flex-row gap-6' : 'w-[120px] flex-col gap-6'}`}>
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className="relative flex items-center justify-center w-[100px] h-[100px] rounded-full group"
              >
                {category.id === activeCategory && (
                  <motion.div
                    layoutId="activeBackground"
                    className={`absolute inset-0 w-[80px] h-[80px] rounded-full -z-10`}
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`w-[100px] h-[100px] rounded-full flex items-center justify-center ${
                  category.id === activeCategory 
                    ? `${getBackgroundColor(category.color)} border-2 ${getBorderColor(category.color)}` 
                    : 'border border-gray-800'
                }`}>
                  <img
                    src={`/assets/images/camera/${category.cameraType}-${category.color}.png`}
                    alt={category.name}
                    className={`w-[60px] h-[60px] object-contain cursor-pointer transition-transform hover:scale-110`}
                  />
                  <button
                    onClick={(e) => handleDelete(e, category.id)}
                    className="absolute top-0 right-0 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
            {/* 추가 버튼 */}
            <div className="flex items-center justify-center">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="w-[80px] h-[80px] rounded-full border-[3px] border-dashed border-gray-300 flex items-center justify-center text-3xl text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* 메인 컨텐츠 영역 */}
        <div className="flex w-full h-full items-center justify-center pl-6">
          <AnimatePresence mode="wait">
            {activeItem && !showDetail ? (
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center w-full h-fit"
              >
                {/* 큰 원형 배경과 카메라 */}
                <div 
                  className={`relative mb-6 rounded-full ${getBackgroundColor(activeItem.color)} cursor-pointer`}
                  onClick={() => setShowDetail(true)}
                >
                  <div className={`min-w-[300px] min-h-[300px] flex items-center justify-center`}>
                    <img
                      src={`/assets/images/camera/${activeItem.cameraType}-${activeItem.color}.png`}
                      alt={activeItem.name}
                      className="w-[150px] h-[150px] object-contain"
                    />
                  </div>
                </div>
                
                {/* 카테고리 이름 */}
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-2xl font-bold"
                >
                  {activeItem.name}
                </motion.h2>
              </motion.div>
            ) : (
              <motion.div
                key="detail-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full"
              >
                <DetailView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* 모달들 */}
      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addCategory}
      />
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

export default Dictionary; 
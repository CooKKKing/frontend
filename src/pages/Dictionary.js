import React, { useState } from 'react';
import { useDictionary } from '../contexts/DictionaryContext';
import { useShowDetail } from '../contexts/ShowDetailContext';
import AddCategoryModal from '../components/AddCategoryModal';
import AddImageModal from '../components/AddImageModal';
import EditCategoryModal from '../components/EditCategoryModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { motion, AnimatePresence } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';
import PageTitle from '../components/PageTitle';
import { FiEdit2 } from 'react-icons/fi';
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useQuery } from '@tanstack/react-query';
import { getCollectionCameraImg, addImageToCollection, getCollectionImages, deleteCollectionImage } from '../api/queries/collectionService';
import axios from 'axios';


const Dictionary = () => {
  const {
    categories,
    activeCategory,
    setActiveCategory,
    addCategory,
    updateCategoryCamera,
    updateCategoryColor,
    deleteCategory,
    handleAddImage,
    updateCategoryName
  } = useDictionary();

  console.log("Dictonary Categories==============", categories);

  const { showDetail, setShowDetail } = useShowDetail();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // 현재 활성화된 카테고리 정보
  const activeItem = categories.find(cat => cat.id === activeCategory) || {
    color: 'yellow',
    cameraType: '1',
    name: '',
    images: [],
    isPrivate: false
  };

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

  const getCameraColor = (color) => {
    const colorMap = {
      'blue': 'bg-blue-200',
      'yellow': 'bg-yellow-200',
      'purple': 'bg-purple-200',
      'green': 'bg-green-200',
      'red': 'bg-red-200',
      'pink': 'bg-pink-200'
    };
    return colorMap[color] || 'bg-gray-200';
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
    const category = categories.find(cat => cat.id === categoryId);
    setCategoryToDelete({ id: categoryId, name: category.name });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete.id);
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  const {isMobile, isTablet} = useIsMobile();

  // 현재 선택된 카테고리의 이미지 목록을 가져오는 쿼리
  const { data: categoryImages, refetch: refetchImages } = useQuery({
    queryKey: ['categoryImages', activeCategory],
    queryFn: () => getCollectionImages(activeCategory),
    // enabled: !!activeCategory && showDetail,
  });

  console.log("categoryImages==============", categoryImages);

  // 도감 상세 뷰
  const DetailView = () => (
    <div className="h-full ">
      <div className={`${getBackgroundColor(activeItem.color)} rounded-lg p-4 h-full flex flex-col`}>
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => setShowDetail(false)}
          className="mb-2 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2 w-fit"
        >
          <IoMdArrowRoundBack />
          <span>뒤로가기</span>
        </button>

        {/* 도감 그리드 */}
        <div className="overflow-y-auto scrollbar-hide flex-1">
          <div className="p-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* 기존 이미지 카드들 */}
              {categoryImages?.map((image) => (
                <div key={image.id} className="relative group z-50">
                  {/* 삭제 버튼 */}
                  <button
                    onClick={() => handleImageDelete(image.collectionItemId)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-100"
                  >     
                    <IoClose />
                  </button>
                  {/* 폴라로이드 카드 */}
                  <div className="bg-white p-3 rounded-lg shadow-md">
                    <div className="aspect-square bg-gray-100 rounded-md mb-2 overflow-hidden">
                      <img
                        src={image.imageUrl}
                        alt={image.menuName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-center font-medium text-gray-800">{image.menuName}</p>
                  </div>
                </div>
              ))}

              {/* 이미지 추가 버튼 */}
              {(!categoryImages?.data || categoryImages.data.length < 8) && (
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
      </div>
    </div>
  );

  const handleAddImageToCategory = async (categoryId, imageData) => {
    try {
      await addImageToCollection(categoryId, imageData);
      await refetchImages();
    } catch (error) {
      console.error('이미지 추가 실패:', error);
      throw error;
    }
  };

  const handleImageDelete = async (imageId) => {
    try {
      await deleteCollectionImage(imageId);
      await refetchImages();
    } catch (error) {
      console.error('이미지 삭제 실패:', error);
      alert('이미지 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      <PageTitle title="도감" />
      <div className={`flex scrollbar-hide gap-2 
                      ${isTablet || isMobile ? 'flex-col' : 'flex-row'} 
                      ${isMobile ? 'h-max' : 'h-[calc(100%-100px)]'}  overflow-hidden`}>       
        {/* 왼쪽 카테고리 목록 */}
        {!showDetail && (
          <div className={`flex py-4 ${isTablet || isMobile
            ? 'h-[140px] flex-shrink-0 w-[calc(100vw-500px)] min-w-full justify-start items-center overflow-hidden overflow-x-auto'
            : 'w-[120px] flex-shrink-0 items-start overflow-y-auto scrollbar-hide h-full'}`}>
            <div className={`flex gap-6 ${isTablet || isMobile ? 'justify-start items-start flex-row' : 'w-[120px] flex-col items-center justify-center'}`}>
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="relative flex items-center justify-center w-[100px] h-[100px] rounded-full group"
                >
                  {category.id === activeCategory && (
                    <motion.div
                      layoutId="activeBackground"
                      className={`absolute inset-0 w-[100px] h-[100px] rounded-full -z-10`}
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
                      <IoClose />
                    </button>
                  </div>
                </div>
              ))}
              {/* 추가 버튼 */}
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="w-[100px] h-[100px] rounded-full border-[3px] border-dashed border-gray-300 flex items-center justify-center text-3xl text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-colors"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 메인 컨텐츠 영역 */}
        <div className={`flex w-full h-full items-center rounded-xl justify-center
                      ${getBackgroundColor(activeItem.color)}  
                      ${!isTablet && !showDetail && !isMobile ? 'pl-6' : 'py-8'}`}>
          <AnimatePresence mode="wait">
            {activeItem && !showDetail ? (
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="relative flex flex-col justify-center items-center w-full h-full"
              >
                
                {/* 큰 원형 배경과 카메라 */}
                <div 
                  className={`relative aspect-square h-[70%] rounded-full border-4 bg-white cursor-pointer 
                              ${getBorderColor(activeItem.color)} 
                              ${isMobile ? 'w-[70%]' : ''}`}
                  onClick={() => setShowDetail(true)}
                >
                  {/* 수정 버튼 */}
                  <button
                    onClick={(e) => {
                      setIsEditModalOpen(true);
                      e.stopPropagation();
                    }}
                    className="absolute top-0 right-0 p-2 text-gray-600 bg-white border border-border rounded-md hover:text-gray-800 z-[1]"
                  >
                    <FiEdit2 size={24} />
                  </button>
                  <div className={`w-full h-full flex items-center justify-center pb-12 absolute `}>
                    <img
                      src={`/assets/images/camera/${activeItem.cameraType}-${activeItem.color}.png`}
                      alt={activeItem.name}
                      className={`w-[70%] h-[70%] object-contain ${isTablet || isMobile ? 'max-w-[200px] max-h-[200px]' : ''}`}
                    />
                  </div>
                </div>
                
                {/* 카테고리 이름 */}
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute z-[5] left-[50%] translate-x-[-50%] text-center 
                              ${isMobile ? 'text-2xl font-bold bottom-[10%]' : 'text-3xl font-bold bottom-[25%] '}`}
                >
                  {activeItem.name}
                </motion.h2>

                {/* 비공개 안내 텍스트 */}
                {activeItem.isPrivate && (
                  <div className="absolute bottom-[10%] left-[50%] translate-x-[-50%] text-gray-500">
                    비공개 카테고리입니다
                  </div>
                )}
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
          onAdd={handleAddImageToCategory}
          categoryId={activeCategory}
        />
      )}
      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={(newName, isPrivate) => updateCategoryName(activeCategory, newName, isPrivate)}
        initialName={activeItem?.name || ''}
        initialIsPrivate={activeItem?.isPrivate || false}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setCategoryToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        categoryName={categoryToDelete?.name || ''}
      />
    </div>
  );
};

export default Dictionary; 
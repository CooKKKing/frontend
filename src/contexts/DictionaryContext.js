import React, { createContext, useContext, useState } from 'react';

const DictionaryContext = createContext();

export const DictionaryProvider = ({ children }) => {
  // 카테고리 목록 상태
  const [categories, setCategories] = useState([
    { 
      id: 1, 
      name: '도감 1', 
      cameraType: '1', 
      color: 'blue',
      images: [],
      isPrivate: false
    },
    { 
      id: 2, 
      name: '도감 2', 
      cameraType: '2', 
      color: 'blue',
      images: [],
      isPrivate: false
    }
  ]);

  // 현재 선택된 카테고리 ID
  const [activeCategory, setActiveCategory] = useState(1);

  // 새 카테고리 추가
  const addCategory = (name, isPrivate) => {
    const newId = Math.max(...categories.map(c => c.id), 0) + 1;
    const newCategory = {
      id: newId,
      name,
      cameraType: '1',
      color: 'blue',
      images: [],
      isPrivate
    };
    setCategories([...categories, newCategory]);
    setActiveCategory(newId);
  };

  // 카테고리 카메라 타입 업데이트
  const updateCategoryCamera = (categoryId, cameraType) => {
    setCategories(categories.map(category =>
      category.id === categoryId
        ? { ...category, cameraType }
        : category
    ));
  };

  // 카테고리 색상 업데이트
  const updateCategoryColor = (categoryId, color) => {
    setCategories(categories.map(category =>
      category.id === categoryId
        ? { ...category, color }
        : category
    ));
  };

  const deleteCategory = (categoryId) => {
    const newCategories = categories.filter(cat => cat.id !== categoryId);
    setCategories(newCategories);
    
    // 삭제된 카테고리가 현재 활성화된 카테고리였다면
    if (categoryId === activeCategory) {
      // 남은 카테고리 중 첫 번째 것을 활성화하거나, 없다면 null로 설정
      setActiveCategory(newCategories.length > 0 ? newCategories[0].id : null);
    }
  };

  // 이미지 추가 함수
  const handleAddImage = (categoryId, imageData) => {
    const imageUrl = URL.createObjectURL(imageData.file);
    setCategories(categories.map(category =>
      category.id === categoryId
        ? {
            ...category,
            images: [...(category.images || []), {
              id: Math.random().toString(36).substr(2, 9),
              url: imageUrl,
              menuName: imageData.menuName
            }]
          }
        : category
    ));
  };

  // 이미지 삭제 함수
  const handleImageDelete = (imageId) => {
    setCategories(categories.map(category => {
      const updatedImages = category.images?.filter(img => img.id !== imageId) || [];
      // URL.revokeObjectURL을 호출하여 메모리 누수 방지
      const deletedImage = category.images?.find(img => img.id === imageId);
      if (deletedImage?.url) {
        URL.revokeObjectURL(deletedImage.url);
      }
      return {
        ...category,
        images: updatedImages
      };
    }));
  };

  const updateCategoryName = (categoryId, newName, isPrivate) => {
    setCategories(categories.map(category =>
      category.id === categoryId
        ? { ...category, name: newName, isPrivate }
        : category
    ));
  };

  return (
    <DictionaryContext.Provider value={{
      categories,
      activeCategory,
      setActiveCategory,
      addCategory,
      updateCategoryCamera,
      updateCategoryColor,
      deleteCategory,
      handleAddImage,
      handleImageDelete,
      updateCategoryName
    }}>
      {children}
    </DictionaryContext.Provider>
  );
};

export const useDictionary = () => {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }
  return context;
};

export default DictionaryContext; 
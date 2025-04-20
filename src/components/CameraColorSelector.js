import React from 'react';
import { useDictionary } from '../contexts/DictionaryContext';
import useIsMobile from '../hooks/useIsMobile';

const CameraColorSelector = () => {
    const {isMobile , isTablet} = useIsMobile();

  const {
    categories,
    activeCategory,
    updateCategoryCamera,
    updateCategoryColor
  } = useDictionary();

  const activeItem = categories.find(cat => cat.id === activeCategory);
  if (!activeItem) return null;

  const colorPairs = [
    { name: 'blue', bgClass: 'bg-blue-100', ringClass: 'ring-blue-500' },
    { name: 'yellow', bgClass: 'bg-yellow-100', ringClass: 'ring-yellow-500' },
    { name: 'purple', bgClass: 'bg-purple-100', ringClass: 'ring-purple-500' },
    { name: 'green', bgClass: 'bg-green-100', ringClass: 'ring-green-500' },
    { name: 'red', bgClass: 'bg-red-100', ringClass: 'ring-red-500' },
    { name: 'pink', bgClass: 'bg-pink-100', ringClass: 'ring-pink-500' }
  ];

  const cameras = [
    { id: '1', name: '카메라 1' },
    { id: '2', name: '카메라 2' },
    { id: '3', name: '카메라 3' },
    { id: '4', name: '카메라 4' },
    { id: '5', name: '폴라로이드' }
  ];

  const handleCameraClick = (cameraId) => {
    updateCategoryCamera(activeCategory, cameraId);
  };

  // 현재 선택된 카메라의 배경색 가져오기
  const getCurrentBgColor = () => {
    const color = colorPairs.find(c => c.name === activeItem.color);
    return color ? color.bgClass : 'bg-gray-100';
  };



  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-8">카메라 타입 선택</h2>
      
      {/* 카메라 이미지 목록 */}
      <div className={`grid gap-4 mb-8 ${isTablet ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {cameras.map((camera) => (
          <div 
            key={camera.id}
            onClick={() => handleCameraClick(camera.id)}
            className={`relative cursor-pointer group rounded-lg p-4 ${
              activeItem.cameraType === camera.id ? getCurrentBgColor() : ''
            }`}
          >
            <img
              src={`/assets/images/camera/${camera.id}-${activeItem.color}.png`}
              alt={camera.name}
              className="w-[100px] h-[100px] object-contain transition-transform group-hover:scale-110"
            />
          </div>
        ))}
      </div>

      {/* 색상 선택 팔레트 */}
      <div className="flex flex-wrap gap-4">
        {colorPairs.map((color) => (
          <button
            key={color.name}
            onClick={() => updateCategoryColor(activeCategory, color.name)}
            className={`w-10 h-10 rounded-full ${color.bgClass} transition-transform hover:scale-110 ${
              activeItem.color === color.name 
                ? `ring-2 ${color.ringClass}` 
                : ''
            }`}
            aria-label={`Select ${color.name} color`}
          />
        ))}
      </div>
    </div>
  );
};

export default CameraColorSelector; 
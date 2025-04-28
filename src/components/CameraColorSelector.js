import React, { useEffect, useState } from 'react';
import { useDictionary } from '../contexts/DictionaryContext';
import useIsMobile from '../hooks/useIsMobile';
import { useQuery } from '@tanstack/react-query';
import { getCollectionCameraImg } from '../api/queries/collectionService';

const CameraColorSelector = ({className}) => {
    const {isMobile , isTablet} = useIsMobile();

  const {
    categories, // 카테고리 목록
    activeCategory, // 현재 선택된 카테고리
    updateCategoryCamera, // 카메라 타입 업데이트
    updateCategoryColor // 카메라 색상 업데이트
  } = useDictionary();

  const defaultItem = {
    collectionCameraId: 1,
    imageUrl: "https://aws-cookking-bucket.s3.ap-northeast-2.amazonaws.com/camera/1-blue.png",
    customCategoryName: "도감 예시",
    collectionStatus: "PUBLIC",
    color: "blue",
    cameraType: "1",
    id: 1
  };

  // activeCategory가 undefined일 때도 defaultItem 사용
  const activeItem = categories.find(cat => cat.id === activeCategory) || defaultItem;

  const [selectedCameraColorId, setSelectedCameraColorId] = useState(activeItem.collectionCameraId);

  useEffect(() => {
    if (activeItem) {
      setSelectedCameraColorId(activeItem.collectionCameraId);
    }
  }, [activeItem]);

  const { data: cameraImages } = useQuery({
    queryKey: ['cameraImages', selectedCameraColorId],
    queryFn: () => getCollectionCameraImg(selectedCameraColorId),
    // enabled: !!selectedCameraColorId,
  });

  if (!activeItem) return null; // activeItem이 없으면 렌더링하지 않음

  console.log("selectedCameraColorId", selectedCameraColorId);
  console.log("cameraImages", cameraImages);
  console.log("activeItem", activeItem);
  console.log("categories", categories);
  console.log("activeCategory", activeCategory);


  const colorPairs = [ 
    { cameraColorId: 1, name: 'blue', bgClass: 'bg-blue-100', ringClass: 'ring-blue-500' }, 
    { cameraColorId: 2, name: 'green', bgClass: 'bg-green-100', ringClass: 'ring-green-500' },
    { cameraColorId: 3, name: 'pink', bgClass: 'bg-pink-100', ringClass: 'ring-pink-500' },
    { cameraColorId: 4, name: 'purple', bgClass: 'bg-purple-100', ringClass: 'ring-purple-500' },
    { cameraColorId: 5, name: 'red', bgClass: 'bg-red-100', ringClass: 'ring-red-500' },
    { cameraColorId: 6, name: 'yellow', bgClass: 'bg-yellow-100', ringClass: 'ring-yellow-500' },
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

  const handleColorSelect = (color) => {
    setSelectedCameraColorId(color.cameraColorId);
    updateCategoryColor(activeCategory, color.name, color.cameraColorId);
  };

  // 현재 선택된 카메라의 배경색 가져오기
  const getCurrentBgColor = () => {
    const color = colorPairs.find(c => c.name === activeItem.color);
    return color ? color.bgClass : 'bg-blue-100';
  };

  // 이미지 경로 결정 함수
  const getCameraImageUrl = (camera) => {
    if (cameraImages && cameraImages.length > 0) {
      const matchingImage = cameraImages.find(img => img.cameraType === camera.id);
      if (matchingImage) {
        return matchingImage.imageUrl;
      }
    }
    return `/assets/images/camera/${camera.id}-${activeItem.color}.png`;
  };

  return (
    <div className={`bg-white w-full ${className} ${isMobile ? 'h-max px-2 py-4' : 'h-fit p-4'}`}>
      <div className={`w-full ${isMobile ? 'flex justify-between' : ''}`}>
        <h2 className={`text-xl font-bold ${isMobile ? 'mb-2' : 'mb-6'}`}>카메라 타입 선택</h2>
         {isMobile && (
          <div className="flex gap-4 w-fit flex-wrap">
            {colorPairs.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorSelect(color)}
                className={`w-[20px] h-[20px] rounded-full ${color.bgClass} transition-transform hover:scale-110 ${
                  activeItem.color === color.name 
                    ? `ring-2 ${color.ringClass}` 
                    : ''
                }`}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
         )}
      </div>
      
      {/* 카메라 이미지 목록 */}
      <div className={`grid justify-items-center gap-4 ${isTablet ? 'grid-cols-2' : isMobile ? 'grid-cols-5' : 'grid-cols-3'}`}>
        {cameras.map((camera) => (
          <div 
            key={camera.id}
            onClick={() => handleCameraClick(camera.id)}
            className={`relative cursor-pointer group rounded-lg p-4 w-[80px] h-[80px] ${
              activeItem.cameraType === camera.id ? getCurrentBgColor() : ''
            }`}
          >
            <img
              src={getCameraImageUrl(camera)}
              alt={camera.name}
              className="w-[60px] h-[60px] object-contain transition-transform transform-gpu absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110"
            />
          </div>
        ))}
      </div>

      {/* 색상 선택 팔레트 */}
      {!isMobile && (
          <div className="flex gap-4 w-full flex-wrap mt-4">
            {colorPairs.map((color) => (
              <button
                key={color.cameraColorId}
                onClick={() => handleColorSelect(color)}
                className={`w-[20px] h-[20px] rounded-full ${color.bgClass} transition-transform hover:scale-110 ${
                  activeItem.color === color.name 
                    ? `ring-2 ${color.ringClass}` 
                    : ''
                }`}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
        )
      }
      
    </div>
  );
};

export default CameraColorSelector; 
import React, { useRef } from 'react';
import { useImageUpload } from '../hooks/useImageUpload';

export const ImageUpload = ({ onImageUpload, className = '' }) => {
  const { uploadImage, isUploading, error } = useImageUpload();
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      onImageUpload(imageUrl);
      
      // 파일 입력 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      // 에러는 useImageUpload 훅에서 처리됨
      console.error('이미지 업로드 실패:', error);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <div 
        onClick={handleButtonClick}
        className="bg-white p-3 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      >
        <div className="aspect-square border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
          <span className="text-3xl text-gray-400">+</span>
        </div>
        <p className="text-center font-medium text-gray-400 mt-2">
          {isUploading ? '업로드 중...' : '사진 추가'}
        </p>
      </div>
      
      {error && (
        <p className="mt-2 text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}; 
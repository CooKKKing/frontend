import { useState } from 'react';
import { validateImage, compressImage, uploadImageToServer } from '../utils/imageUpload';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    try {
      setIsUploading(true);
      setError(null);

      // 이미지 유효성 검사
      validateImage(file);

      // 이미지 압축
      const compressedImage = await compressImage(file);

      // 서버에 업로드
      const imageUrl = await uploadImageToServer(compressedImage);
      
      return imageUrl;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '이미지 업로드 중 오류가 발생했습니다.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    isUploading,
    error,
  };
}; 
import { uploadImageToImageServer } from '../api/queries/collectionService';

export const validateImage = (file) => {
  // 이미지 타입 검증
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    throw new Error('지원하지 않는 이미지 형식입니다.');
  }

  // 파일 크기 검증 (5MB 제한)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error('이미지 크기는 5MB를 초과할 수 없습니다.');
  }

  return true;
};

export const compressImage = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // 최대 크기 설정
        const maxWidth = 1920;
        const maxHeight = 1080;
        
        let width = img.width;
        let height = img.height;
        
        // 이미지 크기 조정
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // 압축된 이미지를 Blob으로 변환
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('이미지 압축에 실패했습니다.'));
            }
          },
          file.type,
          0.8
        );
      };
      
      img.onerror = () => {
        reject(new Error('이미지 로드에 실패했습니다.'));
      };
    };
    
    reader.onerror = () => {
      reject(new Error('파일 읽기에 실패했습니다.'));
    };
  });
};

export const uploadImageToServer = async (file) => {
  try {
    // 이미지 서버에 업로드
    const imageUrl = await uploadImageToImageServer(file);
    return imageUrl;
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw new Error('이미지 업로드에 실패했습니다.');
  }
}; 
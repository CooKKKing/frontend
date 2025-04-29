import instance from '../axiosInstance';

export const getCollectionList = async () => {
    const response = await instance.get('/collections');
    return response.data;
};

export const getCollectionItemList = async (collectionId) => {
    const response = await instance.get(`/collections/${collectionId}/collectionitem`);
    return response.data;
};

export const getCollectionCameraImg = async (cameraColorId) => {
    const response = await instance.get(`/collections/camera-image?cameraColorId=${cameraColorId}`);
    return response.data;
};

// 이미지 서버에 업로드
export const uploadImageToImageServer = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await instance.post(
    '/images',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data.data;
};

// 도감 카테고리에 이미지 추가
export const addImageToCollection = async (collectionId, imageData) => {
  const response = await instance.post(
    `/collections/${collectionId}/collectionitem`,
    imageData
  );
  return response.data;
};

// 도감 카테고리의 이미지 목록 조회
export const getCollectionImages = async (collectionId) => {
  const response = await instance.get(
    `/collections/${collectionId}/collectionitem`
  );
  return response.data;
};

// 도감 카테고리의 이미지 삭제
export const deleteCollectionImage = async (imageId) => {
//   const response = await instance.delete(
//     `/collections/${collectionId}/collectionitem/${imageId}`
//   );
const response = await instance.delete(
    `/collections/collectionitems/${imageId}`
  );
  return response.data;
};
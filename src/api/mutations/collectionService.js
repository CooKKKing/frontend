import instance from "../axiosInstance";

// 도감 카테고리의 이미지 삭제
export const deleteCollectionImage = async (imageId) => {       
    const response = await instance.delete(`/collections/collectionitems/${imageId}`);
      return response.data;
};
    
// 도감 카테고리 생성
export const createCollection = async (collectionData) => {
    const response = await instance.post('/collections', {
        ...collectionData
    });

    console.log("createCollection response==============", response.data);
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
    const response = await instance.post(`/collections/${collectionId}/collectionitem`,imageData);
    return response.data;
};
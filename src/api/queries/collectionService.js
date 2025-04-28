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
import instance from '../axiosInstance';

export const getCollectionList = async () => {
    const response = await instance.get('/collections');
    return response.data;
};
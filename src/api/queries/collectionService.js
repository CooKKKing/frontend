import instance from '../axiosInstance';

export const getCollectionList = async () => {
    const response = await instance.get('/collection');
    return response.data;
};

// 테스트를 위한 함수
export const testGetCollectionList = async () => {
    try {
        const data = await getCollectionList();
        console.log('컬렉션 목록:', data);
        return data;
    } catch (error) {
        console.error('컬렉션 목록 조회 실패:', error);
        throw error;
    }
};
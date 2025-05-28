import axiosInstance from '../axiosInstance';

// 모든 타이틀 조회
export const getAllTitles = async () => {
  const res = await axiosInstance.get('/titles');
  return res.data.data;
};

// 보유한 타이틀 조회
export const getOwnedTitles = async () => {
  const res = await axiosInstance.get('/titles/owned');
  return res.data.data;
};

// 미보유 타이틀 조회
export const getUnownedTitles = async () => {
  const res = await axiosInstance.get('/titles/unowned');
  return res.data.data;
}; 
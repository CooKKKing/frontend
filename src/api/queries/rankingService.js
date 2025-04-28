import axiosInstance from '../axiosInstance';

// 칭호 랭킹 조회
export const getTitleRankings = async () => {
  const res = await axiosInstance.get('/rankings/titles');
  // console.log("칭호 랭킹 조회", res.data);
  return res.data;
};

// 레시피 보드 랭킹 조회
export const getRecipeBoardRankings = async () => {
  const res = await axiosInstance.get('/rankings/recipe-board');
  return res.data;
};

// 좋아요 랭킹 조회
export const getLikesRankings = async () => {
  const res = await axiosInstance.get('/rankings/likes');
  return res.data;
};

// 북마크 랭킹 조회
export const getBookmarkRankings = async () => {
  const res = await axiosInstance.get('/rankings/bookmarks');
  return res.data;
}; 
import instance from '../axiosInstance';

// 로그인한 현재 사용자 정보 가져오기
export const getCurrentUser = async () => {
  const memberId = localStorage.getItem("memberId");
  const token = localStorage.getItem("accessToken");

  console.log(memberId, token)

  if (!token || !memberId) {
    return null;
  }

  try {
    const response = await instance.get(`/members/${memberId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    } else if (error.response?.status === 401) {
      localStorage.removeItem("memberId");
      localStorage.removeItem("accessToken");
      return null;
    }
    throw error;
  }
};



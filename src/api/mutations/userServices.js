import instance from '../axiosInstance';

export const loginService = async (credentials) => {
    const loginResponse = await instance.post('/auth/login', credentials);

    const accessToken = loginResponse.headers?.authorization?.split(" ")[1] || null;
    const refreshToken = loginResponse.headers?.refreshtoken || null;
    const memberId = loginResponse.headers?.memberid || null;

    if (!accessToken || !refreshToken || !memberId) {
      throw new Error('로그인 응답에 유효한 정보가 없습니다.');
    }

    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("memberId", memberId);

    const memberResponse = await instance.get(`/members/${memberId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log("memberResponse", memberResponse.data.data);

    if (accessToken) {
      const tokenWithBearer = accessToken.startsWith("Bearer ")
        ? accessToken
        : `Bearer ${accessToken}`;
      localStorage.setItem("accessToken", tokenWithBearer);
    }
  
    if (memberResponse.data.data) {
      return { member: memberResponse.data.data, accessToken };
    } else {
      throw new Error("사용자 정보를 찾을 수 없습니다.");
    }
  };
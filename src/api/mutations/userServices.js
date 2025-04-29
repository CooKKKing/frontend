import instance from '../axiosInstance';

export const loginService = async (credentials) => {
  const loginResponse = await instance.post('/auth/login', credentials);

  const accessToken = loginResponse.headers?.authorization || null;
  const refreshToken = loginResponse.headers?.refreshtoken || null;
  const memberId = loginResponse.headers?.memberid || null;

  if (!accessToken || !refreshToken || !memberId) {
    throw new Error('로그인 응답에 유효한 정보가 없습니다.');
  }

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("memberId", memberId);

  const memberResponse = await instance.get(`/members/${memberId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (memberResponse.data.data) {
    return { member: memberResponse.data.data, accessToken };
  } else {
    throw new Error("사용자 정보를 찾을 수 없습니다.");
  }
};

// export const signUp = async (memberData) => {
//   const response = await instance.post("/members",memberData);
//   return response.data;
// }

// export const checkDuplicateId = async (loginId) => {
//   const response = await instance.post("/members/id",{loginId});
//   console.log("response====",response);
//   return response;
// }

// export const checkDuplicateNickName = async (nickName) => {
//   const response = await instance.post("/members/name", { nickName });
//   return response;
// }
import instance from "../axiosInstance";

// 챌린지 목록 조회
export const getChallenges = async () => {
    const response = await instance.get(`/challenges`);
    // console.log("challenges",response.data.data);
    return response.data.data;
};




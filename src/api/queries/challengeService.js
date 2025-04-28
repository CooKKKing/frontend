import instance from "../axiosInstance";

export const getChallenges = async () => {
    const response = await instance.get(`/challenges`);
    // console.log("challenges",response.data.data);
    return response.data.data;
};




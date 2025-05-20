import instance from "../axiosInstance"

export const getProfileList = async () => {
    const response = await instance.get('/profile');
    return response.data;
};

export const getProfile = async (profileId) => {
    const response = await instance.get(`/profile/${profileId}`);
    return response.data;
}

export const getMemberProfiles = async (memberId) => {
    const response = await instance.get(`/profile/members/${memberId}`);
    return response.data;
}
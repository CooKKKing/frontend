import instance from "../axiosInstance"

export const profilePurchase = async (profileId) => {
    const response = await instance.post(`/profile/${profileId}/purchase`);
    return response.data;
}

export const updateProfile = async (profileId) => {
    const response = await instance.post(`/profile/${profileId}/equip`);
    return response.data;
}
import instance from "../axiosInstance"

export const getRecommendMenu = async (ingredients) => {
    const response = await instance.post(`/menus/recommendations`, ingredients);
    return response.data;
}

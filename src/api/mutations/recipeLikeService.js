import instance from "../axiosInstance";

// 레시피 좋아요 추가/취소
export const addRecipeLike = async (recipeId) => {
    const response = await instance.post(`/recipes/${recipeId}/like`);
    return response.data;
}



import instance from "../axiosInstance";

export const getRecipeAllList = async () => {
    const response = await instance.get("/recipes");
    return response.data;
}

export const getRecipeDetail = async (recipeId) => {
    const response = await instance.get(`/recipes/${recipeId}`);
    return response.data;
}

// 회원의 레시피 목록 조회
export const getMemberRecipes = async (memberId, page = 1, size = 10) => {
    const response = await instance.get(`/recipes/members/${memberId}?page=${page}&size=${size}`);
    return response.data;
}


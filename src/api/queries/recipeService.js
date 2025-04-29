import instance from "../axiosInstance";

export const getRecipeAllList = async () => {
    const response = await instance.get("/recipes");
    return response.data;
}

export const getRecipeDetail = async (recipeId) => {
    const response = await instance.get(`/recipes/${recipeId}`);
    return response.data;
}


import  instance from '../axiosInstance';

export const createRecipe = async (recipeData) => {
  const response = await instance.post('/recipes', recipeData);
  return response.data;
};

export const toggleRecipeLike = async (recipeId) => {
  const response = await instance.post(`/recipes/${recipeId}/like`);
    return response.data;
}

export const toggleRecipeBookmark = async (recipeId) => {
  const response = await instance.post(`/recipes/${recipeId}/bookmark`);
  return response.data;
}

export const deleteRecipe = async (recipeId) => {
  const response = await instance.delete(`/recipes/${recipeId}`);
  return response;
}

export const updateRecipe = async (recipeId, recipeData) => {
  try {
    const response = await instance.patch(`/recipes/${recipeId}`, recipeData);
    return response.data;
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
};




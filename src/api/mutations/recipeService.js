import  instance from '../axiosInstance';

export const createRecipe = async (recipeData) => {
  const response = await instance.post('/recipes', recipeData);
  return response.data;
};




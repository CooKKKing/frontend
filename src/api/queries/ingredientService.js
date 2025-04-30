import instance from "../axiosInstance";

export const getIngredients = async () => {
  const response = await instance.get('/ingredients?page=1&size=100');
  return response.data;
};




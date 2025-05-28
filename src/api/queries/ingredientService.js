import { ingredients } from "../../data/foodData";
import instance from "../axiosInstance";

export const getIngredients = async () => {
  const response = await instance.get('/ingredients?page=1&size=100');
  return response.data;
};

// export const getIngredients = async () => {
//   const response = await instance.get('/ingredients', 
//     {
//       params: { page: 1, size: 100, dtype: 'MAIN' }
//     });
//   return response.data;
// };

export const getIngredient = async (ingredientId) => {
  const response = await instance.get(`/ingredients/${ingredientId}`)
  return response.data;
}


import { ingredients } from '../data/foodData';

export const getIngredientName = (index, type) => {
  if (type === 'main') {
    return ingredients.main[index];
  } else if (type === 'sub') {
    return ingredients.sub[index];
  }
  return '';
};

export const getIngredientsNames = (indices, type) => {
  return indices.map(index => getIngredientName(index, type));
};  
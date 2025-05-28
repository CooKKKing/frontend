import { useState } from "react";

export default function useImgIngredient(initial = []) {
  const [ingredients, setIngredients] = useState(initial);

  const addIngredient = (ingredient) => {
    setIngredients((prev) =>
      prev.some((i) => i.name === ingredient.name)
        ? prev
        : [...prev, ingredient]
    );
  };

  const removeIngredient = (name) => {
    setIngredients((prev) => prev.filter((i) => i.name !== name));
  };

  const setImage = (name, imageUrl) => {
    setIngredients((prev) =>
      prev.map((i) => i.name === name ? { ...i, imageUrl } : i)
    );
  };

  return {
    ingredients,
    addIngredient,
    removeIngredient,
    setImage,
    setIngredients,
  };
}

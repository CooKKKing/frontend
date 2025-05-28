import React from "react";
import IngredientCircle from "./IngredientsCircle";

/**
 * props:
 * - ingredients: [{ name, imageUrl }]
 * - onAdd: (ingredient) => void
 * - boardItems: [{ name, imageUrl }]
 */
const ImgIngredients = ({ ingredients, onAdd, boardItems }) => {
  // 이미 도마에 올라간 재료는 비활성화
  const addedNames = boardItems.map(i => i.name);

  return (
    <div className="grid grid-cols-3 gap-3 mt-6">
      {ingredients.map(item => (
        <IngredientCircle
          key={item.name}
          name={item.name}
          imageUrl={item.imageUrl}
          onClick={() => onAdd(item)}
          disabled={addedNames.includes(item.name) || boardItems.length >= 6}
        />
      ))}
    </div>
  );
};

export default ImgIngredients;

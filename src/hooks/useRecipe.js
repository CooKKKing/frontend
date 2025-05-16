import { useState } from "react";
import { getMenuAllList } from "../api/queries/menuService";
import { getRecipeAllList } from "../api/queries/recipeService";

export const useRecipe = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
        // 레시피와 메뉴 데이터
        const [recipesResponse, menusResponse] = await Promise.all([
            getRecipeAllList(),
            getMenuAllList()
        ]);

        // 메뉴 데이터를 menuId를 키로 하는 객체로 변환
        const menuMap = menusResponse.data.reduce((acc, menu) => {
            acc[menu.menuId] = menu;
            return acc;
        }, {});

        console.log("menuMap ================",menuMap);

        // 레시피 데이터를 기존 형식으로 변환하면서 메뉴 정보를 매핑
        const formattedRecipes = recipesResponse.data.map(recipe => {
            const menu = menuMap[recipe.menuId];
            return {
            id: recipe.recipeBoardId,
            recipeId: recipe.recipeBoardId,
            menuName: menu?.menuName || recipe.title,
            title: recipe.title,
            image: recipe.image,
            category: menu?.category?.menuCategoryName || '기타',
            ingredients: {
                main: recipe.mainIngredients.map(ing => ({
                id: ing.ingredientId,
                name: ing.ingredientName,
                })),
                sub: recipe.seasoningIngredients.map(ing => ({
                id: ing.ingredientId,
                name: ing.ingredientName,
                })),
            },
            isBookmarked: recipe.bookmarked,
            likes: recipe.likeCount,
            isLiked: recipe.liked,
            createdAt: recipe.createdAt
            };
        });

        setRecipes(formattedRecipes);
        setLoading(false);
        } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다:', error);
        setLoading(false);
        }
    };
    
    return{fetchData, recipes, setRecipes, loading};
}


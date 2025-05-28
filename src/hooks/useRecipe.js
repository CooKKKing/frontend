import { useState } from "react";
import { getMenuAllList, getRecommendMenuList } from "../api/queries/menuService";
import { getRecipeAllList } from "../api/queries/recipeService";
import { useRecommendMenu } from "../contexts/RecommendMenuContext";

export const useRecipe = () => {
    const [recipes, setRecipes] = useState([]);
    const [recommendRecipes, setRecommendRecipes] = useState([]);

    const [loading, setLoading] = useState(true);
    const {recommendMenu} = useRecommendMenu();

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
            memberId: recipe.memberId,
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

    const fetchRecommendData = async () => {
        try {
        console.log("레시피 훅에서 추천메뉴 이름 가져오나? == ", recommendMenu.menuName);
        // 레시피와 메뉴 데이터
        const [recipesResponse, menusResponse] = await Promise.all([
            getRecipeAllList(),
            getRecommendMenuList(recommendMenu.menuName)
        ]);

        // 메뉴 데이터를 menuId를 키로 하는 객체로 변환
        const recipeMap = recipesResponse.data.reduce((acc, recipe) => {
            acc[recipe.recipeBoardId] = recipe;
            return acc;
        }, {});

        // console.log("menusResponse ================",menusResponse);
        console.log("recipeMap ================",recipeMap);

        // 레시피 데이터를 기존 형식으로 변환하면서 메뉴 정보를 매핑
        const formattedRecipes = menusResponse.map(menu => {
            const recipe = recipeMap[menu.recipeBoardId];
            return {
            id: recipe.recipeBoardId,
            memberId: recipe.memberId,
            recipeId: recipe.recipeBoardId,
            menuName: recommendMenu.menuName,
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

        console.log("formattedRecipes ==========================", formattedRecipes);

        setRecommendRecipes(formattedRecipes);
        console.log("추천메뉴에서 리스트 뽑고싶은 레시피 리스트가 맞나? ", recommendRecipes);
        setLoading(false);
        } catch (error) {
        console.error('데이터를 불러오는데 실패했습니다:', error);
        setLoading(false);
        }
    };
    
    return{fetchRecommendData, fetchData, recipes, setRecipes, recommendRecipes, setRecommendRecipes , loading};
}


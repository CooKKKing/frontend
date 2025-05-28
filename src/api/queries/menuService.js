import instance from "../axiosInstance";

// 메뉴 전체 목록 조회
export const getMenuAllList = async () => {
    const response = await instance.get("/menus");
    return response.data;
}

// 메뉴 상세 조회
export const getMenuDetail = async (menuId) => {
    const response = await instance.get(`/menus/${menuId}`);
    return response.data;
}

// 메뉴 카테고리 목록 조회
export const getMenuCategoryList = async () => {
    const response = await instance.get('/categories/menus?page=1&size=10');
    return response.data;
}

export const getRecommendMenuList = async (menuName) => {
    const response = await instance.get(`/menus/recipes?name=${menuName}&page=1&size=10`);
    console.log("추천메뉴 이름 리스트 API 잘 응답오나?", response.data.data)
    return response.data.data;
}




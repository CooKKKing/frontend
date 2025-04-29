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
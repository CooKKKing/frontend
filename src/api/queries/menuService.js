import instance from "../axiosInstance";

export const getMenuAllList = async () => {
    const response = await instance.get("/menus");
    return response.data;
}

export const getMenuDetail = async (menuId) => {
    const response = await instance.get(`/menus/${menuId}`);
    return response.data;
}
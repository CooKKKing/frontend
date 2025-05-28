import instance from "../axiosInstance"

export const riceAllList = async () => {
    const response = await instance.get(`/api/v1/payments/master`);
    return response.data;
}

export const shopPayHistoryList = async () => {
    const response = await instance.get(`/api/v1/payments/toss/history`);
    return response.data;
}
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://ec2-54-180-8-125.ap-northeast-2.compute.amazonaws.com:8080',
    headers: {
        'Content-Type': 'application/json',
        // 토큰이 Bearer 앞에 붙은 상태로 localStorage에 저장이 되있어서 뺌
        'Authorization': `${localStorage.getItem('accessToken')}`
    },
});

// 요청 인터셉터
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // 토큰이 만료되었거나 유효하지 않은 경우
            localStorage.removeItem('accessToken');
            localStorage.removeItem('memberId');
            localStorage.removeItem('userInfo');
        }
        return Promise.reject(error);
    }
);

export default instance;
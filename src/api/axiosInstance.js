import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://ec2-54-180-8-125.ap-northeast-2.compute.amazonaws.com:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

// // 요청 인터셉터
// instance.interceptors.request.use(
//     (config) => {
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // 응답 인터셉터
// instance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default instance;
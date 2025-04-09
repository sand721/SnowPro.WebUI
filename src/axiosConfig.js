// src/axiosConfig.js
import axios from 'axios';
import {getUserToken} from "./components/utils";

const instanceProfileService = axios.create({
    baseURL: 'http://localhost:8086', // Замените на ваш базовый URL
});
const instanceLessonService = axios.create({
    baseURL: 'http://localhost:8085', // Замените на ваш базовый URL
});

[instanceProfileService, instanceLessonService].forEach(instance => {
    instance.interceptors.request.use((config) => {
       const userToken = getUserToken();
       if (userToken)
       {
            config.headers.Authorization = `Bearer ${userToken}`;
            // axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
            // console.log("axios.defaults.headers.common:", axios.defaults.headers.common);
            // console.log("Токен установлен в заголовок:", config.headers.Authorization);
        }
       // console.log("Заголовки перед отправкой:", config.headers);
       //  console.log("Глобальные заголовки axios:", axios.defaults.headers.common);
       return config;
    }, (error) => Promise.reject(error));
    // instance.interceptors.response.use(
    //     response => response,
    //     async (error) => {
    //         if (error.response && error.response.status === 401) {
    //             console.warn("Token expired...");
    //             localStorage.removeItem("accessToken");
    //             window.location.href = "/login";  // Перенаправляем на страницу логина
    //         }
    //         return Promise.reject(error);
    //     }
    // );
});

export {instanceProfileService as axiosProfileService, instanceLessonService as axiosLessonService};
// src/axiosConfig.js
import axios from 'axios';
import {getUserToken} from "./components/utils";
import {BASE_LESSON_URL, BASE_PROFILE_URL} from "./config";

const instanceProfileService = axios.create({
    baseURL: `${BASE_PROFILE_URL}`,
});
const instanceLessonService = axios.create({
    baseURL: `${BASE_LESSON_URL}`,
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
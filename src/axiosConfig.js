// src/axiosConfig.js
import axios from 'axios';

const instanceProfileService = axios.create({
    baseURL: 'http://localhost:5000', // Замените на ваш базовый URL
});
const instanceLessonService = axios.create({
    baseURL: 'http://localhost:5130', // Замените на ваш базовый URL
});

export {instanceProfileService as axiosProfileService, instanceLessonService as axiosLessonService};
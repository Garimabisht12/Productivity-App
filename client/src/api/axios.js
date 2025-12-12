import axios from 'axios';

const BASE_URL = import.meta.env.MODE == 'development' ? "http://localhost:5000/api" : 'https://productivity-app-z1ei.onrender.com/api';
const instance = axios.create({
    baseURL: BASE_URL,
});

export default instance;
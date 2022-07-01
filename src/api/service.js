import axios from "axios";

import { getEnv } from "../helpers";

const { VITE_API_URL } = getEnv();

const appEdimca = axios.create({
    baseURL: VITE_API_URL
});

appEdimca.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    return config;
});

export default appEdimca;
import { API_BASE_URL, STORAGEKEYS, TOKEN_CYBERSOFT } from "@/constants";
import axios from "axios";


export const api = axios.create({
    baseURL: API_BASE_URL, // Replace with your API base URL
    timeout: 10000, // Request timeout 10s
    headers: {'X-Custom-Header': 'foobar'}
});

api.interceptors.request.use((config) => {
    return {
        ...config,
        headers: {
            ...config.headers,
            TokenCybersoft: TOKEN_CYBERSOFT,
            Authorization: localStorage.getItem(STORAGEKEYS.ACCESSTOKEN) 
                ? `Bearer ${localStorage.getItem(STORAGEKEYS.ACCESSTOKEN)}` 
                : undefined
            // nếu có accessToken trong localStorage thì thêm vào header Authorization 
        }
    } as unknown as typeof config; // ép kiểu lại để tránh lỗi TypeScript
})
import Axios, { AxiosInstance } from 'axios';

let api: AxiosInstance = Axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        'Content-Type': "application/json"
    },
    
});

export default api;
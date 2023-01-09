import Axios, { AxiosInstance } from 'axios';
import getUserToken from '../Utils/getUserToken';

export default () => {
    let userToken: string | null = getUserToken();

    let api: AxiosInstance = Axios.create({
        baseURL: "http://localhost:3000",
        headers: {
            'Content-Type': "application/json",
            "Authorization": userToken
        },
    });

    return api;
};
import axios, { AxiosInstance } from "axios";

const API: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

const token = localStorage.getItem('token');
const AuthenticatedAPI: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": token ? `${token}` : ''
    }
});

export {
    API,
    AuthenticatedAPI
};

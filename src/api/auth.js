import { post } from "./api";

const register = async (data) => {
    try {
        const response = await post(`/auth/register`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

const login = async (data) => {
    try {
        const response = await post(`/auth/login`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

export default {
    register,
    login
}
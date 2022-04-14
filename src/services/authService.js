import axios from "axios";
const baseUrl = "/auth/";

const register = (
    name,
    email,
    password,
    businessName,
    businessType,
    businessLocation
) => {
    return axios.post(`${baseUrl}register`, {
        name,
        email,
        password,
        businessName,
        businessType,
        businessLocation,
    });
};

const login = (email, password) => {
    return axios.post(`${baseUrl}/login`, {
        email,
        password,
    });
};

const fetchNewToken = (refreshToken) => {
    return axios.post(`${baseUrl}/refresh`, { refreshToken });
};

export { register, login, fetchNewToken };

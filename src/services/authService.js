import axios from "axios";
const baseUrl = "/auth/";

const login = (email, password) => {
    return axios.post(`${baseUrl}/login`, {
        email,
        password,
    });
};

const fetchNewToken = (refreshToken) => {
    return axios.post(`${baseUrl}/refresh`, { refreshToken });
};

export { login, fetchNewToken };

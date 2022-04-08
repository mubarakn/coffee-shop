import axios from "axios";
const baseUrl = "/settings";

export const getGeneralSettings = () => {
    return axios.get(`${baseUrl}/general`);
};

export const updateGeneralSettings = (data) => {
    return axios.put(`${baseUrl}/general`, data);
};

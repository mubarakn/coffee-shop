import axios from "axios";
const baseUrl = "/menuCategories/";

export const getCategories = () => {
    return axios.get(baseUrl);
};

export const getCategory = (id) => {
    return axios.get(`${baseUrl}${id}`);
};

export const createCategory = (name) => {
    return axios.post(baseUrl, { name });
};

export const updateCategory = (id, name) => {
    return axios.put(`${baseUrl}/${id}`, { name });
};

export const deleteCategory = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
};

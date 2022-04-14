import axios from "axios";
const baseUrl = "/tags/";

export const getTags = (type) => {
    if (!type) {
        return axios.get(baseUrl);
    }

    return axios.get(`${baseUrl}${type}`);
};

export const getTag = (id) => {
    return axios.get(`${baseUrl}${id}`);
};

export const createTag = (type, tag) => {
    return axios.post(baseUrl, { type, tag });
};

export const updateTag = (id, tag) => {
    return axios.put(`${baseUrl}/${id}`, { tag });
};

export const deleteTag = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
};

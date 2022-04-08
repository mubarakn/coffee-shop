import axios from "axios";
const baseUrl = "/tags/";

export const getTags = () => {
    return axios.get(baseUrl);
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

import axios from "axios";
const baseUrl = "/suppliers/";

export const getSuppliers = () => {
    return axios.get(baseUrl);
};

export const getSupplier = (id) => {
    return axios.get(`${baseUrl}${id}`);
};

export const createSupplier = (code, name, contactName, phone, email) => {
    return axios.post(baseUrl, { code, name, contactName, phone, email });
};

export const updateSupplier = (id, code, name, contactName, phone, email) => {
    return axios.put(`${baseUrl}/${id}`, {
        code,
        name,
        contactName,
        phone,
        email,
    });
};

export const deleteSupplier = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
};

export const updateTags = (id, tags) => {
    return axios.put(`${baseUrl}${id}/tags`, { tags });
};

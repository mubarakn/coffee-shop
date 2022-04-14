import axios from "axios";
const baseUrl = "/taxes/";
const groupBaseUrl = "/taxGroups/";

export const getTaxes = () => {
    return axios.get(baseUrl);
};

export const getTax = (id) => {
    return axios.get(`${baseUrl}${id}`);
};

export const createTax = (name, rate) => {
    return axios.post(baseUrl, { name, rate });
};

export const updateTax = (id, name, rate) => {
    return axios.put(`${baseUrl}/${id}`, { name, rate });
};

export const deleteTax = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
};

export const getTaxGroups = () => {
    return axios.get(groupBaseUrl);
};

export const getTaxGroup = (id) => {
    return axios.get(`${groupBaseUrl}${id}`);
};

export const createTaxGroup = (name, taxes) => {
    return axios.post(groupBaseUrl, { name, taxes });
};

export const updateTaxGroup = (id, name, taxes) => {
    return axios.put(`${groupBaseUrl}/${id}`, { name, taxes });
};

export const deleteTaxGroup = (id) => {
    return axios.delete(`${groupBaseUrl}/${id}`);
};

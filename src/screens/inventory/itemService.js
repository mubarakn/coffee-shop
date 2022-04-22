import axios from "axios";
const baseUrl = "/items/";

export const getItems = () => {
    return axios.get(baseUrl);
};

export const getItem = (id) => {
    return axios.get(`${baseUrl}${id}`);
};

export const createItem = (
    code,
    name,
    category,
    stockUnit,
    ingredientUnit,
    conversionQuantity,
    barcode,
    costingMethod,
    cost,
    minLevel,
    parLevel,
    maxLevel
) => {
    return axios.post(baseUrl, {
        code,
        name,
        category,
        stockUnit,
        ingredientUnit,
        conversionQuantity,
        barcode,
        costingMethod,
        cost,
        minLevel,
        parLevel,
        maxLevel,
    });
};

export const updateItem = (
    id,
    code,
    name,
    category,
    stockUnit,
    ingredientUnit,
    conversionQuantity,
    barcode,
    costingMethod,
    cost,
    minLevel,
    parLevel,
    maxLevel
) => {
    return axios.put(`${baseUrl}${id}`, {
        code,
        name,
        category,
        stockUnit,
        ingredientUnit,
        conversionQuantity,
        barcode,
        costingMethod,
        cost,
        minLevel,
        parLevel,
        maxLevel,
    });
};

export const deleteItem = (id) => {
    return axios.delete(`${baseUrl}${id}`);
};

export const updateTags = (id, tags) => {
    return axios.put(`${baseUrl}${id}/tags`, { tags });
};

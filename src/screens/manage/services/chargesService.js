import axios from "axios";
const baseUrl = "/charges/";

const getCharges = () => {
    return axios.get(baseUrl);
};

const getCharge = (id) => {
    return axios.get(`${baseUrl}${id}`);
};

const createCharge = (
    name,
    type,
    value,
    cashierCanChange,
    orderTypes,
    branches,
    taxGroup,
    autoApply
) => {
    return axios.post(baseUrl, {
        name,
        type,
        value,
        cashierCanChange,
        orderTypes,
        branches,
        taxGroup,
        autoApply,
    });
};

const updateCharge = (
    id,
    name,
    type,
    value,
    cashierCanChange,
    orderTypes,
    branches,
    taxGroup,
    autoApply
) => {
    return axios.put(`${baseUrl}${id}`, {
        name,
        type,
        value,
        cashierCanChange,
        orderTypes,
        branches,
        taxGroup,
        autoApply,
    });
};

const deleteCharge = (id) => {
    return axios.delete(`${baseUrl}${id}`);
};

export { getCharges, getCharge, createCharge, updateCharge, deleteCharge };
